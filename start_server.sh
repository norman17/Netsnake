#!/usr/bin/env bash

echo "Starting Server..."

cd server

export FLASK_APP=server.py

nohup flask run --host=0.0.0.0 > server.log 2>&1 & 

cd ..

sleep 1 

echo "Done. Server log can be found in server/server.log"

echo "Process ID and path are as follows:"

echo

ps faux | grep [f]lask

echo

echo "If no process ID or is listed above, the server has failed to start."

echo "If you are running this on the original machine, the game can be reached at http://netsnake.freefall.in:5000"

echo "Otherwise, try port 5000 on your local loopback or external IP."

