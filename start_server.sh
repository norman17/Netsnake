#!/usr/bin/env bash

echo "Starting Server..."

cd server

export FLASK_APP=server.py

flask run --host=0.0.0.0 >> server.log 2>&1 & 

cd ..

echo "Done. Server log can be found in server/server.log"

