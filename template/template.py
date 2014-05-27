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

exit()


import ezodf, sys, json

ak_file = ezodf.opendoc(sys.argv[1])

def fun(value):
    if value.plaintext() == '':
        return None
    else:
        return value.plaintext()

out = {'arbeitskreise':[],'slots':[]}
for i in ak_file.sheets['slots'].rows():
    if i[0].plaintext() != '' and i[0].plaintext() != 'id':
        slot = {}
        slot['id'] = fun(i[0])
        slot['name'] = fun(i[1])
        slot['shortname'] = fun(i[2])
        slot['begin'] = fun(i[3])
        slot['end'] = fun(i[4])
        out['slots'].append(slot)

for i in ak_file.sheets['arbeitskreise'].rows():
    if i[0].plaintext() != '' and i[0].plaintext() != 'name':
        ak = {}
        ak['name'] = fun(i[0])
        ak['responsible'] = fun(i[1])
        ak['room'] = fun(i[2])
        ak['slotid'] = fun(i[3])
        ak['url'] = fun(i[4])
        out['arbeitskreise'].append(ak)

json_out = json.dumps(out,sort_keys=True,indent=4)
print(json_out)
with open('../api/arbeitskreise','w') as file:
    file.write(json_out)
