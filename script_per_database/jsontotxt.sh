#!/bin/bash

//Usare comune al posto di città o località

# Nome del file JSON da cui leggere le città
file_json="/home/chicco/Documents/GitHub/Progetto-Hackaton/database.json"

# Nome del file di testo in cui scrivere le città
file_txt="citta.txt"

# Inizializza un array vuoto per le città
declare -a citta

# Leggi il file JSON e estrai le città
while IFS= read -r line; do
  # Usa il comando jq per estrarre il valore del campo "città" dal JSON
  citta_json=$(echo "$line" | jq -r '.città')
  
  # Converte il nome della città in lettere minuscole
  citta_lowercase=$(echo "$citta_json" | tr '[:upper:]' '[:lower:]')

  # Verifica se la città è già presente nell'elenco
  if [[ ! " ${citta[*]} " =~ " $citta_lowercase " ]]; then
    # Aggiungi la città all'elenco
    citta+=("$citta_lowercase")
  fi
done < "$file_json"

# Scrivi l'elenco delle città nel file di testo
for city in "${citta[@]}"; do
  echo "$city" >> "$file_txt"
done

echo "Elenco delle città estratte dal file JSON è stato scritto su $file_txt"
