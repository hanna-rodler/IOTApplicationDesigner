# IoT Configurator

## Project Overview

This project integrates a React frontend with an Express backend. The React application functions as the client-side, offering the user interface, while the Express application acts as the server-side, managing API requests and other backend operations.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Download the project or clone the repository.

2. Navigate to the `IOTApplicationDesigner` folder.

3. Open a terminal and execute the following command:

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

4. Additionally navigate to the backend and install the node modules there too:

   ```sh
   cd backend
   ```

   and

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

### Environment Variables

All necessary environment variables are located in the `.env` file and can be modified there. Put the `.env` file on the root level of the project.

### API Endpoints

The API endpoints are defined in the `src/services/api.ts` file. Below is a brief description of the implemented endpoints:

- `GET /api/project`: Retrieves all projects from the `projects` database collection.
- `POST /api/project`: Creates a new project and saves it in the `projects` database collection.
- `GET /api/project/{projectId}`: Retrieves the project with the specified ID from the database.
- `DELETE /api/project/{projectId}`: Deletes the project with the specified ID from the database.
- `POST /api/project/{projectId}/{subcollection}`: Adds the request data to the specified subcollection of the project.
- `GET /api/project/{projectId}/{subcollection}`: Retrieves data from the specified subcollection of the project.
- `UPDATE /api/project/{projectId}/{subcollection}`: Updates the specified subcollection of the project with the request data.
- `PUT /api/project/{projectId}/name/update`: Updates the name of the project.
- `PUT /api/project/{projectId}/screenshot/update`: Updates the project's screenshot used in the project browser.
- `GET /api/export/{projectId}`: Generates a JSON file from the specified project.

## Start the Application

1. Run the following command to start the frontend:

   ```sh
   npm run dev
   ```

   ```sh
   yarn dev
   ```

2. Open a second terminal to start the backend and run:

   ```sh
   npm run start:server
   ```

   ```sh
   yarn start:server
   ```
