let nameH1;
let terrainSpan;
let populationSpan;
let climateSpan;
let filmsDiv;
// let planetDiv;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  terrainSpan = document.querySelector('span#terrain');
  climateSpan = document.querySelector('span#climate');
  populationSpan = document.querySelector('span#population');
  filmsUl = document.querySelector('#films>ul');
  residentsUl = document.querySelector('#residents>ul');

  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  fetchplanet(id)
});

async function fetchplanet(id) {
    let url = `https://swapi.dev/api/planets/${id}`;
    try {
      const planet = await fetch(url)
        .then(res => res.json())
      renderplanet(planet);
    }
    catch (ex) {
      console.error(`Error reading planet ${id} data.`, ex.message);
    }
  }
  
  const renderplanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    populationSpan.textContent = planet?.population;
    climateSpan.textContent = planet?.climate;
    terrainSpan.textContent = planet?.terrain;
    console.log(planet?.residents)
    
    const residentsList = planet?.residents?.map(personUrl => `<li><a href="/person.html?id=${getPersonIdFromUrl(personUrl)}">${getPersonIdFromUrl(personUrl)}</li>`)
    const filmsLis = planet?.films?.map(filmUrl => `<li><a href="/film.html?id=${getFilmIdFromUrl(filmUrl)}">${getFilmIdFromUrl(filmUrl)}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    residentsUl.innerHTML = residentsList.join("");

  }
  
  const getIdFromUrl = (entityName, url) => {
    const re = new RegExp(`.*${entityName}\/(\\d+).*`);
    const matches = url.match(re)
    if (!matches) throw `Bad URL. Not a ${entityName} URL.`
    console.log(matches)
    return matches[1]

  }
  const getFilmIdFromUrl = url => getIdFromUrl("films", url)
  const getPersonIdFromUrl = url => getIdFromUrl("people", url)


