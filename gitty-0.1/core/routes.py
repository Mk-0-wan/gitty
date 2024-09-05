#!/usr/bin/python3
"""
Welcome page for gitty users
"""

from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound


# create the Blueprint
corebp = Blueprint(
        "corebp",
        __name__,
        template_folder='templates',
        static_folder='static'
        )

@corebp.route("/")
def intro_page():
    """Renders the introduction page for the gitty webpage"""
    try:
        return render_template("/core/homepage.html", title="Homepage")
    except TemplateNotFound:
        abort(404)
