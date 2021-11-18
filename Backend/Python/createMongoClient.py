# This file is used in getGame.py, getGenres.py and offsetValue.py to init a connection to MongoDB
import os
from dotenv import load_dotenv

try:
    from pymongo import MongoClient
except ImportError:
    raise ImportError('PyMongo is not installed')

load_dotenv()
#uri = os.getenv('AWS_MONGO')
uri = os.getenv('LOCAL_MONGO')

def createMongoClient():
    connection = MongoClient(uri)  # connect to AWS 52.14.35.109

    return connection 