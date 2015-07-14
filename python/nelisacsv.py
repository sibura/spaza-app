import csv 
saleList = []
with open('Nelisa Sales History.csv') as nelisa:
    reader = csv.reader(nelisa, delimiter =';',quotechar =',',quoting=csv.QUOTE_MINIMAL)
    for row in reader:
        saleList.append(row)
saleList = saleList[1:]
print saleList  