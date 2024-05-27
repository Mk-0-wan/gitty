#!/usr/bin/python3

import bcrypt
from flask_login import UserMixin
from ..extensions import storage_type
from sqlalchemy import Column, String
from gitty_v1.models.basemodel import BaseModel, Base

class Accounts(BaseModel, Base, UserMixin):
    """Accounts class holding all the neccesary data"""
    if (storage_type):
       __tablename__ = "Accounts"

       gh_username = Column(String(128), nullable=False, unique=True)
       password = Column(String(128), nullable=False)
       email = Column(String(128), nullable=False)
       id = Column(String(60), primary_key=True)

    else:
        gh_username = ""
        password = ""
        email = ""
        session_id = ""

    def __init__(self, *args, **kwargs) -> None:
        """initializes the basemodel class first"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, __name: str, __value: str) -> None:
        if __name  == "password":
            ##__value = bcrypt.generate_password_hash(__value).decode('utf-8')
            __salt = bcrypt.gensalt()
            bytes = __value.encode("utf-8")
            __value = bcrypt.hashpw(bytes, __salt).decode("utf-8")
        return super().__setattr__(__name, __value)

"""
ac = Accounts()
users = {
        "username" : "bob",
        "email": "bob@gmail.com",
        "password": "spaceandtime",
        "session_id": "e4432ddg3"
        }
ac.save()
print("---==###################==---")
print(ac)
print(ac.id)
print(ac.__class__.__name__)
print("---==###################==---")
print()
prin()
print()
fs = models.storage
print("---====---")
print("Each instance saved in the file")
print(fs.all())
print()
print()
print(fs.get(ac, ac.id))
print()
print()
print(fs.count())
print("---====---")
"""
