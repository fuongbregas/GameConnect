try:
    from pymongo import MongoClient
except ImportError:
    raise ImportError('PyMongo is not installed')

def createMongoClient():
    connection = MongoClient('localhost', 27017) # connect to mongoDB
    return connection