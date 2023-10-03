import json
import os

# Verifica l'uso corretto dello script
import sys

if len(sys.argv) != 2:
    print("Utilizzo: {} <file_database.json>".format(sys.argv[0]))
    sys.exit(1)

# File JSON del database
input_file = sys.argv[1]

# Controlla se il file esiste
if not os.path.isfile(input_file):
    print("Il file {} non esiste.".format(input_file))
    sys.exit(1)

# Crea una directory per i file di output
output_dir = "output_comuni"
os.makedirs(output_dir, exist_ok=True)

# Leggi il file JSON di input
with open(input_file, "r") as f:
    data = f.read()

# Carica i dati JSON
json_data = json.loads(data)

# Estrai i comuni univoci dal file JSON in modo non case-sensitive
comuni_set = set()
for item in json_data:
    comuni_set.add(item["Comune"].lower())

# Funzione per creare un file JSON per ciascun comune
def crea_file_comune(comune):
    output_file = os.path.join(output_dir, "{}.json".format(comune))
    with open(output_file, "w") as f:
        f.write("[\n")
        first = True
        for item in json_data:
            if item["Comune"].lower() == comune:
                if not first:
                    f.write(",\n")
                json.dump(item, f, indent=2)
                first = False
        f.write("\n]\n")

# Esegui l'estrazione in sequenza per ogni comune
for comune in comuni_set:
    crea_file_comune(comune)

print("Processo completato. I dati dei comuni sono stati salvati in '{}'.".format(output_dir))
