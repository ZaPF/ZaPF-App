#!/usr/bin/python

import sys, json
import yaml


with open(sys.argv[1], 'r') as ak_file:
	ak_data = yaml.load(ak_file.read())

with open(sys.argv[2], 'r') as slot_file:
	slot_data = yaml.load(slot_file.read())

out = {'arbeitskreise':ak_data,'slots':slot_data}

json_out = json.dumps(out,sort_keys=True,indent=4)

print(json_out)

with open('../api/arbeitskreise','w') as json_file:
	json_file.write(json_out)
