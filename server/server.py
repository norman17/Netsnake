from flask import flask
from flask import request
from flask import render_template

@app.route('/', methods=['GET'])
def giveIndex():
    #return html file for the index
    return render_template('PATHTOFILEHERE', name=name)

@app.route('/Netsnake', methods=['GET'])
def giveSnake():
    #return html file that has snake game in javascript
    return render_template('PATHTOFILEHERE', name=name)

@app.route('/scoreboard', methods=['GET'])
def giveScoreboard():
    #return html file that has scoreboard
    return render_template('PATHTOFILEHERE', name=name)

@app.route('/postscore', methods=['POST'])
def postScore():
    #takes the score sent in the route (RESTful API) and stores it in MongoDB
    score = request.args.get('score')
    return render_template('PATHTOFILEHERE', name=name)
