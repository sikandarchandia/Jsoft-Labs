# Task 6 - AI Task: Chatbot API + Mock Property Search

## Requirements
1. `POST /chat`
   - Input: `{ "message": "Show me apartments under $1200 in New York" }`
   - Output: `{ "reply": "...", "results": [...] }`
2. Simple NLP extraction
   - Intent: `search_property`
   - Entities: city, priceMax, bedrooms
3. Mock Data
   - `properties.json` with 5-10 sample listings
4. Logic
   - Parse query -> filter mock data -> return matches
   - If no match -> friendly message

## Implemented
### API
- Server: `task-assessment/ai-task/chat-server.js`
- Port: `4003`
- Endpoint: `POST /chat`

### Mock Data
- `task-assessment/ai-task/properties.json`

### Frontend (simple integration)
- Page: `task-assessment/frontend-task/src/pages/Chatbot.jsx`
- Route: `/chat`
- UI shows reply + matched listings

## Test
`POST http://localhost:4003/chat`
Body:
```json
{ "message": "Show me apartments under $1200 in New York" }
```

Expected:
- `reply` with count
- `results` array with matched listings

## Deliverables
- [ ] Record a video of the chatbot flow

