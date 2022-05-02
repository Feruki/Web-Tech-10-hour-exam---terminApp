document.querySelector('#anzTermine').addEventListener('change', (eChange) => {
    document.getElementById('fieldsetTermine').innerHTML = '';
    for(let i = 1; i <= eChange.target.value; i++) {
        const newFieldset = document.createElement('fieldset');
        newFieldset.innerHTML = `
        <legend>Termin ${i}</legend>
        <label for="datum">Datum:</label>
        <input id="datum" type="text" name="datum${i}">
        <label for="start">Start:</label>
        <input id="start" type="text" name="start${i}">
        <label for="ende">Ende:</label>
        <input id="ende" type="text" name="ende${i}">
        `
        document.getElementById('fieldsetTermine').appendChild(newFieldset);
    }
})