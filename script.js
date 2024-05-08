const librerie = ["Libri Quinto Piano", "Classici", "Romanzo", "Lingue", "Avventura", "Romanzi Rosa", "Manuali", "Romanzi Di Formazione"]

$(librerie).each((i, libreria) =>
    fetch(`libri/${libreria}.json`)
    .then(file => file.json())
    .then(json => {
        const libri = json.results[0].result.formatted;
        for (let i=0; i<libri.length; i++){
            const l = libri[i];

            $('<div>')
                .addClass('libro')
                .append($('<h1>').text(l["Titolo libro"]))
                .append($('<h3>').text(l["Nome autore"] + " " + l["Cognome autore"]))
                .append()
                .appendTo('#libri');
        }
    })
);