let notes = [];
let nextId = 1;

exports.createNote = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }
  const note = { id: nextId++, title, content, createdAt: new Date().toISOString() };
  notes.push(note);
  res.status(201).json({ success: true, note });
};

exports.getAllNotes = (req, res) => {
  res.status(200).json({ success: true, count: notes.length, notes });
};

exports.getNoteById = (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }
  res.status(200).json({ success: true, note });
};

exports.updateNote = (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }
  const { title, content } = req.body;
  notes[index] = { ...notes[index], ...(title && { title }), ...(content && { content }), updatedAt: new Date().toISOString() };
  res.status(200).json({ success: true, note: notes[index] });
};

exports.deleteNote = (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }
  notes.splice(index, 1);
  res.status(200).json({ success: true, message: 'Note deleted successfully' });
};
