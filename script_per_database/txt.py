import json

# File JSON del database
input_file = "database.json"

# Leggi il file JSON di input
with open(input_file, "r") as f:
    data = f.read()

# Carica i dati JSON
json_data = json.loads(data)

# Estrai i comuni univoci dal file JSON in modo non case-sensitive
comuni_set = set()
for item in json_data:
    comune = item.get("Comune", "").lower()
    if comune:
        comuni_set.add(comune)

# Scrivi i comuni nel file di testo
output_file = "comuni.txt"
with open(output_file, "w") as f:
    for comune in comuni_set:
        f.write(comune + "\n")

print("Processo completato. I comuni sono stati scritti in '{}'.".format(output_file))
