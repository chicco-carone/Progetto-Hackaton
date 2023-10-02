import sqlite3

# Connessione al database SQLite (o creazione se non esiste)
conn = sqlite3.connect('database.db')

# Creazione di una tabella per i file CSV (se non esiste già)
conn.execute('''CREATE TABLE IF NOT EXISTS csv_files
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
             nome TEXT NOT NULL,
             percorso TEXT NOT NULL)''')

# Funzione per cercare un file CSV nel database
def cerca_file_csv(nome_file):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM csv_files WHERE nome=?", (nome_file,))
    result = cursor.fetchone()
    cursor.close()
    return result

# Ricevi il nome del file CSV dall'utente
nome_file_da_cercare = input("Inserisci il nome del file CSV da cercare: ")

# Cerca il file CSV nel database
risultato = cerca_file_csv(nome_file_da_cercare)

if risultato:
    print(f"Il file CSV '{risultato[1]}' è stato trovato nel percorso '{risultato[2]}'")
else:
    print(f"Il file CSV '{nome_file_da_cercare}' non è stato trovato nel database.")

# Chiudi la connessione al database
conn.close()
