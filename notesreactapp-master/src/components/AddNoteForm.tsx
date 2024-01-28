import { useState, useEffect } from 'react';
import { API_URL } from '../shared/constants';

function AddNoteForm({ noteBeingEdited, addNote }: { noteBeingEdited: any; addNote: Function }) {
  const [formData, setFormData] = useState({
    content: '',
    priority: 1,
    category: '',
  });

  useEffect(() => {
    // Update formData when noteBeingEdited changes
    setFormData({
      content: noteBeingEdited?.content || '',
      priority: noteBeingEdited?.priority || 1,
      category: noteBeingEdited?.category || '',
    });
  }, [noteBeingEdited]);
  const handleAddNote = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          author: {
            userName: 'ameer',
            profile: 'avatar5.png',
          },
        }),
      });

      const newNote = await response.json();
      addNote(newNote);
      setFormData({
        content: '',
        priority: 1,
        category: '',
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // ... (existing code)


  return (
    <form style={{ width: '450px', height: '600px' }} className="relative Form flex flex-col gap-4 bg-grey p-10 rounded-3xl shadow-xl">
      <div className="flex flex-col text-start">
        <label htmlFor="note-content">Content</label>
        <textarea
          className="border-[1px] p-2 rounded border-black"
          name="content"
          id="note-content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        ></textarea>
      </div>
      <div className="flex flex-col text-start">
        <label>Priority</label>
        {[1, 2, 3, 4, 5].map((priority) => (
          <span key={priority} className="flex gap-4 items-center">
            <input
              type="radio"
              name="priority"
              id={`priority-${priority}`}
              value={priority}
              checked={formData.priority === priority}
              onChange={() => setFormData({ ...formData, priority })}
            />
            <label htmlFor={`priority-${priority}`}>{`priority-${priority}`}</label>
          </span>
        ))}
      </div>

      <div className="flex flex-col justify-start text-start">
        <label htmlFor="note-category">Category</label>
        <select
          name="category"
          id="note-category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="home">home</option>
          <option value="hobbies">hobbies</option>
          <option value="work">work</option>
        </select>
      </div>

      <button onClick={handleAddNote} type="button" className="absolute right-5 bottom-5 p-4 bg-blue-300">
        Add Note
      </button>
    </form>
  );
}

export default AddNoteForm;