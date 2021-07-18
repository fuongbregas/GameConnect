from pymongo import MongoClient
connection = MongoClient('localhost', 27017) # connect to mongo_db
list_of_db = connection.list_database_names()

def offset_value_check():
    gameConnect_database = connection['gameConnect']
    list_of_collections = gameConnect_database.list_collection_names()

    # check if igdbConfiguration collection is available
    if 'igdbConfiguration' in list_of_collections:
        print('igdbConfiguration collection exists') # Do nothing!
    else:
        # Create a collection with offset_value = 0
        igdb_collection = gameConnect_database['igdbConfiguration']
        offset = {'offset_value' : 0}
        igdb_collection.insert_one(offset)
    
offset_value_check