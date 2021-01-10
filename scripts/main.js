let jsonID = document.querySelector('#id');
const inputs = document.querySelectorAll('input');
const title = document.querySelector('.film-title');
const type = document.querySelector('.type');
const create = document.querySelector('#create');
const clear = document.querySelector('#clear');
const save = document.querySelector('#save');
const copy = document.querySelector('#copy');
const resultWindow = document.querySelector('.modal__json');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const addActor = document.querySelector('#addActor');
const addAward = document.querySelector('#addAward');
const actors = document.querySelector('#actors');
const awards = document.querySelector('#awards');
const seasonsData = document.querySelector('.seasons__data');
const seasonsCount = document.querySelector('#seasonsCount');
const addSeasonsBtn = document.querySelector('#addSeasons');

jsonID.value = localStorage.getItem('JSONID');

class Film {
    constructor(id, title, poster, trailer, genres, production, director, producers, writtens, music, cinema, year, time, country, budget, boxoffice, actors, synopsis, categories, awards, parts, type) {

        this.id = +id;
        this.title = title;
        this.poster = poster;
        this.trailer = trailer;
        this.genres = genres;
        this.production = production;
        this.director = director;
        this.producers = producers;
        this.writtens = writtens;
        this.music = music;
        this.cinema = cinema;
        this.year = +year;
        this.time = +time;
        this.country = country;
        this.budget = budget;
        this.boxoffice = boxoffice;
        this.actors = actors;
        this.synopsis = synopsis;
        this.categories = categories;
        this.awards = awards;
        this.parts = parts;
        this.type = type;
    }

}

function clearTitle(string, className) {
    if(className.textContent == string) {
        className.textContent = '';
    }
}

function newFilm() {
	let id = document.querySelector('#id').value;
    let title = document.querySelector('#title').textContent;
    let poster = document.querySelector('#poster').value.trim();
    let trailer = document.querySelector('#trailer').value.trim();
    let genresList = document.querySelectorAll('.categories--genres input[type="checkbox"]');
    let genres = genreBuilder(genresList);
    let production = document.querySelector('#production').value.trim().split(', ');
    let director = document.querySelector('#director').value.trim();
    let producers = document.querySelector('#producers').value.trim();
    let writtens = document.querySelector('#writtens').value.trim();
    let music = document.querySelector('#music').value.trim();
    let cinema = document.querySelector('#cinema').value.trim();
    let year = document.querySelector('#year').value;
    let time = document.querySelector('#time').value;
    let country = document.querySelector('#country').value.trim();
    let budget = document.querySelector('#budget').value;
    let boxoffice = document.querySelector('#boxoffice').value;
    let actors = actorBuilder();
    let synopsis = document.querySelector('#synopsis').value.trim();
    let categoriesList = document.querySelectorAll('.personal-category');
    let categories = categoriesBuilder(categoriesList);
    let parts = document.querySelector('#parts').value;
    let awards = awardBuilder();
    let dataType = {"value": "film","data": null};
    if(type.value == 'Series') {
        trailer = null;
        dataType = {"value": "series","data": generateSeasonsData()};
    }

    if(parts == '') {
        parts = null;
    }
    
	let film = new Film(id, title, poster, trailer, genres, production, director, producers, writtens, music, cinema, year, time, country, budget, boxoffice, actors, synopsis, categories, awards, parts, dataType);

    return film;
}
function categoriesBuilder(list) {
    let choosedCategories = [];
    for(let i = 0; i < list.length; i++) {
        if(list[i].checked == true) {
            choosedCategories.push(list[i].value)
        }
    }
    if(choosedCategories.length) {
        return choosedCategories;
    } else {
        return ["uncategorised"]
    }
}
function genreBuilder(list) {
    let choosedGenres = [];
    for(let i = 0; i < list.length; i++) {
        if(list[i].checked == true) {
            choosedGenres.push(list[i].value);
        }
    }
    return choosedGenres;
}
function actorBuilder() {
    class Actor {
        constructor(image, name, role) {
            this.image = image;
            this.name = name;
            this.role = role;
        }
    }
    let list = [];
    let actorsList = document.querySelectorAll('.actor-name');
    let rolesList = document.querySelectorAll('.actor-role'); 

    for(let i = 0; i < actorsList.length; i++) {
        list.push(new Actor(actorsList[i].value.trim().toLowerCase().replace(/\s/g, '-'), actorsList[i].value.trim(), rolesList[i].value.trim()))
    }
    return list;
}
function awardBuilder() {
    class Award {
        constructor(title, nominations) {
            this.title = title;
            this.nominations = nominations;
        }
    }
    let list = [];
    let awardsList = document.querySelectorAll('.award-title');
    let nominationsList = document.querySelectorAll('.award-nominations'); 

    for(let i = 0; i < awardsList.length; i++) {
        if(awardsList[i].value != '') {
            list.push(new Award(awardsList[i].value.trim(), nominationsList[i].value.trim().split(', ')));
        }
        else {
            list = null;
        }
    }
    return list;
}

function addLine(selector, firstClassName, secondClassName) {
    let layout = `
        <div class="inputs-line">
            <div class="input-wrapper">
                <input type="text" class="${firstClassName}" placeholder="Actor">
            </div>
            <div class="input-wrapper">
                <input type="text" class="${secondClassName}" placeholder="Role">
            </div>
        </div>	    
    `
    
    selector.insertAdjacentHTML('beforeend', layout);
}

function seasonsComponent() {
    let layout = `
        <div class="seasons__data-row">
            <div class="input-wrapper">
                <label for="seasonEpisodes">Episodes</label>
                <input type="number" class="season-episodes">
            </div>
            <div class="input-wrapper">
                <label for="seasonTrailer">Trailer</label>
                <input type="text" class="season-trailer">  
            </div>
        </div>
    `
    seasonsData.insertAdjacentHTML('beforeend', layout);
}

function addSeasons() {
    let seasons = [];
    seasonsData.textContent = '';
    for(let i = 0; i < parseInt(seasonsCount.value); i++) {
        seasonsComponent();
    }
}

function generateSeasonsData() {
    const seasonEpisodes = document.querySelectorAll('.season-episodes');
    const seasonTailers = document.querySelectorAll('.season-trailer');
    let seasons = [];
    class Season {
        constructor(episodes, trailer) {
            this.episodes = episodes
            this.trailer = trailer
        }
    }
    for(let i = 0; i < seasonEpisodes.length; i++) {
        seasons.push(new Season(seasonEpisodes[i].value, seasonTailers[i].value));
    }
    return seasons;
}

addSeasonsBtn.addEventListener('click', addSeasons);

function showNewData() {
    let film = newFilm();
    resultWindow.innerHTML = JSON.stringify(film, undefined, 4).replace(/"(\\.|[^"\\])*":/g, '<span class="property">$&</span>').replace(/[{},\[\]]/g, '<span class="symbol">$&</span>');;
    localStorage.setItem('JSONID', id.value);
}

function hideType() {
	let filmType = document.querySelectorAll('[data-type="film"]');
    let seriesType = document.querySelectorAll('[data-type="series"]');
    const seriesCategory = document.querySelector('#seriesCategory');
	if(type.value == 'Series') {
		filmType.forEach(elem => elem.classList.add('hidden'));
        seriesType.forEach(elem => elem.classList.remove('hidden'));
        seriesCategory.checked = true;
	} else {
		seriesType.forEach(elem => elem.classList.add('hidden'));
		filmType.forEach(elem => elem.classList.remove('hidden'));
		seriesCategory.checked = false;
	}
}

function setType() {
	if(localStorage.getItem('dataType')) {
		type.value = localStorage.getItem('dataType');
	}
	else {
		localStorage.setItem('dataType', 'Film');
		type.value = localStorage.getItem('dataType');
	}
}

function saveTypeToLocalStorage() {
	localStorage.setItem('dataType', type.value);
}

setType();
hideType();
function showModal(modalID) {
    document.body.style.overflow = 'hidden';
    modalID.classList.add('modal--visible');
}

function closeModal(e) {
	if(e.target.className == 'modal__overlay') {
		e.target.closest('.modal').classList.remove('modal--visible');
	    document.body.style.overflow = '';
	}
}

function clearFields() {
    title.textContent = 'New film';
    inputs.forEach(input => {  
        input.checked = false; 
        if(input.id != 'id') {
            input.value = '';
        }   
    });
}

function saveData() {
    let data = newFilm();
    let blob = new Blob([JSON.stringify(data, undefined, 4)], {type: "application/json; charset=utf-8"});
    saveAs(blob, `${title.textContent}.json`);
}

function copyData() {
    navigator.clipboard.writeText(resultWindow.textContent).then(() => {
        copy.classList.add('copy-btn--copied');
        setTimeout(() => {
          copy.classList.remove('copy-btn--copied');  
        }, 500)
    });
}

// init functions 

type.addEventListener('change', () => {
	hideType();
	saveTypeToLocalStorage();
});
title.addEventListener('click', () => {
	clearTitle('New film', title);
});
create.addEventListener('click', () => {
    if(jsonID.value != localStorage.getItem('JSONID')) {
        showNewData();
        showModal(modal);        
    }
    else {
        alert("It's need to change ID");
    }
});
clear.addEventListener('click', clearFields);
save.addEventListener('click', saveData);
copy.addEventListener('click', copyData);
addActor.addEventListener('click', () => {
    addLine(actors, 'actor-name', 'actor-role');
});
addAward.addEventListener('click', () => {
    addLine(awards, 'award-title', 'award-nominations');
});
modalOverlay.addEventListener('click', closeModal);