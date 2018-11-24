import csv
import json
f = open('word-ranks-1.csv', 'rb')
mydict = {}
reader = csv.reader(f)
for row in reader:
    content = row[0]
    row[0] = ''.join(e for e in content if e.isalnum())
    row = list(filter(None, row))
    if ":" not in row[1]:
    	continue
    for i in range(1,len(row)):
		l = row[i].split(":")
		if "topic"+l[0] in mydict.keys():
			mydict["topic"+l[0]].append({"name":row[0],"value":int(l[1])})
		else:
			mydict["topic"+l[0]] = [{"name":row[0],"value":int(l[1])}]

topics = mydict.keys()
for i in range(0,len(topics)):
	total = 0
	for j in range(0,len(mydict[topics[i]])):
		total = total + mydict[topics[i]][j]["value"]
	for j in range(0,len(mydict[topics[i]])):
		mydict[topics[i]][j]["value"] = round((float(mydict[topics[i]][j]["value"])/float(total))*100,3)

json = json.dumps(mydict,indent=4)
f = open("topic-word-rank-1.json","w")
f.write(json)
		




