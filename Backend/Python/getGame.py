import requests
import pymongo
import time

# Important fields of game data from IGDB
filter = 'id,aggregated_rating,category,cover,first_release_date,game_modes,genres,keywords,multiplayer_modes,name,rating,similar_games,summary'

url ='https://api.igdb.com/v4/games/'
client_id = 'bvtuqo4e9i0uoscphs9pxqdrb2q2zn'
authorization = 'Bearer pujolmx5q5189wcp56o9buaulw2y0k' # Need to update/change it automatically once expired

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
        self._collection.update(post, post, upsert = True) # Warning: update() is deprecated

    # Storing new offset value
    def update_offset(self, post, new_value):
        # update old offset with new offset
        self._collection.update_one(post, new_value)

    # Default value is 0   
    def get_offset_value(self):
        returnValues = self._collection.find_one()
        # get offset value from Python dict
        return returnValues['currentOffsetValue']
    
# Get all the game info from IGDB and store locally, current total PC games are 50866
def getGames():
    # MongoDB object for game data
    mongo_db = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
    # MongoDB object for offset value
    igdb_config = MongoDB(database_name = 'gameConnect', collection_name = 'igdbConfiguration')

    offset_value = igdb_config.get_offset_value() # get the current offset from local DB
    old_offset = offset_value # temporary save the offset

    # If offset is equal to 0, we set number of calls to 102
    # if not, we loop/call 10 times
    if offset_value == 0:
        number_of_calls = 104
    else:
        number_of_calls = 2 

    # There are 50866 PC games on IGDB at the moment
    for x in range(number_of_calls):  
        # Get PC games, offset 500+ to get 500 games every call
        raw_body ='fields ' + str(filter) + '; where release_dates.platform = 6; limit 500; ' + 'offset ' + str(offset_value) + ';'
        response = requests.post(url, raw_body, headers = {'Client-ID':client_id, 'Authorization':authorization,})
        
        # Check for connection
        if response.status_code != 200:
            print('Failed to get data: ', response.status_code)
        else:
            print('Current offset value: ' + str(offset_value))

        time.sleep(2) # Sleep 2 seconds every call
        jsonResponse = (response.json())
        
        for collection in jsonResponse:
        # Insert or Update
            mongo_db.insert(collection)
        
        # If the response length is 500, there are still values after that
        if len(jsonResponse) == 500:
            offset_value = offset_value + 500 # Increases by 500 due to IGDB limitation
        # If not, then the response is less than 500, we reached the end, break the loop
        else:
            break        

    # Store offset_value back to igdbConfiguration
    old_offset_query = {'currentOffsetValue': old_offset}
    new_offset_query = {'$set': {'currentOffsetValue': offset_value}}
    igdb_config.update_offset(old_offset_query, new_offset_query)
        
getGames()



 


