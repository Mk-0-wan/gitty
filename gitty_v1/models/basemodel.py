#!/usr/bin/python3

"""Welcome to the base model where you will create thelogic
    that will best describe how we should be creating 
    all of our objects from these project"""

timeformat = "%Y-%m-%dT%H:%M:%S.%f"

import uuid
from sqlalchemy import Column, DateTime, String
from .. import models
from datetime import datetime
from sqlalchemy.orm import DeclarativeBase

if models.storage_type == "gitty_db":
    class Base(DeclarativeBase):
        pass
else:
    pass

class BaseModel:
    """Provides the layout of how we are going to store our data"""

    if models.storage_type == "db":
        id = Column(String(60), primary_key=True)
        created_at = Column(DateTime, default=datetime.utcnow())
        updated_at = Column(DateTime, default=datetime.utcnow())

    def __init__(self, *args, **kwargs):
        """Setting up the metadata information to our database"""
        if kwargs:
            # we are going to set up the kwargs sent to us by the user
            for key, value in kwargs.items():
                # check for any mods before setting up
                if key != "__class__":
                    setattr(self, key, value)
            # now modding the date in the kwargs
            if hasattr(self, "created_at") and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], timeformat)
            # now modding the date in the kwargs
            if hasattr(self, "updated_at") and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs["updated_at"], timeformat)

            else:
                self.updated_at = datetime.utcnow()
            if kwargs.get("id", None) is None:
                self.id = str(uuid.uuid4())
        else:
            # setting up data for the first time
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at
            self.id = str(uuid.uuid4())

    def save(self):
        """save each instance of the object created"""
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()


    def delete(self) -> None:
        """delete the current object that was created"""
        models.storage.delete(self)

    def __str__(self) -> str:
        """printout the actual object created"""
        return f"[{self.__class__.__name__}] [{self.id}] {self.__dict__}"

    def to_dict(self):
        """Make a dict out of all the self.__dict__ object"""
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(timeformat)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(timeformat)
        new_dict["__class__"] = self.__class__.__name__
        # add the _sa_instance_state checker
        if "_sa_instance_state" in new_dict:
            del new_dict['_sa_instance_state']
        # also  the password checker
        return  new_dict


"""
base = BaseModel()
base.save()
base1 = BaseModel()
base1.save()
base2 = BaseModel()
base2.save()
base3 = BaseModel()
base3.save()
"""
