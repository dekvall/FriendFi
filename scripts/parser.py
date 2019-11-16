#!/usr/bin/env python3

import pandas as pd
from pprint import pprint
from os import path
import json
from pandas.io.json import json_normalize

def parse(filename):
	with open(filename) as data_file:
		data = json.load(data_file)
	cols = ['timestamp', 'confidence',
			'x', 'y', 'z', 'loc_unit',
			'latitude', 'longitude', 'geo_unit',
			'campus', 'building', 'floor',
			'deviceId', 'lastSeen']
	rows = []
	for record in data:
		for notif in record['notifications']:
			rows.append([notif['timestamp'], notif['confidenceFactor'],
						 notif['locationCoordinate']['x'], notif['locationCoordinate']['y'], notif['locationCoordinate']['z'], notif['locationCoordinate']['unit'],
						 notif['geoCoordinate']['latitude'], notif['geoCoordinate']['longitude'], notif['geoCoordinate']['unit'],
						 *notif['locationMapHierarchy'].split('>')[0:3], #Avoid zone, whatever that is
						 notif['deviceId'], notif['lastSeen']])

	return pd.DataFrame(rows, columns=cols)


if __name__ == '__main__':
	df = parse('../data/testing/notify.json.2019-11-04-16-54')
	