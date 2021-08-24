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

    