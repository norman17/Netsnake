from flask import flask
from flask import request
from flask import render_template
import mysql.connector as mariadb
from datetime import date

# mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
# cursor = mdbconnection.cursor()


@app.route('/', methods=['GET'])
def giveIndex():
    #return html file for the index
    return render_template('index.html', name=name)

@app.route('/scoreboard', methods=['GET'])
def giveScoreboard():
    mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
    cursor = mdbconnection.cursor()
    try:
        cursor.execute("SELECT name, score, date FROM highscores ORDER BY score DESC LIMIT 10")
    except mariadb.Error as error:
        print ("Error: {}".format(error))
    #return html file that has scoreboard
    i = 0
    sortedScores = []
    for username, score in cursor:
        sortedScores.append((username))
        if i == 10:
            break


    cursor.close()
    mdbconnection.close()
    return render_template('scoreboard.html', name=name)

@app.route('/postscore', methods=['POST'])
def postScore():
    mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
    cursor = mdbconnection.cursor()
    #takes the score sent in the route (RESTful API) and stores it in MongoDB
    score = request.args.get('score')
    name = request.args.get('name')
    date = date.today()
    try:
        cursor.execute("INSERT INTO highscores (name, score, date) VALUES (%s,%f)", (name, score, date))
    except mariadb.Error as error:
        print ("Error: {}".format(error))

    cursor.close()
    mdbconnection.close()
    return
