#!/usr/bin/python

import sys, json

out = {'arbeitskreise':[],'slots':[]}

with open(sys.argv[1], 'r') as ak_file:
	ak_data = ak_file.read()

with open(sys.argv[2], 'r') as slot_file:
	slot_data = slot_file.read()

ak_list = ak_data.split('\n')

for ak_entry in ak_list:
	entry = ak_entry.split('\t')
	if len(entry) > 1:
		ak = {}
		ak['name'] = entry[0]
		ak['responsible'] = entry[1]
		ak['room'] = entry[2]
		ak['slotid'] = entry[3]
		if entry[4] == '':
			ak['url'] = None
		else:
			ak['url'] = entry[4]
		out['arbeitskreise'].append(ak)

slot_list = slot_data.split('\n')

for slot_entry in slot_list:
	entry = slot_entry.split('\t')
	if len(entry) > 1:
		slot = {}
		slot['id'] = entry[0]
		slot['name'] = entry[1]
		slot['shortname'] = entry[2]
		slot['begin'] = entry[3]
		slot['end'] = entry[4]
		out['slots'].append(slot)

json_out = json.dumps(out,sort_keys=True,indent=4)

print(json_out)

with open('../api/arbeitskreise','w') as json_file:
	json_file.write(json_out)
