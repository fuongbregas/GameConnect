# This file is used in run.py

import createMongoClient
connection = createMongoClient.createMongoClient()

def offset_value_check():
    gameConnect_database = connection['gameConnect']
    # List all collections
    list_of_collections = gameConnect_database.list_collection_names()
    
    # check if igdbConfiguration collection is available
    if 'igdbConfiguration' in list_of_collections:
        print('igdbConfiguration collection exists') # Do nothing!
    else:
        # Create a collection with offset_value = 0
        igdb_collection = gameConnect_database['igdbConfiguration']
        offset = {'currentOffsetValue' : 0}
        igdb_collection.insert_one(offset)