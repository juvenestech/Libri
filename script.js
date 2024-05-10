const librerie = ["Libri_Quinto_Piano", "Classici", "Romanzo", "Lingue", "Avventura", "Romanzi_Rosa", "Manuali", "Romanzi_Di_Formazione"];
let tuttiLibri = [];  // Array per conservare tutti i libri caricati

// Caricamento dei libri
$(librerie).each((i, libreria) =>
    fetch(`libri/${libreria}.json`)
    .then(file => file.json())
    .then(json => {
        tuttiLibri = tuttiLibri.concat(json.results[0].result.formatted); 
        displayLibri(tuttiLibri);  // Funzione per visualizzare tutti i libri inizialmente
    })
    .catch(error => console.error('Errore nel caricare i libri:', error))  // Gestione degli errori nel caricamento dei libri
);

// Funzione per creare una card per ogni libro
function createCard(libro) {
    const card = $('<div>').addClass('libro');
    const title = $('<h1>').text(libro["Titolo libro"]);
    const author = $('<h3>').text(libro["Nome autore"] + " " + libro["Cognome autore"]);
    const publisher = $('<h4>').text("Editore: " + libro["Casa Editrice"]);
    card.append(author, title , publisher);
    return card;
}

// Funzione modificata per visualizzare i libri usando le card
function displayLibri(libri) {
    $('#libri').empty();
    libri.forEach(l => {
        const card = createCard(l);
        $('#libri').append(card);
    });
}


// Funzione per cercare e filtrare i libri
function searchBook() {
    const searchTerm = $('#search-bar').val().toLowerCase();
    const libriFiltrati = tuttiLibri.filter(l =>
        l["Titolo libro"].toLowerCase().includes(searchTerm) ||
        (l["Nome autore"].toLowerCase() + " " + l["Cognome autore"].toLowerCase()).includes(searchTerm) ||
        l["Casa Editrice"].toLowerCase().includes(searchTerm)
    );
    displayLibri(libriFiltrati);  // Visualizza solo i libri filtrati
}
$(document).ready(function() {
    $('.search-bar').on('submit', function(event) {
        event.preventDefault();  // Previene il comportamento di default del form che causa il refresh della pagina
        searchBook();
    });
});