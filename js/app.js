(function(){
    'use strinct';

    document.getElementById('fahrenheitInput').addEventListener('input', function(event){
        celsiusinput.value=((this.value - 32) / 1.8).toFixed(2);
    });

    document.getElementById('celsiusinput').addEventListener('input', function(event){
        fahrenheitInput.value=((this.value * 1.8) + 32).toFixed(2);
    });
})();