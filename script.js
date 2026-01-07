let notes = JSON.parse(localStorage.getItem("notes")) || [];

function addNote() {
    const input = document.getElementById("noteInput");
    const error = document.getElementById("errorMsg");

    if (input.value.trim() === "") {
        error.textContent = "Note cannot be empty!";
        return;
    }

    error.textContent = "";
    notes.push(input.value);
    input.value = "";

    saveNotes();
    displayNotes();
}

function displayNotes() {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <p>${note}</p>
            <button onclick="editNote(${index})">Edit</button>
            <button class="delete" onclick="deleteNote(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

function editNote(index) {
    const newNote = prompt("Edit your note:", notes[index]);
    if (newNote !== null && newNote.trim() !== "") {
        notes[index] = newNote;
        saveNotes();
        displayNotes();
    }
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes on page refresh
displayNotes();
