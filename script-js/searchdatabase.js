$(document).ready(function() {

    let loginForm = document.getElementById("inputforms");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        let comune = document.getElementById("comuni");
        let indirizzo = document.getElementById("indirizzo");
        let ncivico = document.getElementById("ncivico");
        let cap = document.getElementById("cap");

        var selectedFile = comune.options[comune.selectedIndex].text;
        openPopup();

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
                openPopup(true, risultato.Denominazione, risultato.Via, risultato.CIS, risultato.CAP, risultato.Civico);
            // Fai qualcosa con l'elemento trovato
            } else {
                openPopup(false)
                console.log("Elemento non trovato");
            }
        });

    });
});

function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function openPopup(trovato, nomeLocale, indirizzo, cis, cap, ncivico){
    var popup = document.getElementById("popup");
    var popupContent = document.getElementById("popup-content");

    if (trovato){
        var content = "Elemento trovato!<br>Il nome dell'alloggio è: " + nomeLocale + "<br>Si trova in via: " + indirizzo + " con numero civico: " + ncivico + "<br>Il cis del locale è: " + cis;
        content = content.replace(/\n/g, "<br>");
        popupContent.innerHTML = content; 
        var tickImage = document.createElement("img");
        tickImage.src = "images/si.png";
        popupContent.appendChild(tickImage);
    }else {
        var content = "Elemento non trovato!!\nl'alloggio inserito non è stato trovato nel database, potrebbe essere un alloggio abusivo. Si prega di verificare.\n(ultima data di aggiornamento del database: 03/09/2023)";
        content = content.replace(/\n/g, "<br>");
        popupContent.innerHTML = content;
        var tickImage = document.createElement("img");
        tickImage.src = "images/no.png";
        popupContent.appendChild(tickImage);
    }

    
    // Show the popup
    popup.style.display = "block";
}
