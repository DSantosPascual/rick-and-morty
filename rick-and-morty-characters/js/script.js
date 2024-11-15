
const apiUrl = 'https://rickandmortyapi.com/api/character/';
let currentPage = 1;                                                // Página actual
const characterList = document.getElementById('character-list');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');


function fetchCharacters(page) {                         // Función obtener personajes
  fetch(`${apiUrl}?page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCharacters(data.results);
      togglePaginationButtons(data.info);
    })
    .catch(error => {
      console.error('Error fetching characters:', error);
    });
}

function renderCharacters(characters) {             //Función para darle formato a cada person
  characterList.innerHTML = '';
  characters.forEach(character => {
    const listItem = document.createElement('li');
    listItem.className = 'character-item';

    listItem.innerHTML = `
      <img src="${character.image}" alt="${character.name}" class="character-image">
      <div class="character-info">
        <h2>${character.name}</h2>
        <p>Species: ${character.species}</p>
      </div>
    `;

    characterList.appendChild(listItem);
  });
}

function botonPagina(info) {
  prevPageButton.disabled = !info.prev;
  nextPageButton.disabled = !info.next;
}

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

nextPageButton.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage);
});

fetchCharacters(currentPage);
