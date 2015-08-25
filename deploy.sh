#!/bin/bash

set -e

sudo -u web -- sh -c 'git pull && npm install --python=python2 && gulp build --production'
sudo -u root /etc/init.d/dataset-repo restart
