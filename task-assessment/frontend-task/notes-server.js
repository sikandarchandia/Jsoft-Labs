const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let notes = [];
let nextId = 1;

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }
  const note = { id: nextId++, title, content, createdAt: new Date().toISOString() };
  notes.push(note);
  console.log(`[POST] Note created:`, note);
  res.status(201).json({ success: true, note });
});

app.get('/notes', (req, res) => {
  console.log(`[GET] All notes (${notes.length} total)`);
  res.status(200).json({ success: true, count: notes.length, notes });
});

app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
  console.log(`[GET] Note #${req.params.id}:`, note);
  res.status(200).json({ success: true, note });
});

app.put('/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Note not found' });
  const { title, content } = req.body;
  notes[index] = { ...notes[index], ...(title && { title }), ...(content && { content }), updatedAt: new Date().toISOString() };
  console.log(`[PUT] Note #${req.params.id} updated:`, notes[index]);
  res.status(200).json({ success: true, note: notes[index] });
});

app.delete('/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Note not found' });
  const deleted = notes.splice(index, 1)[0];
  console.log(`[DELETE] Note #${req.params.id} deleted`);
  res.status(200).json({ success: true, message: 'Note deleted successfully', note: deleted });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Notes API running on http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  POST   http://localhost:${PORT}/notes`);
  console.log(`  GET    http://localhost:${PORT}/notes`);
  console.log(`  GET    http://localhost:${PORT}/notes/:id`);
  console.log(`  PUT    http://localhost:${PORT}/notes/:id`);
  console.log(`  DELETE http://localhost:${PORT}/notes/:id`);
});
