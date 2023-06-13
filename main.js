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

//cojo los valores del localstorage y si existe lo guardo en favoritelist getitem
const url = 'https://dev.adalab.es/api/disney?pageSize=15';

const list = document.querySelector('.list');
const favList = document.querySelector('#favorites-list');
const charactersContainer = document.getElementById('list');
const characterImage = document.createElement('img');
const characterName = document.createElement('h2');

const favoriteLs = JSON.parse(localStorage.getItem('favoriteslist'));
addRemoveIdIntoLocalStorage();

function addRemoveIdIntoLocalStorage() {
  if (favoriteLs) {
    favoritesList = favoriteLs;
    renderFavoriteList(favoritesList);
  }
}

/*function addRemoveIdIntoLocalStorage(id) {
  localStorage.setItem('characters', JSON.stringify(favoritesList));*/

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
  let html = '';
  for (const character of favoritesList) {
    html += `
    <div id="characters-container">
      <div class="favorites" id="${character._id}">
        <p class="names"> Name: ${character.name}</p>
        <img src="${character.imageUrl}" alt="${character.name}" />
      </div>
    </div>
  `;

    favList.innerHTML = html;
  }
}

// lee el id del elemento clicado y lo busca en el array
function handleClick(event) {
  event.preventDefault();
  const id = parseInt(event.currentTarget.id);
  const selectedCharacter = disneyList.find((item) => item._id === id);
  const indexCharacter = favoritesList.findIndex((item) => item._id === id);
  if (indexCharacter === -1) {
    favoritesList.push(selectedCharacter);
    //event.currentTarget.classList.add('favorites');
    // Mover el personaje al contenedor de favoritos
  } else {
    favoritesList.splice(indexCharacter, 1);
    //event.currentTarget.classList.remove('favorites');
    // Eliminar el personaje del contenedor de favoritos
  }

  localStorage.setItem('favoriteslist', JSON.stringify(favoritesList));
  renderFavoriteList(favoritesList);

  //volver a guardar el array de favoritos en el local storage
}
// recorre el array de los personajes y le añade el evento click
function addClick() {
  const list = document.querySelectorAll('.character-container');
  for (const item of list) {
    item.addEventListener('click', handleClick);
  }
}
