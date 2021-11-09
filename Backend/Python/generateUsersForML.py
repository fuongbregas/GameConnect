
import requests
"""



}
  
# sending post request and saving response as response object
r = requests.post(url = 'http://127.0.0.1:3000/backend/auth/register', data = data)
"""



import csv
import random
from random import randint
import datetime
import threading
import signal
from dotenv import load_dotenv
load_dotenv()

from random import randrange
from datetime import timedelta
from random import sample

import pymysql.cursors

threads = []

connection = pymysql.connect(host='127.0.0.1',
                             user='cmpe295b',
                             password='jamesbond2021!',
                             database='gameConnect',
                             cursorclass=pymysql.cursors.DictCursor, 
                             use_unicode=True, autocommit=True
                             )


def generateRandomGames():
    """
    SELECT column_name FROM table_name
    ORDER BY RAND()  
    LIMIT N;    
    """
    list_games = []
    try:

        with connection.cursor() as cur:
            sql = 'SELECT id FROM Games ORDER BY RAND() limit {0};'.format(str(randint(1,3)))
            print(sql)
            cur.execute(sql)
            rows = cur.fetchall()

        for row in rows:
            print(row['id'])
            list_games.append(row['id'])

    finally:
        #connection.close()
        return list_games
      
    


def generate_data(thread_num,numbatch):
    with open("./data/data.csv", mode='r') as profile:
        next(profile)
        csv_reader1 = csv.reader(profile, delimiter=',')
        users = list(csv_reader1)
        for row in users:
            #print(row)
            username = row[1]+row[2]+str(random.randint(0,99))
            email = row[3]
            
            saved_games = generateRandomGames()
            #print(username, email, saved_games)
            record = {

                "username": username,
                "email": email,
                "password": "password",
                "saved_games":saved_games

             }

            print(record)
            r = requests.post(url = 'http://127.0.0.1:3000/backend/auth/register', data = record)
                




def signal_handler(sig, frame):
    print("Program interrupted. Exiting...")
    timeout_handler()


def timeout_handler():
    print("Program timed out. Stopping threads...")
    for t in threads:
        t.stop();


def generate_data_thread_task(thread_num, numbatch):
    #lock.acquire()
    generate_data(thread_num,numbatch)
    #lock.release()


def main_task_generate_data(thread_count,numbatch):
    print("Running generation data tool...")
    signal.signal(signal.SIGINT, signal_handler)

    start_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    timeout = 3600

    print("insert mongodb starttime"+str(start_time))

    # creating a lock
    #lock = threading.Lock()

    for tid in range(thread_count):
        try:
            thread = threading.Thread(target=generate_data_thread_task,args=(tid,numbatch))
            threads.append(thread)
            thread.start()
            if thread.is_alive():
                print(str(tid) + ' Thread Still running')
            else:
                print(str(tid) +' Thread Completed')
        except:
            print("thread exception handle")

    if timeout > -1:
        timer = threading.Timer(timeout, timeout_handler)
        timer.start()

    # wait for threads to complete
    for tid in range(thread_count):
        threads[tid].join()

        print("Threading {0}:".format(tid))

    end_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print("insert mongodb endtime" + str(end_time))
    timer.cancel()


if __name__ == "__main__":
    main_task_generate_data(1,2)
    connection.close()