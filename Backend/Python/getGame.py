import requests
import pymongo
import time

try:
    from pymongo import MongoClient
except ImportError:
    raise ImportError('PyMongo is not installed')

# MongoDB object used to insert 
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
        # insert to document without duplication
        self._collection.update(post, post, upsert = True)

def getGames():
    url ='https://api.igdb.com/v4/games/'
    # Authorization number has expiration, need to update/change it automatically
    headers = {'Client-ID':'bvtuqo4e9i0uoscphs9pxqdrb2q2zn', 'Authorization':'Bearer pujolmx5q5189wcp56o9buaulw2y0k',}
    
    # raw_body ='fields *; where release_dates.platform = 6 & rating >= 90 & release_dates.date >= 1616996761228; limit 10;'
    #print("Test")    
    # Check for connection
    #if response.status_code != 200:
    #    print('Failed to get data:', response.status_code)
    #else:
    #    print('Worked')
    
    mongo_db = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
    
    for x in range(84):
        # Get PC games, offset 500+ to get 500 games every call
        raw_body ='fields *; where release_dates.platform = 6; limit 500; ' + 'offset ' + str(x + 500) + ';'

        response = requests.post(url, raw_body, headers)
        jsonResponse = (response.json())
        time.sleep(2) # Pause for 2 seconds every call
        # Insert or Update to MongoDB
        for collection in jsonResponse:
        # Insert or Update
            mongo_db.insert(collection)
        
getGames()

    


