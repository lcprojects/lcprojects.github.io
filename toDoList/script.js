class Note {
    constructor (id, text) {
        this.id = id;
        this.text = text;
        this.state = 'empty';
    }
}

class ListOfNotes {
    constructor () {
        this.list = [];
        this.lastId = -1;
    }

    getNextId () {
        this.lastId++;
        return this.lastId;
    }

    addNote (note) {
        this.list.push(note);
    }

    removeNote (id) {
        this.list.splice(this.list.findIndex((element) => {
            return element.id == id;
        }), 1);
    }
}

const displayNote = (note) => {
    noteHTML = `<div class="row">
                    <div class="note" data-id="${note.id}">
                        <p class="item">${note.text}</p>
                        <div class="check ${note.state}"></div>
                        <button class="delete" data-id="${note.id}"><i class="fa fa-times" data-id="${note.id}"></i></button>
                    </div>
                </div>`;

    document.querySelector('.notes').insertAdjacentHTML('beforeend', noteHTML);
};

const displayNotes = () => {
    for(let i = 0; i < state.listOfNotes.list.length; i++) {
        displayNote(state.listOfNotes.list[i]);
    }
};

const clearNotes = () => {
    document.querySelector('.notes').innerHTML = '';
};

const addNote = (e) => {
    e.preventDefault();
    if (e.target.matches('.button, .button *')) {
        
        noteText = document.querySelector('input').value;

        if (noteText !== '') {

            // Create new note
            note = new Note(state.listOfNotes.getNextId(), noteText);

            //Add note to the list
            state.listOfNotes.addNote(note);

            //Display Note
            displayNote(note);

            let input = document.querySelector('input');

            input.value = '';
            input.focus();

        }
    }
}

document.querySelector('.button').addEventListener('click', addNote);

document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.matches('.delete , .delete *')) {

        state.listOfNotes.removeNote(e.target.dataset.id);

        clearNotes();
        
        displayNotes();

    }
});

document.querySelector('.notes').addEventListener('click', (e) => {
    
    if (e.target.matches('.check')) {
        let index = state.listOfNotes.list.findIndex((element) => {
            return element.id === parseInt(e.target.parentElement.dataset.id);
        });

        let note = state.listOfNotes.list[index];
        
        switch (note.state) {
            case 'empty':
                            note.state = 'completed';
                            e.target.classList.remove('empty');
                            e.target.classList.add('completed');
                            break;
            case 'completed':
                            note.state = 'wip';
                            e.target.classList.remove('completed');
                            e.target.classList.add('wip');
                            break;
            case 'wip':
                            note.state = 'notexecuted';
                            e.target.classList.remove('wip');
                            e.target.classList.add('notexecuted');
                            break;
            case 'notexecuted':
                            note.state = 'empty';
                            e.target.classList.remove('notexecuted');
                            e.target.classList.add('empty');
                            break;
        }
    }
});

const state = {};

state.listOfNotes = new ListOfNotes();

document.querySelector('input').focus();