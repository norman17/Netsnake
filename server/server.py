from flask import flask
from flask import request
from flask import render_template
import mysql.connector as mariadb

mdbconnection = mariadb.connect(user='netsnake', password='NETSNAKE', database='scoreboard')
cursor = mdbconnection.cursor()


@app.route('/', methods=['GET'])
def giveIndex():
    #return html file for the index
    return render_template('index.html', name=name)

@app.route('/scoreboard', methods=['GET'])
def giveScoreboard():
    mdbconnection = mariadb.connect(user='netsnake', password='NETSNAKE', database='scoreboard')
    cursor = mdbconnection.cursor()
    try:
        cursor.execute("SELECT username,score FROM scores ORDER BY scores DESC")
    except mariadb.Error as error:
        print ("Error: {}".format(error))
    #return html file that has scoreboard
    i = 0
    sortedScores = []
    for username, score in cursor:
        sortedScores.append((username))
        if i == 10:
            break


    mdbconnection.close()
    return render_template('scoreboard.html', name=name)

@app.route('/postscore', methods=['POST'])
def postScore():
    mdbconnection = mariadb.connect(user='netsnake', password='NETSNAKE', database='scoreboard')
    cursor = mdbconnection.cursor()
    #takes the score sent in the route (RESTful API) and stores it in MongoDB
    score = request.args.get('score')
    try:
        cursor.execute("INSERT INTO scores (username,score) VALUES (%s,%f)", (username,score))
    except mariadb.Error as error:
        print ("Error: {}".format(error))
    mdbconnection.close()
    return
