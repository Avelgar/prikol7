document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    const offlineStatus = document.getElementById('offline-status');

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    loadNotes();

    addNoteBtn.addEventListener('click', addNote);

    function updateOnlineStatus() {
        if (navigator.onLine) {
            offlineStatus.classList.add('hidden');
        } else {
            offlineStatus.classList.remove('hidden');
        }
    }

    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText === '') return;

        const note = {
            id: Date.now(),
            text: noteText,
            date: new Date().toLocaleString()
        };

        saveNote(note);
        renderNote(note);
        noteInput.value = '';
    }

    function saveNote(note) {
        let notes = getNotes();
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function getNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    function deleteNote(id) {
        let notes = getNotes().filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        document.getElementById(`note-${id}`).remove();
    }

    function renderNote(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.id = `note-${note.id}`;
        noteElement.innerHTML = `
            <div class="note-text">${note.text}</div>
            <div class="note-date">${note.date}</div>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Удалить</button>
        `;
        notesList.appendChild(noteElement);
    }

    function loadNotes() {
        const notes = getNotes();
        notes.forEach(renderNote);
    }

    window.deleteNote = deleteNote;
});