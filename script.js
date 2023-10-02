// Recupera l'elemento select
var selectElement = document.getElementById("citta");

// Definisci la cartella in cui si trovano i file JSON
var folderPath = "database_citta";

// Funzione per ottenere il nome del file senza estensione
function getFileNameWithoutExtension(fileName) {
    return fileName.split(".")[0];
}

// Utilizza fetch per ottenere elenco dei file JSON nella cartella
fetch(folderPath)
    .then(response => response.json())
    .then(data => {
        // Itera sui file JSON e aggiungi opzioni all'elemento select
        data.forEach(function(fileName) {
            var option = document.createElement("option");
            option.value = getFileNameWithoutExtension(fileName);
            option.textContent = getFileNameWithoutExtension(fileName);
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Errore durante il recupero dei file JSON:", error);
    });