#!/usr/bin/env python3

import pandas as pd
from pprint import pprint
from os import path
import json
from pandas.io.json import json_normalize

def loadfile(filename):
	with open(filename) as data_file:
		return json.load(data_file)

def parse(jsonData):
	if jsonData is None:
		raise ValueError("json is none")

	cols = ['timestamp', 'confidence',
			'x', 'y', 'z', 'loc_unit',
			'latitude', 'longitude', 'geo_unit',
			'campus', 'building', 'floor',
			'deviceId', 'lastSeen']
	rows = []
	for record in jsonData:
		for notif in record['notifications']:
			rows.append([notif['timestamp'], notif['confidenceFactor'],
						 notif['locationCoordinate']['x'], notif['locationCoordinate']['y'], notif['locationCoordinate']['z'], notif['locationCoordinate']['unit'],
						 notif['geoCoordinate']['latitude'], notif['geoCoordinate']['longitude'], notif['geoCoordinate']['unit'],
						 *notif['locationMapHierarchy'].split('>')[0:3], #Avoid zone, whatever that is
						 notif['deviceId'], notif['lastSeen']])

	return pd.DataFrame(rows, columns=cols)

def extract_macs(dataframe):
    return list(dataframe.deviceId.unique())

def extract_loc(dataframe):
	pass

def extract_geo(dataframe):
	pass

if __name__ == '__main__':
	data = loadfile('../data/testing/notify.json.2019-11-04-16-54')
	df = parse(data)
	