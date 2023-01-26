let starships = [];
const starshipSection = document.querySelector("#starships");
document.addEventListener('DOMContentLoaded', getStarships);

async function getStarships() {
    let url = "https://swapi.dev/api/starships";

    while (url) {
        try {
          const fetchedShips = await fetch(url)
            .then(res => res.json())
            .then(res => { url = res.next; return res })
            .then(res => res.results)
            .then(res => res.map(p => ({ ...p, id: +getShipIdFromUrl(p.url) })))
          starships.push(...fetchedShips);
        }
        catch (err) {
          console.error("Error reading people.", err.message);
        }
      }
      console.log("All the ships are ", starships)
      renderShips(starships);
}

const getShipIdFromUrl = (url) => {
    const re = /.*starships\/(\d+).*/
    const matches = url.match(re)
    if (!matches) throw "Bad URL. Not a people URL."
    return matches[1]
  }

const renderShips = starshipsList => {
    const divs = starshipsList.map(ship => {
        const el = document.createElement('button');
        el.addEventListener('click', () => goToStarshipPage(ship.id));
        el.textContent = ship.name;
        console.log(ship.id);
        return el;
      });
      starshipSection.replaceChildren(...divs);
}

const goToStarshipPage = id => {
    window.location = `/starshipInfo.html?id=${id}`;
}