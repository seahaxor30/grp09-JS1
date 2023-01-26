let nameh1;
let modelSec;
let shipClassSec;
let filmsUl;
let hyperdriveSec;
let pilotsUl;

addEventListener("DOMContentLoaded", () => {
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    console.log(id);
    nameh1 = document.querySelector('h1#name');
    modelSec = document.querySelector('span#model');
    shipClassSec = document.querySelector('span#shipClass');
    hyperdriveSec = document.querySelector('span#rating');
    pilotsUl = document.querySelector('#pilots>ul');
    filmsUl = document.querySelector('#films>ul');
    fetchShip(id);
});

async function fetchShip(id) {
    let url = `https://swapi.dev/api/starships/${id}`;
  try {
    const ship = await fetch(url)
      .then(res => res.json())
    console.log(ship);
    renderShip(ship);
  }
  catch (ex) {
    console.error(`Error reading person ${id} data.`, ex.message);
  }
}

const renderShip = ship => {
    document.title = `SWAPI - ${ship?.name}`;  // Just to make the browser tab say their name
    nameh1.textContent = ship?.name;
    modelSec.textContent = ship?.model;
    shipClassSec.textContent = ship?.starship_class;
    hyperdriveSec.textContent = ship?.hyperdrive_rating;
    const filmsLis = ship?.films?.map(filmUrl => `<li><a href="/film.html?id=${getFilmIdFromUrl(filmUrl)}">${getFilmIdFromUrl(filmUrl)}</li>`);
    filmsUl.innerHTML = filmsLis.join("");
    const pilotsList = ship?.pilots?.map(pilotUrl => `<li><a href="/person.html?id=${getPersonIdFromUrl(pilotUrl)}">${getPersonIdFromUrl(pilotUrl)}</li>`);
    pilotsUl.innerHTML = pilotsList.join("");
}
  
  const getIdFromUrl = (entityName, url) => {
    const re = new RegExp(`.*${entityName}\/(\\d+).*`);
    const matches = url.match(re);
    if (!matches) throw `Bad URL. Not a ${entityName} URL.`;
    return matches[1];
  }

  const getFilmIdFromUrl = url => getIdFromUrl("films", url);
  const getPersonIdFromUrl = url => getIdFromUrl("people", url);