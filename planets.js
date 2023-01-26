let planets = [];
let matchingPlanets = [];
const planetSection = document.querySelector("#planetsList")

document.addEventListener('DOMContentLoaded', getPlanets)

async function getPlanets() {
  let url = 'https://swapi.dev/api/planets?=10';

  while (url) {
    try {
      const fetchedPlanets = await fetch(url)
        .then(res => res.json())
        .then(res => { url = res.next; return res })
        .then(res => res.results)
        .then(res => res.map(p => ({ ...p, id: +getPlanetsIdFromUrl(p.url) })))
      planets.push(...fetchedPlanets);
    }
    catch (ex) {
      console.error("Error reading planets.", ex.message);
    }
}
  console.log("All the planets are ", planets)
  renderPlanets(planets)
}

const getPlanetsIdFromUrl = (url) => {
    const re = /.*planets\/(\d+).*/
    const matches = url.match(re)
    if (!matches) throw "Bad URL. Not a people URL."
    return matches[1]
  }


const renderPlanets = planets => {
    const divs = planets.map(planet => {
      const el = document.createElement('div');
      el.addEventListener('click', () => goToPlanetPage(planet.id));
      el.textContent = planet.name;
      return el;
    })
    planetSection.replaceChildren(...divs)
  }

  const goToPlanetPage = id => window.location = `/planet.html?id=${id}`