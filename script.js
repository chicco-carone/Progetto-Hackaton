document.addEventListener('DOMContentLoaded', function() {

    const cityDropdown = document.getElementById("citta");

    // Chiamata AJAX per ottenere l'elenco dei file CSV nella cartella
    fetch('database_citta')
        .then(response => response.json())
        .then(data => {
            data.files.forEach(file => {
                // Estrai il nome della città dal nome del file
                const cityName = file.replace('.csv', '');

                // Aggiungi un'opzione al menu dropdown
                const option = document.createElement("option");
                option.value = cityName;
                option.textContent = cityName;
                cityDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Errore durante il recupero dell'elenco dei file CSV:", error);
        });
  });
