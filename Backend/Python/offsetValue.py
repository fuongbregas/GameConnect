from pymongo import MongoClient
connection = MongoClient('localhost', 27017) # connect to mongo_db
list_of_db = connection.list_database_names()

def check_gameConnect_exist():
    if 'gameConnect' in list_of_db:
        return True
    return False

def offset_value_check():
    if check_gameConnect_exist():
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

    else:
        print("gameConnect is not available in MongoDB")

offset_value_check()