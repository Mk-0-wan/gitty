#!/usr/bin/env python3

from gitty_v1.extensions import usr, pxx, host, db_type, db , env
from gitty_v1.models.basemodel import Base
from sqlalchemy import create_engine, true
from sqlalchemy.orm import sessionmaker, scoped_session
import bcrypt


def create_Engine() -> object:
    """
        Create a SQLAlchemy engine based on the environment variable for database type.

        Returns:
            object: SQLAlchemy engine object.
    """
    try:
        if db_type == 'mariadb':

            engine = create_engine(
                    f'mysql+pymysql://gitty:gitty2024@localhost/gittydb'
                    )

            print("Using MariaDB with pymysql")

        else:
            engine = create_engine(
                    f'mysql+mysqldb://{usr}:{pxx}@{host}/{db}'
                    )

            print("Using MySQL mysqldb")
        return engine

    except Exception as e:
        print(f"Error while creating engine: {e}")



class DBStorage:
    """Database storage to hold all the users info"""

    __engine = None
    __session = None

    def __init__(self) -> None:
        """Instantiate the user database"""
        self.__engine = create_Engine()

        # Drop all tables if the environment is 'test'
        if env == 'test':
            Base.metadata.drop_all(self.__engine)

        # Create all tables
        Base.metadata.create_all(self.__engine)

        # Create a configured session class
        self.reload()

    def all(self, cls=None):
        """Querying for all the data matching cls in the database"""
        retrieved_data = {}
        from gitty_v1.accounts.account import Accounts
        from gitty_v1.models.basemodel import BaseModel
        CLASSES = {
                "Account": Accounts,
                "BaseModel": BaseModel
                }
        if cls is None:
            for cl in CLASSES:
                objs = self.__session.query(CLASSES[cl]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + "." + str(obj.id)
                    retrieved_data[key] = obj
        else:
            if isinstance(cls, str):
                cls = CLASSES.get(cls)
            objs = self.__session.query(cls).all()
            for obj in objs:
                key = obj.__class__.__name__ + "." + str(obj.id)
                retrieved_data[key] = obj
        print(retrieved_data)
        return retrieved_data

    def new(self, obj):
        """Takes in an object as an argument then posts it to the database"""
        self.__session.add(obj)

    def save(self):
        """Commits all the changes made during the session"""
        self.__session.commit()

    def reload(self):
        """Allows us to make a connection to the database"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session

    def get(self, cls, id):
        """Gets the object with a particular id"""
        if id is None or cls is None:
            return None
        return self.__session.query(cls).get(id)

    def count(self, cls=None):
        """Gets the object count"""
        return len(self.all(cls))

    def close(self):
        """Removes the current session in play"""
        self.__session.remove()

    def acc_authentication(self, username):
        """Authenticates the users who are already in the database"""
        from gitty_v1.accounts.account import Accounts

        # Query the database for the user with the provided email
        account_user = self.__session.query(Accounts).filter_by(gh_username=username).first()
        if (account_user):
            return account_user
        else:
            return None
