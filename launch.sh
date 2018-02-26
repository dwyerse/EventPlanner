#!/bin/bash
echo "Starting mongo service..."
sudo service mongod start
echo "Starting node..."
npm start
