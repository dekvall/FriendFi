#!/usr/bin/env python3
import time
import requests
import json
import parser
import sqlite3 as db

REAL_TIME_CACHE = 'http://13.48.149.61:8000/notifycache.json'
REAL_TIME = 'http://13.48.149.61:8000/notify.json'
MOVING_DATA = 'http://13.48.149.61:8000/data.json'
HEADERS = {'Content-Type': 'application/json'}

def poll_notify():
	response = requests.get(REAL_TIME_CACHE, headers=HEADERS)
	if response.status_code == 200:
		handled_response = f"[{response.content.decode('utf-8').rsplit(',',1)[0]}]"
		return json.loads(handled_response)
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
		try:
			timestamp = df.timestamp.unique()[0] #Same timestamp for all
		except IndexError:
			print("No timestamps")
			time.sleep(.5)
			continue
		if timestamp != last_timestamp:
			rows, cols = df.shape
			print(f'Writing {rows} record(s) to db:')
			#for index, row in df.iterrows():
				#print(row[1], row[2], row[3], row[10], row[11])
			df.to_sql('RECORDS', conn, if_exists='append', index=False)
		last_timestamp = timestamp
		#Write to dataframe to db maybe, idk
		time.sleep(1)