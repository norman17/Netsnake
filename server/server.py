from flask import Flask
from flask import request
from flask import render_template
from flask import send_from_directory
import mysql.connector as mariadb
from datetime import date

app = Flask(__name__)

# mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
# cursor = mdbconnection.cursor()


@app.route('/', methods=['GET'])
def giveIndex():
    #return html file for the index
    return send_from_directory('templates', 'index.html')

@app.route('/index.css', methods=['GET'])
def giveIndexCss():
    #return html file for the index
    return send_from_directory('templates', 'index.css')

@app.route('/snake/snake.js', methods=['GET'])
def giveSnakeJs():
    #return html file for the index
    #print "hello world"
    return send_from_directory('snake', 'snake.js')

@app.route('/about', methods =['GET'])
def giveAboutPage():
    return send_from_directory('templates', 'about.html')

@app.route('/player/<playername>')
def givePlayerData(playername):
    mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
    cursor = mdbconnection.cursor()
    qstr = "SELECT score, date FROM highscores WHERE name = \""
    qstr += playername
    qstr += "\" ORDER BY score DESC LIMIT 10"
    try:
        cursor.execute(qstr)
    except mariadb.Error as error:
        print ("Error: {}".format(error))
    response = "High scores for " + playername + "\n"
    for score, date in cursor:
        response += "Date: " + date.strftime('%Y-%m-%d') + " Score: " + str(score) + "\n"
    return render_template("statpage.html", text = response.split('\n'))

@app.route('/players')
def giveScoreboardData():
    mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
    cursor = mdbconnection.cursor()
    qstr = "SELECT name, score, date FROM highscores ORDER BY score DESC"
    try:
        cursor.execute(qstr)
    except mariadb.Error as error:
        print ("Error: {}".format(error))
    response = "NetSnake High Scores:\n\n"
    for name, score, date in cursor:
        response += "Name: " + name + "\n Score: " + str(score) + "\n Date: " + date.strftime('%Y-%m-%d') + "\n\n"
    return render_template("statpage.html", text = response.split('\n'))


@app.route('/scoreboard.css', methods=['GET'])
def giveScorboardCss():
    #return html file for the index
    return send_from_directory('templates', 'scoreboard.css')

@app.route('/snake/scoreboard.js', methods=['GET'])
def giveScoreboardJs():
    #return html file for the index
    print "hello world"
    return send_from_directory('snake', 'scoreboard.js')

@app.route('/scoreboard', methods=['GET'])
def giveScoreboard():
    mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
    cursor = mdbconnection.cursor()
    try:
        cursor.execute("SELECT name, score, date FROM highscores ORDER BY score DESC LIMIT 10")
    except mariadb.Error as error:
        print ("Error: {}".format(error))
    #return html file that has scoreboard
    sortedScores = []
    for username, score, date in cursor:
        sortedScores.append((username, score, date))

    cursor.close()
    mdbconnection.close()
    return render_template('scoreboard.html', sortedScores=sortedScores)

@app.route('/postscore', methods=['POST'])
def postScore():
    mdbconnection = mariadb.connect(user='netsnakeserver', password='sneksneksnek', database='netsnake')
    cursor = mdbconnection.cursor()
    #takes the score sent in the route (RESTful API) and stores it in MongoDB
    score = request.args.get('score')
    username = request.args.get('username')
    submitted_date = date.today()
    app.logger.info(score)
    app.logger.info(username)
    app.logger.info(submitted_date)

    insquery = "INSERT INTO highscores (name, score, date) VALUES (\"" + username + "\"," + str(score) + ",\"" + submitted_date.strftime('%Y-%m-%d') + "\")"

    try:
        cursor.execute(insquery)
    except mariadb.Error as error:
        print ("Error: {}".format(error))

    mdbconnection.commit()
    cursor.close()
    mdbconnection.close()
    return 'hi'
