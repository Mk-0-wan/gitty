#!/usr/bin/python3

from flask import Blueprint, flash, redirect, url_for, request, session, jsonify
from flask_login import login_required, login_user, logout_user, current_user
from flask_dance.contrib.github import make_github_blueprint, github
from .account import Accounts
import os

# Blueprint setup
accountsbp = Blueprint(
    'accountsbp',
    __name__,
    template_folder='templates',
    static_folder='static'
)

# GitHub OAuth configuration
github_bp = make_github_blueprint(
    client_id=os.environ.get("GITHUB_OAUTH_CLIENT_ID"),
    client_secret=os.environ.get("GITHUB_OAUTH_CLIENT_SECRET"),
)

@accountsbp.route('/login/')
def login():
    if current_user.is_authenticated:
        next_page = request.args.get('next')
        return redirect(next_page or url_for('corebp.welcome'))
    next_page = request.args.get('next')
    print("Something is not working write")
    return redirect(url_for("github.login"))

@accountsbp.route('/login/github/authorized')
def github_authorized():
    if not github.authorized:
        flash("Failed to log in with GitHub.", "danger")
        return redirect(url_for('accountsbp.login'))

    github_resp = github.get("/user")
    if github_resp.ok:
        github_user_info = github_resp.json()
        print(github_user_info)
        gh_username = github_user_info['login']
        gh_photourl = github_user_info['avatar_url']
        from ..models import storage
        acc = storage.acc_authentication(gh_username)
        if not acc:
            acc = Accounts(
                gh_username=gh_username,
                gh_photourl=gh_photourl,
                session_id="some_session_id"
            )
            acc.save()

        login_user(acc)
        session['github_token'] = github.token['access_token']
        next_page = request.args.get('next')
        if next_page:
            return redirect(next_page)
        else:
            print("I am here")
            return redirect(url_for('uibp.welcome'))
    else:
        flash("Failed to fetch user info from GitHub", "danger")
        return redirect(url_for('accountsbp.login'))

@accountsbp.route("/api/get-token")
@login_required
def gettoken():
    """Passes the token to the front-end"""
    token = session['github_token']
    print(token)
    return jsonify({"token": token})

@accountsbp.route("/logout")
@login_required
def logout():
    """Logs out the current active accounts"""
    logout_user()
    flash("You are logged out", "success")
    return redirect(url_for('corebp.intro_page'))

