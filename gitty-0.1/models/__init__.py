#!/usr/bin/python3

from ..extensions import storage_type

if storage_type == "gitty_db":
    from .engine.db_storage import DBStorage
    storage = DBStorage()
else:
    from gitty_v1.accounts.account import Accounts
    from gitty_v1.models.basemodel import BaseModel
    from gitty_v1.models.engine.file_storage import FileStorage
    print("File storage method applied");
    # from models.engine.file_storage import FileStorage

    CLASSES = {
            'BaseModel': BaseModel,
            'Accounts': Accounts
            }

    storage = FileStorage()
    #print(storage.get(CLASSES['Accounts'], CLASSES['Accounts']().id))
    #print(storage.count(CLASSES['Accounts']))

# either method ensure that reload of data is available
storage.reload()
