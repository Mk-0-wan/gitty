#!/usr/bin/python3
from static.test import load_dotenv
import os

output = os.getenv('GTTY_ENV')
print(output)

