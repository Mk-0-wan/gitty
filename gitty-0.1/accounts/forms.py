#!/usr/bin/python3

# this will handle all the login and registration forms

from gitty_v1.accounts.account import Accounts
from flask_wtf import FlaskForm
from wtforms import BooleanField, PasswordField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email, Length, EqualTo


class RegistrationForm(FlaskForm):
    """Flask Form that is going to help in storing userdata"""
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=20)], description="Username")
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    def validate_account(self):
        """Check if the user already exists"""
        existing_account = Accounts.query.filter_by(gh_username=self.username.data).first()
        existing_email = Accounts.query.filter_by(email=self.email.data).first()
        if existing_account:
            raise ValidationError('Username already used. Make sure you are using your github account name')
        if existing_email:
            raise ValidationError("Email account already in use. Please choose another one")
        if self.password.data  != self.confirm_password.data:
            raise ValidationError("PasswordField must match")

class LoginForm(FlaskForm):
    """Flask form for users who were already registred to the database"""
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Confirm password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me!')
    submit = SubmitField('Login')
