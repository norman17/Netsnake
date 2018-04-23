#!/usr/bin/env bash

echo "Starting Server..."

cd server

export FLASK_APP=server.py

flask run --host=0.0.0.0 >> server.log 2>&1 & 

cd ..

echo "Done. Server log can be found in server/server.log"

echo "If you are running this on the original machine, the game can be reached at http://netsnake.freefall.in:5000"

echo "Otherwise, try port 5000 on your local loopback or external IP."

