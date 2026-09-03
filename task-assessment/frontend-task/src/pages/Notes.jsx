import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiFileText } from 'react-icons/fi';

const API = 'http://localhost:4001/notes';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setNotes(data.notes || []);
    } catch {
      showToast('Could not connect to API server');
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (data.success) {
      setTitle('');
      setContent('');
      setShowForm(false);
      fetchNotes();
      showToast('Note created successfully');
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { fetchNotes(); showToast('Note deleted'); }
  };

  const handleEditSave = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    const data = await res.json();
    if (data.success) {
      setEditId(null);
      fetchNotes();
      showToast('Note updated');
    }
  };

  const filtered = notes.filter(n => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    if (!isNaN(q)) return n.id === parseInt(q);
    return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">

      <div className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">Notes</h1>
              <p className="text-secondary-500 dark:text-secondary-400 text-sm mt-1">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} total
              </p>
            </div>
            <button
              onClick={() => { setShowForm(!showForm); setTitle(''); setContent(''); }}
              className="btn flex items-center gap-2 self-start sm:self-auto"
            >
              <FiPlus size={16} />
              New Note
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

        {toast && (
          <div className="mb-4 px-4 py-3 bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 rounded-lg text-sm flex items-center gap-2">
            <FiCheck size={14} />
            {toast}
          </div>
        )}

        {showForm && (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 mb-6 border border-secondary-100 dark:border-secondary-700 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold dark:text-white">Create New Note</h2>
              <button onClick={() => setShowForm(false)} className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white rounded-lg px-3 py-2.5 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              />
              <textarea
                placeholder="Write your note here..."
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                className="w-full border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white rounded-lg px-3 py-2.5 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
              />
              <div className="flex gap-2">
                <button type="submit" className="btn flex items-center gap-2 text-sm">
                  <FiPlus size={14} />
                  Create Note
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" size={16} />
          <input
            type="text"
            placeholder="Search by title, content, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600">
              <FiX size={14} />
            </button>
          )}
        </div>

        {search && (
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &quot;{search}&quot;
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FiFileText size={40} className="text-secondary-300 dark:text-secondary-600 mx-auto mb-4" />
            <p className="text-secondary-500 dark:text-secondary-400 font-medium">
              {search ? 'No notes match your search' : 'No notes yet'}
            </p>
            {!search && (
              <button onClick={() => setShowForm(true)} className="mt-4 btn text-sm">
                Create your first note
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(note => (
              <div
                key={note.id}
                className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-secondary-100 dark:border-secondary-700 p-5 transition-colors duration-300"
              >
                {editId === note.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white rounded-lg px-3 py-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    />
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleEditSave(note.id)} className="btn text-xs px-3 py-1.5 flex items-center gap-1">
                        <FiCheck size={12} /> Save
                      </button>
                      <button onClick={() => setEditId(null)} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                        <FiX size={12} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold dark:text-white leading-snug pr-2">{note.title}</h3>
                      <span className="text-xs text-secondary-400 bg-secondary-100 dark:bg-secondary-700 dark:text-secondary-400 px-2 py-0.5 rounded-full shrink-0">
                        #{note.id}
                      </span>
                    </div>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 leading-relaxed">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-secondary-400">
                        {note.updatedAt
                          ? `Updated ${new Date(note.updatedAt).toLocaleTimeString()}`
                          : `Created ${new Date(note.createdAt).toLocaleTimeString()}`}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => { setEditId(note.id); setEditTitle(note.title); setEditContent(note.content); }}
                          className="p-1.5 rounded-md text-secondary-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="p-1.5 rounded-md text-secondary-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-secondary-700 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
