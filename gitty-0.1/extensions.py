#!/usr/bin/python3
import os
from dotenv import load_dotenv

load_dotenv()
storage_type = os.getenv('GTTY_STORAGE_TYPE')
db_type = os.getenv('GTTY_DB_TYPE')
host = os.getenv('GTTY_MYSQL_HOST')
usr = os.getenv('GTTY_MYSQL_USER')
pxx = os.getenv('GTTY_MYSQL_PWD')
db = os.getenv('GTTY_MYSQL_DB')
env = os.getenv('GTTY_ENV')
