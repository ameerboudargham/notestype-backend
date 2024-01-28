import React, { useEffect, useState } from "react";
import "./App.css";
import NotesList from "./components/NotesList";
import AddNoteForm from "./components/AddNoteForm";
import { API_URL } from "./shared/constants";

function App() {
  const [notes, setNotes] = useState<any[]>([]);
  // useEffect(() => {
  //   writeNotesToLocalStorage();
  // }, [notes]);

  useEffect(() => {
    fetchNotes();
  }, []);
  
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const notes = await response.json();
      setNotes(notes);
    console.log(notes)
    ;
  } catch (e) {
    console.error(e);
  }
};

  function writeNotesToLocalStorage(notes: any) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // useEffect(() => {
  //   let stringifiedNotesFromLocalStorage = localStorage.getItem("notes");
  //   if (stringifiedNotesFromLocalStorage) {
  //     let notesFromLocalStorage = JSON.parse(stringifiedNotesFromLocalStorage);
  //     setNotes(notesFromLocalStorage);
  //   }
  // }, []);

  const [noteBeingEdited, setNoteBeingEdited] = useState(null);
  const [addingNote, setAddingNote] = useState(false);
  const [formData, setFormData] = useState({
    // @ts-ignore
    content: noteBeingEdited?.content || "",
    // @ts-ignore
    priority: noteBeingEdited?.priority || 1,category: noteBeingEdited?.category || "",
  });

  // function addNote(note: any) {
  //   console.log(note);
  //   const newNoteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;

  //   // Create a new note with the generated ID
  //   const newNote = { ...note, id: newNoteId };

  //   // Update the state with the new note
  //   setNotes(() => [...notes, newNote]);

  //   // Reset the form and noteBeingEdited
  //   setFormData({
  //     content: "",
  //     priority: 1,
  //     category: "",
  //   });

  //   setAddingNote(false);
  //   setNoteBeingEdited(null);
  //   writeNotesToLocalStorage([...notes, newNote]);
  // }
  const addNote = async (note: any) => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });

      const newNote = await response.json();
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // function editNote(noteID: number) {
  //   let noteToEdit = notes.find((note) => note.id === noteID);
  //   if (noteToEdit) {
  //     // @ts-ignore
  //     setNoteBeingEdited(noteToEdit);
  //     setNotes(notes.filter((note) => note.id !== noteID));
  //     setAddingNote(true);
  //   }
  // }

  const editNote = async (noteID: number) => {
    let noteToEdit = notes.find((note) => note.id === noteID);
    if (noteToEdit) {
      setNoteBeingEdited(noteToEdit);
  
      try {
        const response = await fetch(`${API_URL}/notes/${noteID}`, { // Update the URL
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const updatedNote = await response.json();
        setNotes([...notes.filter((note) => note.id !== noteID), updatedNote]);
        setAddingNote(true);
      } catch (error) {
        console.error('Error editing note:', error);
      }
    }
  };
  
  // function deleteNote(noteID: number) {
  //   setNotes(() => notes.filter((note) => note.id !== noteID));
  //   writeNotesToLocalStorage(notes.filter((note) => note.id !== noteID));
  // }

  const deleteNote = (id:any) => {
    fetch(`${API_URL}/notes/${id}`, { method: "DELETE" })
      .then(() => fetchNotes())
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="App flex justify-center items-center h-screen gap-[2rem] bg-[var(--accent-light)]">
      <NotesList deleteNote={deleteNote} editNote={editNote} notes={notes} />
      {/* @ts-ignore */}
      <AddNoteForm
        addNote={addNote}
        // @ts-ignore
        formData={formData}
        setFormData={setFormData}
        noteBeingEdited={noteBeingEdited}
        addingNote={addingNote}
      />
    </div>
  );
}

export default App;