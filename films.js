let films = [];
const filmsSection = document.querySelector("#films")

document.addEventListener('DOMContentLoaded', getFilms)

async function getFilms() {
  let url = 'https://swapi.dev/api/films';

  while (url) {
    try {
      const fetchedFilms = await fetch(url)
        .then(res => res.json())
        .then(res => { url = res.next; return res })
        .then(res => res.results)
        .then(res => res.map(p => ({ ...p, id: +getFilmIdFromUrl(p.url) })))
      films.push(...fetchedFilms);
    }
    catch (ex) {
      console.error("Error reading films.", ex.message);
    }
  }
  console.log("All the films are ", films)
  renderFilms(films);
}

const getFilmIdFromUrl = (url) => {
  const re = /.*film\/(\d+).*/
  const matches = url.match(re)
  if (!matches) throw "Bad URL. Not a people URL."
  return matches[1]
}

const renderFilms = films => {
  const divs = films.map(film => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToFilmPage(film.id));
    el.textContent = film.title;
    return el;
  })
  filmsSection.replaceChildren(...divs)
}

const goToFilmPage = id => window.location = `/film.html?id=${id}`