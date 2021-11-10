import createMongoClient

# MongoDB object used for inserting
class MongoDB(object):
    def __init__(self, database_name=None, collection_name=None):
        try:
            self._connection = createMongoClient.createMongoClient()
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
    def get_all_user(self):
        return self._collection.find()
    
    def get_all_games_from_collection(self):
        return self._collection.find()

    def get_genre_name(self,id): 
        #_id": 0, "name": 1, "address": 1 }
        #for x in mycol.find({}, {"_id":0, "name": 1, "address": 1 }):
        cur = self._collection.find({'id':id},{'name':1})
        for rec in cur:
            if rec['name'] is None:
                return ""    
            else:
                return(rec['name'])

    def get_genre_id(self,id): 
    #_id": 0, "name": 1, "address": 1 }
    #for x in mycol.find({}, {"_id":0, "name": 1, "address": 1 }):
        cur = self._collection.find({'id':id},{'genres':1})
        for rec in cur:
            if rec['genres'] is None:
                return ""    
            else:
                return(rec['genres'])
    
    def insert_recom_friend(self,username,payload):
        #db.userData.update({"username":"RossieLinkie5"},{$set:{"recomended_friends":["value5"]}})
        return self._collection.update({'username':username,},{'$set':{'recommended_friends':payload}})

    def get_all_saved_games(self): 
        return self._collection.find()
        