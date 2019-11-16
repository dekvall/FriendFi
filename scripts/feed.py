#!/usr/bin/env python3
import time
import requests
import json
import parser

REAL_TIME = 'http://13.48.149.61:8000/notify.json'
MOVING_DATA = 'http://13.48.149.61:8000/data.json'
HEADERS = {'Content-Type': 'application/json'}

def poll_endpoint():
	response = requests.get(REAL_TIME, headers=HEADERS)
	if response.status_code == 200:
		return json.loads(response.content.decode('utf-8'))
	else:
		print("No response")
		return None

if __name__ == '__main__':
	while True:
		macs = None
		try:
			data = poll_endpoint()
		except json.decoder.JSONDecodeError:
			print("Decoding failed")

		df = parser.parse(data)
		macs = parser.extract_macs(df)

		if '08:C5:E1:1F:E7:C4'.lower() in macs:
			print("="*5 + "ERIK IS MOVING" + "="*5)
		if 'D8:BB:2C:D2:E6:C3'.lower() in macs:
			print("="*5 + "DANNE IS MOVING" + "="*5)
		print(macs)
		time.sleep(.2)