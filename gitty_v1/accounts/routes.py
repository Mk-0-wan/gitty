#!/usr/bin/python3

from flask  import Blueprint, flash, redirect, request, url_for, render_template
from .forms import RegistrationForm, LoginForm
from .account import Accounts
from flask_login import login_required, login_user, logout_user, current_user

# this will handle all the accounts login logouts and signing pages.
# this will act as my routing handler logic for python

accountsbp = Blueprint(
        'accountsbp',
        __name__,
        template_folder='templates',
        static_folder='static'
        )

@accountsbp.route('/signup/', methods=['GET', 'POST'])
def registration():
    """route to the registration form page"""
    form = RegistrationForm(request.form)
    if form.validate_on_submit():
        acc = Accounts(
                gh_username=form.username.data,
                password=form.password.data,
                email=form.email.data,
                session_id="dlfjalfjdaeialre"
                )
        acc.save()

        login_user(acc)
        flash(f"Account created for {form.username.data}", 'success')
        return redirect(url_for('accountsbp.login'))
    return render_template("accounts/signup.html", title="signup", form=form)


@accountsbp.route('/login/', methods=['GET', 'POST'])
def login():
    """route to the registration form page"""
    if current_user.is_authenticated:
        flash("You are already registerd", "info")
        return redirect(url_for('corebp.welcome'))

    from ..models import storage
    form = LoginForm(request.form)
    if form.validate_on_submit():
        auth = storage.acc_authentication(form.email.data, form.password.data)
        if auth:
            login_user(auth)
            flash(f"Welcome back {form.email.data}!", 'success')
            return redirect(url_for('corebp.welcome'))
        else:
            flash(f"t(0 - 0)t, see you later attacker", 'danger')
    return render_template("accounts/login.html", title="login", form=form)

@accountsbp.route("/logout")
@login_required
def logout():
    """Logs out the current active accounts"""
    logout_user()
    flash("You are logged out", "success")
    return redirect(url_for('accountsbp.login'))
