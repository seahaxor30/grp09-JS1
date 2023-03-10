let title;
let director;
let date;
let episode;
let starshipsUl;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  title = document.querySelector('h1#title');
  episode = document.querySelector('span#episode');

  date = document.querySelector('span#date');
  director = document.querySelector('span#director');
  planetsUl = document.querySelector('#planets>ul');
  charactersUl = document.querySelector('#characters>ul');
  starshipsUl = document.querySelector('#starships>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  fetchFilm(id)
});

async function fetchFilm(id) {
  let url = `https://swapi.dev/api/films/${id}`;
  try {
    const film = await fetch(url)
      .then(res => res.json())
    renderFilm(film);
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
}

const renderFilm = film => {
  console.log (`planets are : ${film.planets}, Characters are: ${film.characters}`)
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  title.textContent = film?.title;
  date.textContent = film?.release_date;
  director.textContent = film?.director;
  episode.textContent = film?.episode_id;

  const planetsList = film?.planets.map(planetUrl => `<li><a href="/planet.html?id=${getPlanetIdFromUrl(planetUrl)}">${getPlanetIdFromUrl(planetUrl)}</li>`);
    console.log(planetsList);
    planetsUl.innerHTML = planetsList.join("");

  const charactersList = film?.characters.map(characterUrl => `<li><a href="/person.html?id=${getCharacterIdFromUrl(characterUrl)}">${getCharacterIdFromUrl(characterUrl)}</li>`);
    charactersUl.innerHTML = charactersList.join("");

    const starshipsList = film?.starships.map(shipUrl => `<li><a href="/starshipInfo.html?id=${getShipIdFromUrl(shipUrl)}">${getShipIdFromUrl(shipUrl)}</li>`);
    starshipsUl.innerHTML = starshipsList.join("");
}

const getIdFromUrl = (entityName, url) => {
  const re = new RegExp(`.*${entityName}\/(\\d+).*`);
  const matches = url.match(re)
  if (!matches) throw `Bad URL. Not a ${entityName} URL.`
  return matches[1]
}
const getPlanetIdFromUrl = url => getIdFromUrl("planets", url)
const getCharacterIdFromUrl = url => getIdFromUrl("people", url)
const getShipIdFromUrl = url => getIdFromUrl("starships", url)