import Note from "./Note";

function NotesList({ notes, deleteNote, editNote }: { notes: Array<any>; deleteNote: Function; editNote: Function }) {
  return (
    <div style={{ width: '450px', height: '600px' }} className="NotesList flex flex-col gap-4 bg-grey p-10 rounded-3xl shadow-xl overflow-y-auto">
      {notes.map((note) => (
        <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
      ))}
    </div>
  );
}

export default NotesList;