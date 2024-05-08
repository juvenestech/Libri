const librerie = ["Libri Quinto Piano", "Classici", "Romanzo", "Lingue", "Avventura", "Romanzi Rosa", "Manuali", "Romanzi Di Formazione"];
let tuttiLibri = [];  // Array per conservare tutti i libri caricati

// Caricamento dei libri
$(librerie).each((i, libreria) =>
    fetch(`libri/${libreria}.json`)
    .then(file => file.json())
    .then(json => {
        tuttiLibri = tuttiLibri.concat(json.results[0].result.formatted);  // Assumiendo una struttura simile per ogni JSON
        displayLibri(tuttiLibri);  // Funzione per visualizzare tutti i libri inizialmente
    })
);

// Funzione per visualizzare i libri
function displayLibri(libri) {
    $('#libri').empty();  // Pulisce i libri attuali visualizzati
    libri.forEach(l => {
        $('<div>')
            .addClass('libro')
            .append($('<h1>').text(l["Titolo libro"]))
            .append($('<h3>').text(l["Nome autore"] + " " + l["Cognome autore"]))
            .appendTo('#libri');
    });
}

// Funzione per cercare e filtrare i libri
function searchBook() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const libriFiltrati = tuttiLibri.filter(l =>
        l["Titolo libro"].toLowerCase().includes(searchTerm) ||
        (l["Nome autore"].toLowerCase() + " " + l["Cognome autore"].toLowerCase()).includes(searchTerm)
    );
    displayLibri(libriFiltrati);  // Visualizza solo i libri filtrati
}

function toggleCategories() {
    var categories = document.getElementById('categories');
    if (categories.style.display === 'none') {
        categories.style.display = 'block';
    } else {
        categories.style.display = 'none';
    }
}
