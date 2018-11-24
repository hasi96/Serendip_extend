import csv
import json
f = open('word-topic-count-1.csv', 'rb')
reader = csv.reader(f)
with open('word-ranks-1.csv','wb') as file:
    for row in reader:
    	mystr = ','.join(row)
    	mystr = mystr.strip(',')
    	file.write(mystr)
    	file.write('\n')