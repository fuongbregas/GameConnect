
from MongoDB_Object import MongoDB
import csv
from collections import defaultdict
import pymysql.cursors

connection = pymysql.connect(host='127.0.0.1',
                             user='cmpe295b',
                             password='jamesbond2021!',
                             database='gameConnect',
                             cursorclass=pymysql.cursors.DictCursor, 
                             use_unicode=True, autocommit=True
                             )
cnx = connection.cursor();

headerList = ['username', '1', '1_genre','2','2_genre', '3','3_genre','4','4_genre','5','5_genre']
user_data = MongoDB(database_name = 'gameConnect', collection_name = 'userData')
games_data = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
genres = MongoDB(database_name = 'gameConnect', collection_name = 'gameGenres')

game_id = []

def generateUsersRandom():

    with open("./data/completeCsv.csv", 'w') as file:
        dw = csv.writer(file, delimiter=',')
    
    # Important fields of game data from IGDB
        games_info = {}
        records = (user_data.get_all_user())
        for rec in records:       
            username = rec['username'] 
            saved_games = rec['saved_games']
            dw.writerow([username]+[saved_games])
            #print(username,saved_games)
        file.close()

def generateMapping():

    game_id_genre_dict = defaultdict(list) 
    game_id_game_name_dict= dict()
    data = games_data.get_all_games_from_collection()
    Indx =0
    with open("./data/id_to_name.csv", 'w') as f:
        csv_writer = csv.writer(f, delimiter=',')
        for i in data:
        #print(i['name'],i['genres'],i['id'])
            genres_id = i['genres']
            game_id_game_name_dict[i['id']] = i['name']
            game_id = i['id'] 
            game_name = i['name']
        #print(i['name'],i['id'])
            if not genres_id:
                continue
            else:
                for id in genres_id:
                    genre_name = genres.get_genre_name(id)
                    #print(i['name'],i['id'],genre_name)
                    #game_id_genre_dict[i['id']].append(genre_name)
                    #print([game_id]+[game_name]+[genre_name])
                    csv_writer.writerow([game_id]+[game_name]+[genre_name])
        f.close()
        