'use strict';
console.log('>> Ready :)');

//let favoritos
// const.id de los elementos clicados fine

//disnleylist encontrar elemento con ese id
//busco en array favoritos si ya existe ese elemento (find index) si me da num positivo existe (splice)
//si es -1 hago pussh
//luego push array favorites

let disneyList = [];
let favoritesList = [];

const url = 'https://dev.adalab.es/api/disney?pageSize=15';
const charactersLS = localStorage.getItem('characters');
const list = document.querySelector('.list');
const favList = document.querySelector('.favorites-list');
const charactersContainer = document.getElementById('list');
const characterImage = document.createElement('img');
const characterName = document.createElement('h2');

function renderdisneyList(disneyList) {
  list.innerHTML += `<li id="${disneyList._id}" class="list">
  <img class="" src="${disneyList.imageUrl}">
  <p class="title">${disneyList.name}</p>
</li>`;
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    disneyList = data.data;
    data.data.forEach((character) => {
      const characterContainer = document.createElement('div');
      characterContainer.classList.add('character-container');
      characterContainer.id = character._id;
      const characterImage = document.createElement('img');
      characterImage.classList.add('character-image');
      characterImage.src = character.imageUrl;
      const characterName = document.createElement('h2');
      characterName.classList.add('character-name');
      characterName.textContent = character.name;

      // Agregar los elementos al contenedor principal
      characterContainer.appendChild(characterImage);
      characterContainer.appendChild(characterName);
      charactersContainer.appendChild(characterContainer);
      addClick();
    });
  });

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('list');

searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase().trim();
  console.log('hola');
  // Itera por la lista de personajes
  for (let i = 0; i < disneyList.length; i++) {
    const character = disneyList[i];
    const characterName = character.name.toLowerCase();

    // Si el nombre del personaje coincide con el término de búsqueda
    if (characterName.includes(searchTerm)) {
      // Crea la tarjeta del personaje
      const characterCard = document.createElement('div');
      characterCard.classList.add('character-card');
      characterCard.innerHTML = `
  <img class="" src="${character.imageUrl}">
  <p class="title">${character.name}</p>
`;

      // Agrega la tarjeta al elemento de resultado de búsqueda
      searchResult.innerHTML = 'disneylist';
      searchResult.appendChild(characterCard);
    }
  }
});

function renderFavoriteList(favoritesList) {
  favList.innerHTML = '';
  for (const character of favoritesList) {
    let html += `
    <div id="characters-container">
      <div class="favorites" id="${character._id}">
        <p class="names"> Name: ${character.name}</p>
        <img src="${character.imageUrl}" alt="${character.name}" />
      </div>
    </div>
  `;
  }
  favList.innerHTML = html;
}
// lee el id del elemento clicado y lo busca en el array
function handleClick(event) {
  event.preventDefault();
  const id = event.currentTarget.id;
  console.log(id);
  const selectedCharacter = disneyList.find((item) => item._id === id);
  const indexCharacter = favoritesList.findIndex((item) => item._id === id);
  if (indexCharacter === -1) {
    favoritesList.push(selectedCharacter);
    //event.currentTarget.classList.add('favorites');
    // Mover el personaje al contenedor de favoritos
  } else {
    favoritesList.splice(indexFavorites, 1);
    //event.currentTarget.classList.remove('favorites');
    // Eliminar el personaje del contenedor de favoritos
  }
  renderFavoriteList(favoritesList);
}
// recorre el array de los personajes y le añade el evento click
function addClick() {
  const list = document.querySelectorAll('.character-container');
  for (const item of list) {
    item.addEventListener('click', handleClick);
  }
}

/*function moveCharacterToFavoritesList(characterElement) {
  const selectedfavoriteslist = document.querySelector('.favorites-list');
  const selectedCharacterCopy = characterElement.cloneNode(true);
  const characterId = characterElement.id;

  characterElement.idList.add('favorite-list');
  characterElement.dataset.originalId = characterId;

  selectedfavoriteslist.appendChild(selectedCharacterCopy);

  const favoritesSection = document.querySelector('.favorites');
  favoritesSection.classList.remove('favorites');
}

function removeCharacterFromFavorites(id) {
  // Si la sección de favoritos está vacía: ocultarla
  const favoriteCharacters =
    favoritesSection.querySelectorAll('.favorites-list');
  if (favoriteCharacters.length === 0) {
    favoritesList.idList.add('favorites');
  }
}

function addRemoveIdIntoLocalStorage(id) {
  const ids = JSON.parse(localStorage.getItem('characterIds')) || [];

  if (ids.includes(id)) {
    // Si el ID está incluido, se elimina
    const newIds = ids.filter((item) => item !== id);
    localStorage.setItem('characterIds', JSON.stringify(newIds));
  } else {
    // Si el ID no está incluido, se agrega
    ids.push(id);
    localStorage.setItem('characterIds', JSON.stringify(ids));
  }
}*/


