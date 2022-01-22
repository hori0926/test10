from crypt import methods
import re
import time, json
from turtle import position
import pandas as pd
from flask import Flask, render_template, request, url_for
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import functions

#spreadsheet関連の設定
scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('/Users/horinouchihirotaka/Documents/駅伝タイム計測/nada-ekiden-d6e023c85251.json', scope)
gc = gspread.authorize(credentials)
workbook = gc.open_by_url('https://docs.google.com/spreadsheets/d/1PxaWWtKH66Qh4TEvLA3iBTWXiMIDQ2qK-awXb-z6zQw/edit#gid=0')
worksheet = workbook.worksheet('シート1')

df = pd.DataFrame(worksheet.get_all_values()[1:],columns = worksheet.get_all_values()[0])


def my_url_for(endpoint, **values):
    url = url_for(endpoint, **values) 
    return url + '?ts={}'.format(int(time.time()))

app = Flask(__name__)
app.jinja_env.globals['url_for'] = my_url_for

club_names = ['club1','club2','club3']

@app.route('/home')
def home():
    return render_template('home.html')
    
@app.route('/')
def index():
    position = request.args.get('position')
    return render_template('index.html', position = position) # templatesフォルダ内のindex.htmlを表示する

@app.route('/upload', methods=["GET", "POST"])
def upload():
    data = request.form.to_dict()
    print(data)
    print(request.form['name'])
    return render_template('index.html')

@app.route('/record', methods=["GET", "POST"])
def test():
    global df
    data = json.loads(request.form['data'])
    position = data['position']
    print(position)
    rank = data['rank']
    team = data['team']
    time = data['time']
    df = functions.record_time(df, worksheet, team, time, position)
    return 'good'
    
if __name__ == '__main__':
    app.run()