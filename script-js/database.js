$(document).ready(function() {
    $.ajax({
        url: 'nomi_citta.txt',
        dataType: 'text',
        success: function(data) {
            var lines = data.split('\n');
            
            lines.forEach(function(line) {
                var cityName = line.trim();
                if (cityName !== '') {
                    $('#comuni').append($('<option>', {
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

    $.ajax({
        url: 'nomi_provincie.txt',
        dataType: 'text',
        success: function(data) {
            var lines = data.split('\n');
            
            lines.forEach(function(line) {
                var cityName = line.trim();
                if (cityName !== '') {
                    $('#provincia').append($('<option>', {
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