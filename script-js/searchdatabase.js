$(document).ready(function() {

    let loginForm = document.getElementById("inputforms");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        let comune = document.getElementById("comuni");
        let indirizzo = document.getElementById("indirizzo");
        let ncivico = document.getElementById("ncivico");
        let cap = document.getElementById("cap");

        var selectedFile = comune.options[comune.selectedIndex].text;

        // Eseguire la richiesta AJAX per caricare il file JSON selezionato
        $.getJSON("script_per_database/output_comuni/"+ selectedFile + ".json", function(data) {

            // Logica di ricerca nell'array JSON
            var risultato = data.find(function(item) {
            return item.Via.toLowerCase() === indirizzo.value.toLowerCase() &&
                 item.Civico === ncivico.value &&
                 item.CAP === cap.value;
            });

            if (risultato) {
                console.log("Elemento trovato:", risultato);
            // Fai qualcosa con l'elemento trovato
            } else {
                console.log("Elemento non trovato");
            }
        });

    });
});