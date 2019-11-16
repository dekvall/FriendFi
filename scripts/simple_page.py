from flask import Flask
import pandas as pd
import sqlite3 as db
import json

app = Flask(__name__)
sqlite_file = 'feed_today.sqlite'
cols = ['timestamp', 'confidence',
	'x', 'y', 'z', 'loc_unit',
	'latitude', 'longitude', 'geo_unit',
	'campus', 'building', 'floor'] 

@app.route("/")
def home():
    with db.connect(sqlite_file) as con:
        cur = con.cursor()
        cur.execute("select * from records order by timestamp desc limit 100")
        rows = cur.fetchall()
        json_thing = []
        for row in rows:
            json_thing.append(dict(zip(cols, row)))

    return json.dumps(json_thing)
    
if __name__ == "__main__":
    app.run(debug=True)