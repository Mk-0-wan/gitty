#!/usr/bin/python3

from enum import unique
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
        gh_photourl = Column(String(256), nullable=False, unique=True)
        id = Column(String(60), primary_key=True)

    else:
        gh_username = ""
        gh_photourl = ""
        session_id = ""

    def __init__(self, *args, **kwargs) -> None:
        """initializes the basemodel class first"""
        super().__init__(*args, **kwargs)
