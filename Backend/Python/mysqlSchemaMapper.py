
from MongoDB_Object import MongoDB
import csv
from collections import defaultdict
headerList = ['username', '1', '1_genre','2','2_genre', '3','3_genre','4','4_genre','5','5_genre']
user_data = MongoDB(database_name = 'gameConnect', collection_name = 'userData')
games_data = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
genres = MongoDB(database_name = 'gameConnect', collection_name = 'gameGenres')
game_id = []

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

game_id_genre_dict = defaultdict(list) 
game_id_game_name_dict= dict()
data = games_data.get_all_games_from_collection()
for i in data:
    #print(i['name'],i['genres'],i['id'])
    genres_id = i['genres']
    game_id_game_name_dict[i['id']] = i['name']
    print(i['name'],i['id'])
    for id in genres_id:
        genre_name = genres.get_genre_name(id)
        #print(i['name'],i['id'],genre_name)
        game_id_genre_dict[i['id']].append(genre_name)

            #genres.get_genre_name(i['id'])
    """
    for i in data:
        #games_info[i['name']]= i['genres']
        id = i['id']
        if(game_id[id]):
            continue
        else:
            name = i['name']
            game_id[id]=name
            genres = i['genres']
        print(id)
            #dw.writerow([name]+[genres])

           
    """
    
        
            
            