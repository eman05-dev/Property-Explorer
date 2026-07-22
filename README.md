# NovaSol Property Explorer

A full-stack MERN property listing app with an interactive map, Firebase image
uploads, and booking notifications.

## Structure

```
novasol-property-explorer/
├── client/   # Vite + React frontend
└── server/   # Express + MongoDB backend
```

## Setup

### 1. Server

```bash
cd server
cp .env.example .env   # fill in MONGO_URI if not using local Mongo
npm install
npm run dev             # http://localhost:5000
```

### 2. Client

```bash
cd client
cp .env.example .env     # fill in your Firebase project config
npm install
npm run dev               # http://localhost:5173
```

You'll need a Firebase project with **Storage** enabled. Copy the web app
config values (from Project Settings → General → Your apps) into
`client/.env`.

## API

| Method | Route                       | Description                  |
|--------|------------------------------|-------------------------------|
| GET    | `/api/properties`            | List all properties           |
| GET    | `/api/properties/:id`        | Get a single property         |
| POST   | `/api/properties`            | Create a property              |
| PATCH  | `/api/properties/:id/book`   | Mark a property as booked      |

## Notes

- Images are uploaded directly to Firebase Storage from the client; only the
  resulting download URL is stored in MongoDB.
- The map page (`/map`) fetches once on mount and renders live markers with
  a floating listings sidebar.
- The design system (colors, type pairing, icons) lives in
  `client/src/index.css` — clay/terracotta + charcoal + cream palette,
  Fraunces + Work Sans typography, lucide-react icons.
