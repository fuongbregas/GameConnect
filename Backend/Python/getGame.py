# This file is used in run.py
import os
import requests
from datetime import datetime
import time
from MongoDB_Object import MongoDB
import createCommunities
from dotenv import load_dotenv
load_dotenv()

# Important fields of game data from IGDB
filter = 'id,aggregated_rating,cover.url,category,first_release_date,game_modes,genres,keywords,multiplayer_modes,name,rating,similar_games,summary'

url ='https://api.igdb.com/v4/games/'
client_id = os.getenv('IGDB_CLIENT_ID')

# Convert seconds to_epoch_time_converter, ISO 8061
def time_converter(epoch_time):
    return datetime.utcfromtimestamp(epoch_time).isoformat()

# Get cover image in 1080p resolution
def get_HQ_cover(cover_url):
    new_cover_url = cover_url.replace('//image','image').replace('t_thumb','t_1080p')
    return new_cover_url

# Function helps adding missing fields as NULL
def set_none(document):
    if 'aggregated_rating' not in document:
        document['aggregated_rating'] = None
    if 'category' not in document:
        document['category'] = None
    # Get the URL of the cover from the JSON response
    if 'cover' in document:
        cover_url = document['cover']['url']
        document['cover'] = get_HQ_cover(cover_url)
    if 'cover' not in document:
        document['cover'] = None
    # Timestamp is available in the document
    if 'first_release_date' in document:
        epoch_time = document['first_release_date']
        ISO_date = time_converter(epoch_time)
        # ISO time can only be stored in String in MongoDB        
        document['first_release_date'] = ISO_date 
    # Missing timestamp in the document
    if 'first_release_date' not in document:
        document['first_release_date'] = None
    if 'game_modes' not in document:
        document['game_modes'] = None
    if 'genres' not in document:
        document['genres'] = None
    if 'keywords' not in document:
        document['keywords'] = None
    if 'multiplayer_modes' not in document:
        document['multiplayer_modes'] = None
    if 'name' not in document:
        document['name'] = None
    if 'rating' not in document:
        document['rating'] = None
    if 'similar_games' not in document:
        document['similar_games'] = None
    if 'summary' not in document:
        document['summary'] = None
    
# Get all the game info from IGDB and store locally
def getGames():
    # MongoDB object for game data
    game_data = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
    # MongoDB object for offset value
    igdb_config = MongoDB(database_name = 'gameConnect', collection_name = 'igdbConfiguration')
    # MongoDB object for communities
    communities_db = MongoDB(database_name = 'gameConnect', collection_name = 'gameCommunities')
    # MongoDB object for authorization token
    igdb_authorization = MongoDB(database_name = 'gameConnect', collection_name = 'igdbAuthorization')
    authorization_token = igdb_authorization.get_authorization_token() # token
    
    number_of_calls = 100000 # We can set to an infinite number
    
    # There are 50866 PC games on IGDB at the moment
    for x in range(number_of_calls):
        
        offset_value = igdb_config.get_offset_value() # get the current offset from local DB
        old_offset = offset_value # temporary save the offset
        
        # Get PC games, offset 500+ to get 500 games every call
        raw_body ='fields ' + str(filter) + '; where release_dates.platform = 6; limit 500; ' + 'offset ' + str(offset_value) + ';'
        response = requests.post(url, raw_body, headers = {'Client-ID': client_id, 'Authorization':authorization_token,})
        
        # Check for connection
        if response.status_code != 200:
            print('Failed to get data: ', response.status_code)
        else:
            print('Current offset value: ' + str(offset_value))
        
        jsonResponse = response.json() # Convert response to json
        
        for document in jsonResponse:        
                
            set_none(document) # Check for missing fields            
            game_data.insert(document) # Insert or Update data
            game_data.delete_duplications()
            community = createCommunities.create_community_dict(document) # create a community dictionary from a game document
            communities_db.insert(community) # Insert into community DB
            communities_db.delete_duplications
             
        # If the response length is 500, there are still values after that
        if len(jsonResponse) == 500:
            offset_value = offset_value + 500 # Increases by 500 due to IGDB limitation

            # Store offset_value back to igdbConfiguration
            old_offset_query = {'currentOffsetValue': old_offset}
            new_offset_query = {'$set': {'currentOffsetValue': offset_value}}
            igdb_config.update_offset(old_offset_query, new_offset_query)
            
        # If not, then the response is less than 500, we reached the end, break the loop
        else:
            break        
        
        
            
