import requests
import pymongo
import time

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

    def insert(self, post):
        # insert/update to DB without duplication
        self._collection.update(post, post, upsert = True)

def getGames():
    
    mongo_db = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
    offset_value = 0
    # There are 50765 PC games on IGDB at the moment
    for x in range(103):  
        # Get PC games, offset 500+ to get 500 games every call
        raw_body ='fields *; where release_dates.platform = 6; limit 500; ' + 'offset ' + str(offset_value) + ';'
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
        offset_value = offset_value + 500 # Increases by 500 due to IGDB limitation       
        
getGames()

    


