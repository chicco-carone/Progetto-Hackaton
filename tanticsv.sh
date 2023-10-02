#!/bin/bash

# Nome del file CSV principale
csv_file="database.csv"

# Directory di output per i file divisi per città
output_dir="database_citta"

# Assicurati che la directory di output esista, altrimenti creala
mkdir -p "$output_dir"

# Array per tenere traccia delle città elaborate
processed_cities=()

# Estrai il nome delle città univoche dal CSV
cities=($(tail -n +2 "$csv_file" | cut -d ';' -f 6 | sort -u))

# Loop attraverso le città e crea un file per ciascuna città
for city in "${cities[@]}"; do
  # Rimuovi spazi dal nome della città e usa tutto minuscolo come nome del file
  city_file="$output_dir/$(echo "$city" | tr -d ' ' | tr '[:upper:]' '[:lower:]').csv"

  # Verifica se la città è già stata elaborata
  if [[ ! " ${processed_cities[@]} " =~ " ${city} " ]]; then
    # Crea il file per la città
    touch "$city_file"

    # Cicla attraverso il file CSV principale e copia le righe corrispondenti nella città specifica
    grep "$city" "$csv_file" >> "$city_file"

    # Aggiungi la città all'elenco delle città elaborate
    processed_cities+=("$city")
  fi
done

echo "Divisione per città completata."
