import requests
from flask import Flask, render_template, request;


app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("index.html")

@app.route('/search', methods=['POST'])
def search():
    """Targets the action when the submission is done inside the form"""
    username = request.form['username']
    print(username)
    user_data = search_repo(username)
    return render_template('personal_info.html', user_data=user_data)

def search_repo(query_string):
    """Function that takes in the query_string make a github search account"""
    url = f"https://api.github.com/users/{query_string}"
    headers = {'Accept': 'application/vnd.github.v3+json'}
    response = requests.get(url, headers=headers)
    data = response.json()
    print(data)
    return data



if  __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
