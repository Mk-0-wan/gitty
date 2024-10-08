#!/usr/bin/python3

"""Making a simple testing database to see all users info"""

import json

class FileStorage:
    """simeple FileStorage method to see the implementation is working"""

    _file_storege = "gitty_v1/models/engine/file.json"
    _dataBase = {}

    def all(self, cls=None):
        """gets all the objects stored in the _dataBase or the specified obj in the cls
        """
        if cls:
            cls_dict = {}
            for key, value in self._dataBase.items():
                if cls == value.__class__:
                    cls_dict[key] = value
            return cls_dict
        return self._dataBase

    def new(self, obj):
        """adding a new object to the database"""
        self.all().update({obj.to_dict()['__class__'] + "." + obj.id: obj})

    def save(self):
        """saving the data into the database"""
        json_obj = {}
        for db_key in self._dataBase:
            json_obj[db_key] = self._dataBase[db_key].to_dict()  # to a more serializable format object
        with open(self._file_storege, 'w+', encoding="utf-8") as jsFile:
            json.dump(json_obj, jsFile, indent=4)

    def reload(self):
        """updloading all the data in the json file to the private _dataBase"""
        try:
            from .. import CLASSES
            with open(file=self._file_storege, mode="r") as jsFile:
                pyObject = json.load(jsFile)

            for key in pyObject:
                self._dataBase[key] = CLASSES[pyObject[key]["__class__"]](**pyObject[key])
        except Exception as e:
            print(f"{e}")

    def delete(self, obj=None):
        """delete a specified object from the _dataBase"""
        if obj:
            key = obj.__class__.__name__ + "." + obj.id
            del self._dataBase[key]
        else:
            print("Can't delete the object, not forming valid key")

    def get(self, cls, id):
        """getting a list of all the object from the same class"""
        if cls:
            for key, val in self.all(cls).items():
                get_key = str(cls) + "." + str(id)
                #print(get_key)
                if key == get_key:
                    return val

        else:
            print("Object not found")

    def count(self, cls=None):
        """count the number of objects in the database"""
        if cls:
            return len(self.all(cls))
