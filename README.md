# Car Dealership Inventory System

A full-stack inventory system for a car dealership: vehicle catalogue, search, purchasing, restocking, and role-based administration.

## Tech stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend  | Node.js, TypeScript, Express          |
| Database | PostgreSQL 16                         |
| Testing  | Jest, Supertest                       |

## Repository layout

```text
backend/    REST API (Express + PostgreSQL)
frontend/   Single-page application (React + Vite)
docker/     Local database initialisation scripts
```

## Prerequisites

- Node.js 20 or newer
- Docker Desktop (for PostgreSQL)

## Getting started

### 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts PostgreSQL on `localhost:5432` and creates two databases: `car_dealership` for development and `car_dealership_test` for the test suite.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

The API listens on `http://localhost:3000` by default. Verify it with:

```bash
curl http://localhost:3000/api/health
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The application is available at `http://localhost:5173`. Vite proxies `/api` requests to the backend during development.

## Available scripts

### Backend

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run dev`           | Start the API with hot reload      |
| `npm run build`         | Compile TypeScript to `dist/`      |
| `npm start`             | Run the compiled API               |
| `npm test`              | Run the test suite                 |
| `npm run test:coverage` | Run tests with coverage            |
| `npm run lint`          | Lint the source                    |
| `npm run typecheck`     | Type-check without emitting output |

### Frontend

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Lint the source                      |

## API

| Method | Endpoint             | Access        | Description                              |
| ------ | -------------------- | ------------- | ---------------------------------------- |
| GET    | `/api/health`        | Public        | Service liveness check                   |
| POST   | `/api/auth/register` | Public        | Create a customer account                |
| POST   | `/api/auth/login`    | Public        | Exchange credentials for an access token |
| GET    | `/api/auth/me`       | Authenticated | Return the current user                  |
| Any    | `/api/vehicles/*`    | Authenticated | Vehicle inventory (in progress)          |

Protected endpoints expect `Authorization: Bearer <token>`. Additional vehicle routes are added as features land.

## My AI Usage

This project was built with an AI coding assistant (Command Code) used as a pair programmer.

- **Scaffolding and boilerplate:** project configuration, tooling, and the initial API skeleton were generated with AI assistance and reviewed before being committed.
- **Implementation:** feature code and tests are generated with AI assistance, then executed, reviewed, and refined locally.
- **Commit trail:** commits that include AI-generated code carry a `Co-authored-by` trailer, as required by the assessment.
- **Prompt log:** the prompts used during development are recorded verbatim in [`PROMPTS.md`](./PROMPTS.md).

Reflection: AI shortened the setup and boilerplate work, which left more time for deciding the API contract, writing tests, and reviewing behaviour. Suggestions were treated as drafts: every change was read, run, and corrected before it stayed in the codebase.
