import os

# Cartella in cui sono presenti i file JSON
cartella = '/home/chicco/Documents/GitHub/Progetto-Hackaton/database_citta'

# Nome del file di output
file_output = 'nomi_città.txt'

# Inizializza una lista per i nomi delle città
nomi_città = []

# Scansiona i file nella cartella
for filename in os.listdir(cartella):
    if filename.endswith('_data.json'):
        # Estrai il nome della città rimuovendo '_data.json' dalla fine del nome del file
        nome_città = filename.replace('_data.json', '')
        nomi_città.append(nome_città)

# Scrivi i nomi delle città nel file di output, uno per riga
with open(file_output, 'w') as output_file:
    for nome_città in nomi_città:
        output_file.write(nome_città + '\n')

print(f"I nomi delle città sono stati salvati in {file_output}")
