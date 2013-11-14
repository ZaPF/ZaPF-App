#!/usr/bin/python

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
