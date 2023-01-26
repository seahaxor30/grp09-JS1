let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  birthYearSpan = document.querySelector('span#birth_year');
  massSpan = document.querySelector('span#mass');
  heightSpan = document.querySelector('span#height');
  homeworldSpan = document.querySelector('span#homeworld');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  fetchPerson(id)
});

async function fetchPerson(id) {
  let url = `https://swapi.dev/api/people/${id}`;
  try {
    const person = await fetch(url)
      .then(res => res.json())
    renderPerson(person);
  }
  catch (ex) {
    console.error(`Error reading person ${id} data.`, ex.message);
  }
}

const renderPerson = person => {
  document.title = `SWAPI - ${person?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = person?.name;
  heightSpan.textContent = person?.height;
  massSpan.textContent = person?.mass;
  birthYearSpan.textContent = person?.birth_year;
  homeworldSpan.innerHTML = 
    `<a href="/planet?id=${getPlanetIdFromUrl(person?.homeworld)}">
      ${getPlanetIdFromUrl(person?.homeworld)}
      </a>`;
  const filmsLis = person?.films?.map(filmUrl => `
      <li><a href="/film.html?id=${getFilmIdFromUrl(filmUrl)}">
      ${getFilmIdFromUrl(filmUrl)}
      </li>
  `)
  filmsUl.innerHTML = filmsLis.join("");
}

const getIdFromUrl = (entityName, url) => {
  const re = new RegExp(`.*${entityName}\/(\\d+).*`);
  const matches = url.match(re)
  if (!matches) throw `Bad URL. Not a ${entityName} URL.`
  return matches[1]
}
const getFilmIdFromUrl = url => getIdFromUrl("films", url)
const getPlanetIdFromUrl = url => getIdFromUrl("planets", url)
const getPersonIdFromUrl = url => getIdFromUrl("people", url)
