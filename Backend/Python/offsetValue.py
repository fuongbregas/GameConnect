from pymongo import MongoClient
connection = MongoClient('localhost', 27017) # connect to mongo_db

def offset_value_check():
    gameConnect_database = connection['gameConnect']
    # List all collections
    list_of_collections = gameConnect_database.list_collection_names()
    print(list_of_collections)
    # check if igdbConfiguration collection is available
    if 'igdbConfiguration' in list_of_collections:
        print('igdbConfiguration collection exists') # Do nothing!
    else:
        # Create a collection with offset_value = 0
        igdb_collection = gameConnect_database['igdbConfiguration']
        offset = {'currentOffsetValue' : 0}
        igdb_collection.insert_one(offset)
    
offset_value_check()