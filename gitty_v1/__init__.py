#!/usr/bin/python3

from flask import Flask
from flask_login import LoginManager
from gitty_v1.core.routes import corebp
from gitty_v1.accounts.routes import  accountsbp

app = Flask(__name__)
app.config['SECRET_KEY'] = '05b7fad9939729a4d3c5057721e182ed45957585806ad5766d2e333a2d82a243'

# register all the blueprints
app.register_blueprint(corebp)
app.register_blueprint(accountsbp)


# Handles flask login and logout
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'accountsbp.login'


@login_manager.user_loader
def load_user(user_id):
    """Loads the user id"""
    from .models import storage
    from .accounts.account import Accounts
    return storage.get(Accounts, user_id)
# Constant Values
