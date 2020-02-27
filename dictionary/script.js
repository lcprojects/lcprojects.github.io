class Images {
    constructor (query) {
        this.query = query;
        this.images = [];
        this.number = 0;
        this.current = 0;
    }

    async getImages () {
        let data;
        data = await fetch(`https://pixabay.com/api/?key=9988773-5ea4417ebdfb9ab21a8759e1a&q=${this.query.replace(' ','+')}&image_type=photo`);
        data = await data.json();
        this.images = data.hits.map(el => el.webformatURL);
        this.number = this.images.length;
    }

    getNextImage(shift) {
        if (shift === -1) {
            this.current !== 0 ? this.current -= 1 : this.current = this.number - 1;
        } else {
            this.current >= this.number - 1 ? this.current = 0 : this.current += 1;
        }
        return this.images[this.current];
    }

}

class Search {
    constructor (query) {
        this.query = query;
    }

    async getDefinition() {
        let data;
        data = await fetch('http://api.urbandictionary.com/v0/define?term=' + this.query);
        data = await data.json();
        if (data.list.length !== 0) {
            this.definition = data.list[0].definition.replace(/\[/g, '');
            this.definition = this.definition.replace(/\]/g, '');
            this.soundURL = data.list[0].sound_urls;
            this.word = data.list[0].word;
        }
    }
}

const hideResults = function () {
    document.querySelectorAll('.row').forEach(el => {
        el.style.display = 'none';
    });
    

    document.querySelector('figure').style.display = 'none';    
    document.querySelector('input[type=text]').value = '';    
}

const showResults = function () {
    document.querySelectorAll('.row').forEach(el => {
        el.style.display = 'initial';
    });
    
    document.querySelector('figure').style.display = 'block';    
}

const displayImage = (images) => {
    if (images.number !== 0) {
        document.querySelector('figure img').src = images.images[0];
    } else {
        document.querySelector('figure img').src = 'img/no-image-available.png';
    }
};

const displayDefinition = (search) => {
    if (search.word !== undefined && search.definition != undefined) {
        document.querySelector('.word').innerHTML = search.word;
        document.querySelector('.definition').innerHTML = search.definition;
    } else {
        document.querySelector('.word').innerHTML = `No Results Found for:${search.query}`;
        document.querySelector('.definition').innerHTML = ''; 
    }
};

const displayLoader = () => {
    let loaderHTML = '<div class="loader"><i class="fas fa-sync"></i></div>';
    document.querySelector('figure').insertAdjacentHTML('beforebegin', loaderHTML);
}

const clearLoader = () => {
    const loader = document.querySelector('.loader');
    loader.parentElement.removeChild(loader);
}
const controlSearch = async () => {
    let query = document.querySelector('input[type=text]').value;
    
    if (query !== '') {
        hideResults();

        state.images = new Images(query);
        state.search = new Search(query);

        displayLoader();

        await state.images.getImages();
        await state.search.getDefinition();

        clearLoader();

        displayImage(state.images);
        
        displayDefinition(state.search);

        showResults();
    }
}

document.querySelector('.search').addEventListener('click', async e => {
    
    if (e.target.matches('.search, .search *')) {
        controlSearch();
    }
});

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


document.querySelector('.js--left').addEventListener('click', e => {
    if (e.target.matches('.js--left, .js--left *')) {
        if (state.images.number !== 0) { 
            document.querySelector('figure img').src = state.images.getNextImage(-1);
        }
    }
});

document.querySelector('.js--right').addEventListener('click', e => {
    if (e.target.matches('.js--right, .js--right *')) {
        if (state.images.number !== 0) {
            document.querySelector('figure img').src = state.images.getNextImage(1);
        }
    }
});

const state = {};

hideResults();