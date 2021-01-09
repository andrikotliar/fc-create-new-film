let jsonID = document.querySelector('#id');
const title = document.querySelector('.film-title');
const type = document.querySelector('.type');
const create = document.querySelector('#create');
const resultWindow = document.querySelector('.modal__json');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const addActor = document.querySelector('#addActor');
const actors = document.querySelector('.actors');
const includeAwards = document.querySelector('#includeAwards');
const awardsList = document.querySelector('.awards');
const awardCheckboxes = document.querySelectorAll('.award > input[type="checkbox"]');
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
    let poster = document.querySelector('#poster').value;
    let trailer = document.querySelector('#trailer').value;
    let genresList = document.querySelectorAll('.categories--genres input[type="checkbox"]');
    let genres = genreBuilder(genresList);;
    let production = document.querySelector('#production').value.split(', ');
    let director = document.querySelector('#director').value;
    let producers = document.querySelector('#producers').value;
    let writtens = document.querySelector('#writtens').value;
    let music = document.querySelector('#music').value;
    let cinema = document.querySelector('#cinema').value;
    let year = document.querySelector('#year').value;
    let time = document.querySelector('#time').value;
    let country = document.querySelector('#country').value;
    let budget = document.querySelector('#budget').value;
    let boxoffice = document.querySelector('#boxoffice').value;
    let actors = actorBuilder();
    let synopsis = document.querySelector('#synopsis').value;
    let categoriesList = document.querySelectorAll('.personal-category');
    let categories = categoriesBuilder(categoriesList);
    let parts = document.querySelector('#parts').value;
    let awards = null;
    let dataType = {"value": "film","data": null};

    if(type.value == 'Series') {
        trailer = null;
        dataType = {"value": "series","data": generateSeasonsData()};
    }

    if(parts == '') {
        parts = null;
    }

    if(includeAwards.checked) {
        awards = awardsBuilder();
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
    let actorPhotosList = document.querySelectorAll('.actor__photo');
    let actorsList = document.querySelectorAll('.actor__name');
    let rolesList = document.querySelectorAll('.actor__role'); 

    for(let i = 0; i < actorsList.length; i++) {
        list.push(new Actor(actorPhotosList[i].value, actorsList[i].value, rolesList[i].value))
    }
    return list;
}

function addActorLine() {
    let layout = `
        <div class="actor">
            <div class="input-wrapper">
                <input type="text" class="actor__photo" placeholder="Photo">
            </div>
            <div class="input-wrapper">
                <input type="text" class="actor__name" placeholder="Actor">
            </div>
            <div class="input-wrapper">
                <input type="text" class="actor__role" placeholder="Role">
            </div>
        </div>	    
    `
    
    actors.insertAdjacentHTML('beforeend', layout);
}
function showAwards() {
    if(includeAwards.checked) {
        awardsList.style.display = 'flex';
    }
    else {
        awardsList.style.display = 'none';
    }
}

function showNominations() {
    for(let i = 0; i < awardCheckboxes.length; i++) {
        let choosedNominations = awardCheckboxes[i].closest('.award').querySelector('.award__nominations');
        if(awardCheckboxes[i].checked) {
            choosedNominations.style.display = 'block';
        } else {
            choosedNominations.style.display = 'none';
        }
    }
}

function awardsBuilder() {
    class Award {
        constructor(title, nominations) {
            this.title = title
            this.nominations = nominations
        }
    }

    let awards = [];
    let awardList = document.querySelectorAll('.award');
    for(let i = 0; i < awardList.length; i++) {
        if(awardCheckboxes[i].checked) {
            awards.push(new Award(awardCheckboxes[i].value, nominationsBuilder(awardList[i])))
        }
    }
    return awards;
}

function nominationsBuilder(selector) {
    let nominations = [];
    let nominationsList = selector.querySelectorAll('.award__nominations input');
    for(let i = 0; i < nominationsList.length; i++) {
        if(nominationsList[i].checked) {
            nominations.push(nominationsList[i].value);
        }
    }
    return nominations;
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
    resultWindow.innerHTML = JSON.stringify(film, undefined, 4);
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
		if(!e.target.closest('.additional')) {
			document.body.style.overflow = '';
		}
	}
}

// init functions 

type.addEventListener('change', () => {
	hideType();
	saveTypeToLocalStorage();
});
title.addEventListener('click', () => {
	clearTitle('New film', title);
});
includeAwards.addEventListener('change', showAwards);
awardsList.addEventListener('click', showNominations);
create.addEventListener('click', () => {
    if(jsonID.value != localStorage.getItem('JSONID')) {
        showNewData();
        showModal(modal);        
    }
    else {
        alert("It's need to change ID");
    }
});
addActor.addEventListener('click', addActorLine);
modalOverlay.addEventListener('click', closeModal);