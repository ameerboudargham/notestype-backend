
function Note({ note, editNote, deleteNote }: { note: any; editNote: Function; deleteNote: Function }) {
  // Check if note and note.author are defined before accessing properties
  const authorProfile = note.author && note.author.profile;
  const getBackgroundColor = (category: string) => {
    switch (category) {
      case 'home':
        return 'lightyellow';
      case 'hobbies':
        return 'lightgreen';
      case 'work':
        return 'lightcoral';
      default:
        return 'lightgrey';
    }
  };

  const backgroundColor = getBackgroundColor(note.category);


  return (
    <div className="flex gap-[19px] p-6 rounded-xl justify-between" style={{backgroundColor}}>
      <div className="overflow-hidden w-[50px] rounded-full">
        {/* Use the checked authorProfile variable to render the image */}
        <img className="w-full" src={authorProfile} alt="profile" />
      </div>
      <div className="text-start w-full">{note.content}</div>
      <div className="flex flex-col gap-4">
        <span onClick={() => editNote(note.id)} className="bg-blue-200 cursor-pointer rounded p-1">
          edit
        </span>
        <span onClick={() => deleteNote(note.id)} className="bg-red-500 cursor-pointer rounded p-1">
          delete
        </span>
      </div>
    </div>
  );
}

export default Note;