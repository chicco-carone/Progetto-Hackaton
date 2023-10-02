document.addEventListener('DOMContentLoaded', function() {
    const cittaInput = document.querySelector('input[name="citta"]');
    const inputContainers = document.querySelectorAll('.input-container:not(.cittainput)');

    cittaInput.addEventListener('input', function () {
      if (cittaInput.value.trim() === '') {
        // Hide all input containers except for "Città"
        inputContainers.forEach(function (container) {
          container.classList.add('hidden');
        });
      } else {
        // Show all input containers
        inputContainers.forEach(function (container) {
          container.classList.remove('hidden');
        });
      }
    });
  });