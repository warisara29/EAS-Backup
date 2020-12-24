#!/bin/sh

set -e

python manage.py collectstatic --noinput

uwsgi --socket:127.0.0.1:8081 --master --enable-threads --module myproject.wsgi

