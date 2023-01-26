let persons = [];
let matchingPeople = [];
const personsSection = document.querySelector("#people")

document.addEventListener('DOMContentLoaded', getPeople)

async function getPeople() {
  let url = 'https://swapi.dev/api/people';

  while (url) {
    try {
      const fetchedPersons = await fetch(url)
        .then(res => res.json())
        .then(res => { url = res.next; return res })
        .then(res => res.results)
        .then(res => res.map(p => ({ ...p, id: +getPersonIdFromUrl(p.url) })))
      persons.push(...fetchedPersons);
    }
    catch (ex) {
      console.error("Error reading people.", ex.message);
    }
  }
  console.log("All the persons are ", persons)
  renderPeople(persons);
}

const getPersonIdFromUrl = (url) => {
  const re = /.*people\/(\d+).*/
  const matches = url.match(re)
  if (!matches) throw "Bad URL. Not a people URL."
  return matches[1]
}

const filterPeople = () => {
  const searchString = document.querySelector("#searchString").value;
  const re = new RegExp(searchString, "i");
  matchingPeople = persons.filter(person => re.test(person.name))
  renderPeople(matchingPeople);
}

const renderPeople = persons => {
  const divs = persons.map(person => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToPersonPage(person.id));
    el.textContent = person.name;
    return el;
  })
  personsSection.replaceChildren(...divs)
}

const goToPersonPage = id => window.location = `/person.html?id=${id}`

const goToStarshipPage = () => window.location = '/starship.html';