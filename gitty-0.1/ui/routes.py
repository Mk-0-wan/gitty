#!/usr/bin/env python3

from flask import Blueprint, render_template, abort, jsonify, session
from flask_login import login_required, current_user
from jinja2 import TemplateNotFound

uibp = Blueprint(
        "uibp",
        __name__,
        template_folder='templates',
        static_folder='static'
        )

@uibp.route("/welcome")
@login_required
def welcome():
    """The new homepage once the user logs in"""
    try:
        return render_template("/ui/ui.html", title="UI", user=current_user)
    except TemplateNotFound:
        abort(404)

@uibp.route("/projects")
@login_required
def projects():
    """Handling repo creation and deletion"""
    try:
        return render_template("/ui/projects.html", title="Repos")
    except TemplateNotFound:
        abort(404)

@uibp.route("/teams")
@login_required
def teams():
    """Handling repo creation and deletion"""
    try:
        return render_template("/ui/teams.html", title="Contributions")
    except TemplateNotFound:
        abort(404)

@uibp.route("/settings")
@login_required
def settings():
    """Handling repo creation and deletion"""
    try:
        return render_template("/ui/settings.html", title="Settings")
    except TemplateNotFound:
        abort(404)

