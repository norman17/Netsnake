from flask import Flask
from flask import request
from flask import render_template
from flask import send_from_directory
#import mysql.connector as mariadb
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
    print "hello world"
    return send_from_directory('snake', 'snake.js')



@app.route('/scoreboard.css', methods=['GET'])
def giveScorboardCss():
    #return html file for the index
    return send_from_directory('templates', 'scoreboard.css')

@app.route('/snake/scoreboard.js', methods=['GET'])
def giveScoreboardJs():
    #return html file for the index
    print "hello world"
    return send_from_directory('scoreboard', 'scoreboard.js')

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
        sortedScores.append((username, score))
        if i == 10:
            break


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
    try:
        cursor.execute("INSERT INTO highscores (username, score, submitted_date) VALUES (%s,%f)", (name, score, date))
    except mariadb.Error as error:
        print ("Error: {}".format(error))

    cursor.close()
    mdbconnection.close()
    return 'hi'
