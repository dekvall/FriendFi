#!/usr/bin/env python3
import time
import requests
import json
import parser
import sqlite3 as db

REAL_TIME = 'http://13.48.149.61:8000/notify.json'
MOVING_DATA = 'http://13.48.149.61:8000/data.json'
HEADERS = {'Content-Type': 'application/json'}

def poll_notify():
	response = requests.get(REAL_TIME, headers=HEADERS)
	if response.status_code == 200:
		return json.loads(response.content.decode('utf-8'))
	else:
		print("No response")
		return None

if __name__ == '__main__':
	last_timestamp = None

	sqlite_file = 'feed_today.sqlite'
	conn = db.connect(sqlite_file)

	while True:
		macs = None
		data = None
		try:
			data = poll_notify()
		except json.decoder.JSONDecodeError:
			print("!!!!Decoding failed!!!!")
			time.sleep(.5)
			continue
		df = parser.parse(data)
		timestamp = df.timestamp.unique()[0] #Same timestamp for all

		if timestamp != last_timestamp:
			rows, cols = df.shape
			print(f'Writing {rows} record(s) to db:')
			for index, row in df.iterrows():
				print(row[1], row[2], row[3], row[10], row[11])
			df.to_sql('RECORDS', conn, if_exists='append', index=False)
		last_timestamp = timestamp
		#Write to dataframe to db maybe, idk
		time.sleep(1)