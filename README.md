# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## API & Validation

- The server exposes a single endpoint `GET /` which proxies and normalizes the NASA NEO Feed into a UI-friendly model.
- Query parameters accepted:
  - `start_date` (optional) — required format: `YYYY-MM-DD`
  - `end_date` (optional) — required format: `YYYY-MM-DD`

- Validation rules enforced by the server:
  - Dates must be in `YYYY-MM-DD` format and must correspond to a real calendar date.
  - `start_date` must be on or before `end_date`.
  - The API accepts a maximum range of 7 days per request (NASA feed limit).

- Example request:

```
GET http://localhost:3000/?start_date=2025-01-01&end_date=2025-01-01
```

## OpenAPI / Docs

- A machine-readable OpenAPI 3.0 spec is included at `server/openapi.yaml` for tooling (Swagger UI, ReDoc, etc.).
- To view the API docs locally with Redoc (install required):

```
npx redoc-cli serve server/openapi.yaml
```

## Environment

- The server reads the NASA API key from `NEO_API_KEY`. If not set a default placeholder in the repository will be used (replace it for real usage):

```
export NEO_API_KEY=your_real_nasa_api_key_here
```

## Run Locally

Start the server (Fastify):

```
cd server
npm install
npm run dev
```

Start the UI (React):

```
cd neo-ui
npm install
npm start
```

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).
