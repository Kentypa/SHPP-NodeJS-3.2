# SHPP-NODEJS-3.2

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) to install all dependencies.

### Clone repository

```bash
git clone https://github.com/Kentypa/SHPP-NodeJS-3.2
cd SHPP-NodeJS-3.2
```

### Install Frontend Dependencies

```bash
cd apps/frontend
yarn install
```

#### Create .env file, example you can get from .env.example

```bash
cp .env.example .env
```

### Install Backend Dependencies

```bash
cd .../backend
yarn install
```

#### Create .env file, example you can get from .env.example

```bash
cp .env.example .env
```

### Docker

Install [docker](https://www.docker.com/products/docker-desktop/) into system

## Startup

To run project write from main directory

```bash
docker-compose up
```

To close project write from main directory

```bash
docker-compose down
```

## Project Structure

```bash
├── apps
│   ├── backend
│   │   ├── backups
│   │   ├── Dockerfile
│   │   ├── express.d.ts
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── src
│   │   │   ├── app.ts
│   │   │   ├── config
│   │   │   │   ├── cors.config.ts
│   │   │   │   ├── db.config.ts
│   │   │   │   ├── multer.config.ts
│   │   │   │   └── routes.config.ts
│   │   │   ├── dto
│   │   │   │   ├── add-book.dto.ts
│   │   │   │   └── sign-in-user.dto.ts
│   │   │   ├── index.ts
│   │   │   ├── middleware
│   │   │   │   ├── basic-auth.middleware.ts
│   │   │   │   └── upload.middleware.ts
│   │   │   ├── routes
│   │   │   │   └── index.ts
│   │   │   ├── services
│   │   │   │   ├── authService.service.ts
│   │   │   │   ├── backupScheduler.service.ts
│   │   │   │   ├── bookService.service.ts
│   │   │   │   └── cleanupScheduler.service.ts
│   │   │   ├── shared
│   │   │   │   ├── entities
│   │   │   │   │   ├── Author.ts
│   │   │   │   │   ├── Book.ts
│   │   │   │   │   └── User.ts
│   │   │   │   ├── enum
│   │   │   │   │   ├── cron-expression.enum.ts
│   │   │   │   │   └── role.enum.ts
│   │   │   │   ├── types
│   │   │   │   │   └── authRequest.type.ts
│   │   │   │   └── utils
│   │   │   │       └── database.ts
│   │   │   └── sql
│   │   │       ├── migrations
│   │   │       │   └── init.sql
│   │   │       ├── run-migrations.ts
│   │   │       └── seeds
│   │   │           └── admin_user.sql
│   │   ├── tsconfig.json
│   │   ├── uploads
│   │   └── yarn.lock
│   └── frontend
│       ├── Dockerfile
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── public
│       │   └── icons
│       │       └── site-logo.png
│       ├── src
│       │   ├── App.css
│       │   ├── App.tsx
│       │   ├── assets
│       │   │   └── books
│       │   │       └── book.jpg
│       │   ├── components
│       │   │   ├── AdminBookAdd
│       │   │   │   └── index.tsx
│       │   │   ├── AdminBookList
│       │   │   │   └── index.tsx
│       │   │   ├── BookPageContent
│       │   │   │   └── index.tsx
│       │   │   ├── BooksList
│       │   │   │   └── index.tsx
│       │   │   ├── Footer
│       │   │   │   └── index.tsx
│       │   │   ├── Header
│       │   │   │   └── index.tsx
│       │   │   └── UI
│       │   │       ├── Navigation
│       │   │       │   └── index.tsx
│       │   │       ├── PageWrapper
│       │   │       │   └── index.tsx
│       │   │       └── ProtectedRoute
│       │   │           └── index.tsx
│       │   ├── config
│       │   │   └── axios-config.ts
│       │   ├── enums
│       │   │   └── routes-path.ts
│       │   ├── hooks
│       │   │   └── use-form.ts
│       │   ├── main.tsx
│       │   ├── screens
│       │   │   ├── AdminPage
│       │   │   │   └── index.tsx
│       │   │   ├── ApplicationRoutes
│       │   │   │   └── index.tsx
│       │   │   ├── BookPage
│       │   │   │   └── index.tsx
│       │   │   ├── BooksPage
│       │   │   │   └── index.tsx
│       │   │   ├── MainPage
│       │   │   │   └── index.tsx
│       │   │   └── SignInPage
│       │   │       └── index.tsx
│       │   ├── services
│       │   │   ├── auth-service.ts
│       │   │   └── books-service.ts
│       │   ├── types
│       │   │   ├── admin-book.ts
│       │   │   ├── book.ts
│       │   │   ├── component-with-children.ts
│       │   │   ├── form-object.ts
│       │   │   ├── link-item.ts
│       │   │   └── single-book.ts
│       │   └── vite-env.d.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── vite.config.ts
│       └── yarn.lock
├── database.env
├── database-prototype.dbml
├── docker-compose.yml
├── package.json
├── README.md
└── shpp-nodejs-3.2.code-workspace
```

## Usage

### After run docker-compose(with default .env parameters):

- frontend can be open at [http://localhost:5173](http://localhost:5173)
- backend can be open at [http://localhost:3000](http://localhost:3000)
- adminer can be open at [http://localhost:8081](http://localhost:8081)

### Recommended Code Editor - [VSCode](https://code.visualstudio.com/)

To open project use VSCode

- Open VSCode
- File > Open workspace from file > open folder with project > shpp-nodejs-3.2.code-workspace

## Stack technology

### Backend:

- [NodeJS](https://nodejs.org/en) — A progressive Node.js framework for building scalable and modular server applications.
- [Multer](https://www.npmjs.com/package/multer) — Middleware for handling file uploads.
- [Node-Postgres](https://www.npmjs.com/package/pg) — Controlling database

### Frontend:

- [React](https://react.dev/) — Declarative UI library for building interactive user interfaces.
- [React Router](https://reactrouter.com/) — Client-side routing solution.
- [Redux Toolkit](https://redux-toolkit.js.org/) — Standard approach for efficient Redux development.
- [React Redux](https://react-redux.js.org/) — Official React bindings for Redux.
- [TanStack Query (React Query) ](https://tanstack.com/query/latest) — Powerful data-fetching and caching solution.
- [Axios](https://axios-http.com) — Promise-based HTTP client for APIs.
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework for rapid UI development.

### Database:

- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database

### Adminer:

- [Adminer](https://www.adminer.org/en/) - GUI Database managment
