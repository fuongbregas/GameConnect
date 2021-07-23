import requests
from datetime import datetime
import time


# Important fields of game data from IGDB
filter = 'id,aggregated_rating,category,cover,first_release_date,game_modes,genres,keywords,multiplayer_modes,name,rating,similar_games,summary'

url ='https://api.igdb.com/v4/games/'
client_id = 'bvtuqo4e9i0uoscphs9pxqdrb2q2zn'
# authorization = 'Bearer pujolmx5q5189wcp56o9buaulw2y0k' # Need to update/change it automatically once expired

try:
    from pymongo import MongoClient
except ImportError:
    raise ImportError('PyMongo is not installed')

# MongoDB object used for inserting
class MongoDB(object):
    def __init__(self, host='localhost', port=27017, database_name=None, collection_name=None):
        try:
            self._connection = MongoClient(host=host, port=port, maxPoolSize=200)
        except Exception as error:
            raise Exception(error)
        self._database = None
        self._collection = None
        if database_name:
            self._database = self._connection[database_name]
        if collection_name:
            self._collection = self._database[collection_name]

    # Insert game data
    def insert(self, post):
        # insert/update to DB without duplication
        self._collection.update(post, post, upsert = True) # Warning: update() is deprecated, lazy to rewrite.

    # Storing new offset value
    def update_offset(self, post, new_value):
        # update old offset with new offset
        self._collection.update_one(post, new_value)

    # Default value is 0   
    def get_offset_value(self):
        returnValues = self._collection.find_one()
        # get offset value from Python dict
        return returnValues['currentOffsetValue']

    # Get authorization token from mongo_db
    def get_authorization_token(self):
        returnToken = self._collection.find_one()
        # get token value from Python dict
        return 'Bearer ' + str(returnToken['igdb_token']) # The full authorization is 'Bearer token_key'

# Convert seconds to_epoch_time_converter, ISO 8061
def time_converter(epoch_time):
    return datetime.utcfromtimestamp(epoch_time).isoformat()

# Function helps adding missing fields as NULL,  except time
def set_none(document):
    if 'aggregated_rating' not in document:
        document['aggregated_rating'] = None
    if 'category' not in document:
        document['category'] = None
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
    
# Get all the game info from IGDB and store locally, current total PC games are 50866
def getGames():
    # MongoDB object for game data
    mongo_db = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
    # MongoDB object for offset value
    igdb_config = MongoDB(database_name = 'gameConnect', collection_name = 'igdbConfiguration')
    # MongoDB object for authorization token
    igdb_authorization = MongoDB(database_name = 'gameConnect', collection_name = 'igdbAuthorization')
    authorization_token = igdb_authorization.get_authorization_token() # token
    
    number_of_calls = 100000 # We can set to a huge number

    # There are 50866 PC games on IGDB at the moment
    for x in range(number_of_calls):  
        offset_value = igdb_config.get_offset_value() # get the current offset from local DB
        old_offset = offset_value # temporary save the offset
        
        # Get PC games, offset 500+ to get 500 games every call
        raw_body ='fields ' + str(filter) + '; where release_dates.platform = 6; limit 500; ' + 'offset ' + str(offset_value) + ';'
        response = requests.post(url, raw_body, headers = {'Client-ID':client_id, 'Authorization':authorization_token,})
        
        # Check for connection
        if response.status_code != 200:
            print('Failed to get data: ', response.status_code)
        else:
            print('Current offset value: ' + str(offset_value))
        
        jsonResponse = response.json() # Convert response to json
        
        for document in jsonResponse:        
                
            set_none(document) # Check for missing fields            
            mongo_db.insert(document) # Insert or Update data
            
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
        time.sleep(1.2) # Sleep 1.2 seconds every call       
      



 


