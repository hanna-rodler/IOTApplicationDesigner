# IoT Configurator

## Project Overview

Node based Editor for MQTT IoT configuration. Made by Rodler Hanna, Kothbauer Tobias and Veronika Leitner as a semester project for Volker Christian. The application is able to import and export predefined MQTT .json files. For example screen shots see the folder "examples".

## Background
The increasing complexity of IoT scenarios demands a more efficient and userfriendly approach to configure application logic. This project aims to develop a
client-side graphical web application known as the IoT Configurator, designed to
simplify the configuration process for IoT scenarios. By utilizing a node-based editor, users are able to drag and drop topics as well as static, value, and JSON
Mappings onto a canvas and connect them via wires, eliminating the need to manually write long and complex JSON files by hand.

The generated JSON configurations conform to a specific JSON schema definition and can be directly imported into Volker Christian’s SNode.C Framework, a
lightweight and highly extensible MQTT-Integration System. This integration ensures that the application logic, written in JSON format, can be correctly mapped
by the MQTT integrator to enable communication between incoming and outgoing messages and topics within the IoT scenario. The IoT Configurator enhances
user experience, addressing the error-prone and laborious aspects of manual JSON
writing or editing.

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

4. Navigate to the backend and install the node modules there too:

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

2. Open a second terminal (and in the current or in the backend folder) run:

   ```sh
   npm run start:server
   ```

   ```sh
   yarn start:server
   ```
