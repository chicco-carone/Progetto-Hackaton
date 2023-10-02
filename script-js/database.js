$(document).ready(function() {
    $.ajax({
        url: 'nomi_citta.txt',
        dataType: 'text',
        success: function(data) {
            var lines = data.split('\n');
            
            lines.forEach(function(line) {
                var cityName = line.trim();
                if (cityName !== '') {
                    $('#citta').append($('<option>', {
                        value: cityName,
                        text: cityName
                    }));
                }
            });
        },
        error: function() {
            alert('Si è verificato un errore durante il recupero dei dati.');
        }
    });
});