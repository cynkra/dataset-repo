#!/bin/bash

sudo git pull && sudo npm install --python=python2 && sudo gulp build --production && pm2 reload server
