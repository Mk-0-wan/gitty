#!/usr/bin/python3

"""This is the homepage that the user will get to see once they have joined the page"""

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

@corebp.route("/welcome")
def welcome():
    """The new homepage once the user logs in"""
    try:
        return render_template("/core/welcomepage.html", title="Welcompage")
    except TemplateNotFound:
        abort(404)
