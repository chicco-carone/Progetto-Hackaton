#!/bin/bash

# Registra l'orario di inizio
start_time=$(date +%s)

# Verifica che il file JSON del database sia fornito come argomento
if [ $# -ne 1 ]; then
  echo "Usage: $0 <database.json>"
  exit 1
fi

database_file="$1"

# Verifica che il file JSON del database esista
if [ ! -f "$database_file" ]; then
  echo "Il file $database_file non esiste."
  exit 1
fi

# Creiamo una directory per i file JSON di output se non esiste
output_dir="database_citta"
mkdir -p "$output_dir"

# Funzione per rendere la ricerca non case sensitive
function make_lowercase() {
  echo "$1" | tr '[:upper:]' '[:lower:]'
}

# Estrai tutte le città uniche dal database JSON
cities=$(jq -r '.[] | .Comune' "$database_file" | sort -u)

# Cicla attraverso le città
for city in $cities; do
  city_lowercase=$(make_lowercase "$city")
  # Costruisci il nome del file JSON per questa città senza "_data"
  city_name="${city_lowercase}_data.json"
  # Filtra i dati relativi a questa città (case insensitive)
  jq --arg city "$city_lowercase" 'map(select(.Comune | ascii_downcase == $city))' "$database_file" > "$output_dir/$city_name"
  echo "Creato il file $city_name"
done

# Registra l'orario di fine
end_time=$(date +%s)

# Calcola il tempo trascorso
elapsed_time=$((end_time - start_time))

echo "Processo completato in $elapsed_time secondi."
