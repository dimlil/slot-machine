# Slot Machine
A simple Node.js + TypeScript slot machine simulation with Express API.

## Installation
After cloning this repo, install dependencies:

```
npm i
```

## Running the Server
Build the project:
```
npm run build
```
Start the server:
```
npm run start
```

By default, the server runs on http://localhost:3000.

## API Usage
### Spin the Slot Machine

Endpoints:
```
GET /api/slot
GET /api/slot/simulation/:totalSpins
```

## Example:
```
curl http://localhost:3000/api/slot
curl http://localhost:3000/api/slot/simulation/30
```