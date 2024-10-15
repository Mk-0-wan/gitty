# Development Branch
---
Welcome to the development branch of the Gitty app. This branch will house the latest feature developments, ideas, and improvements to the Gitty app. Please note that this branch may contain incomplete or experimental features.

The goal here is to:
- Document new ideas and technology choices.
- Test new features before merging into the main branch.
- Iterate on app improvements for both the frontend and backend.

## Frontend

- **React**: A popular JavaScript library for building user interfaces, chosen for its flexibility and strong ecosystem.
- **Vite**: A build tool that provides faster development by using modern browsers' native ES modules.
- **JavaScript**: The primary language for the frontend to maintain simplicity and flexibility.

## Backend

- **Fastify**: A fast and low-overhead web framework for Node.js, chosen for its speed and built-in schema validation.
- **fastify-passport**: Used for authentication to integrate GitHub OAuth easily.
- **fastify-mongodb**: MongoDB integration for managing app data and storing repository information.
- **fastify-secure-session**: A session management plugin to handle secure user sessions efficiently.

## Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/gitty.git
    cd gitty
    git checkout development
    ```

2. **Install Dependencies**:
    - Frontend:
      ```bash
      cd frontend
      npm install
      npm run dev
      ```
    - Backend:
      ```bash
      cd backend
      npm install
      npm run start
      ```

3. **Environment Variables**:
    Ensure you have the required environment variables set up for both the frontend and backend, especially for GitHub OAuth integration and MongoDB.

4. **Run the App**:
    Start both the frontend and backend servers locally to test the development build.

## Roadmap
- [ ] Implement GitHub OAuth with `fastify-passport`.
- [ ] Integrate MongoDB for persistent data storage.
- [ ] Add a dashboard to visualize repository insights.
- [ ] Implement automated tests for backend routes.

## Branch Strategy
- The `development` branch is where new features and improvements are tested.
- Once features are stable, they are merged into the `gitty` branch for release.
