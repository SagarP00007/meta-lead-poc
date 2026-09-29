# Meta Lead Ads + React Native PoC

A Proof of Concept that automatically displays Meta Lead Ads test leads in an already-open React Native application.

## Overview

This project demonstrates the flow of receiving leads from a Meta Lead Form and displaying them automatically in a React Native application.

The PoC consists of:

* **Meta Lead Testing Tool** — used to create test leads
* **Meta Graph API** — provides the submitted lead data
* **Node.js + Express Backend** — fetches and temporarily stores leads
* **React Native + Expo App** — displays the leads automatically

## Architecture

Meta Lead Testing Tool
        ↓
Meta Lead Form
        ↓
Meta Graph API
        ↓
Node.js Backend
        ↓
GET /leads
        ↓
React Native App

The backend polls Meta's Graph API every **5 seconds** to check for the latest leads.
The React Native application also polls the backend every **5 seconds** and updates the screen when new lead data is received.

## Features

* Fetches leads from a Meta Lead Form
* Displays lead name, email, phone number, and ID
* Automatically checks for new leads
* No manual refresh required on the mobile application
* Simple Node.js REST API
* React Native Expo frontend
* Environment variables used for sensitive Meta credentials

## Backend

The backend is implemented using Node.js and Express.

### Main responsibilities

* Connect to Meta's Graph API using Axios
* Fetch leads from the configured Meta Lead Form
* Temporarily store the retrieved leads in memory
* Provide leads through the `/leads` endpoint
* Poll Meta every 5 seconds

### API Endpoint

GET /leads

This endpoint returns the currently fetched lead data to the React Native application.

## Mobile Application

The mobile application is built using React Native with Expo.

The main screen is:

mobile/src/app/index.tsx

The application:

1. Requests lead data from the backend.
2. Stores the response in React state.
3. Checks the backend every 5 seconds.
4. Automatically updates the screen when new data is received.
5. Displays the lead's name, email, phone number, and ID.

## Setup

### 1. Clone the repository

git clone https://github.com/SagarP00007/meta-lead-poc.git
cd meta-lead-poc

### 2. Install backend dependencies

npm install

### 3. Configure environment variables

Create a .env file in the project root:

META_PAGE_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN


The .env file is excluded from Git using .gitignore.

### 4. Start the backend

node app.js

The backend runs on:

http://localhost:3000

### 5. Run the React Native application

Move into the mobile directory:

cd mobile
Install dependencies if required:

npm install

Start Expo:

npx expo start
For a physical device, the backend URL in the React Native application should point to the computer's local network IP address running the Node.js server.

## Testing the PoC

1. Start the Node.js backend.
2. Start the React Native application.
3. Open the leads screen and keep it visible.
4. Open Meta's Lead Testing Tool.
5. Select the configured Page and Lead Form.
6. Create and submit a test lead.
7. Wait for the polling cycle.
8. The new lead automatically appears in the already-open React Native application.

No manual refresh or interaction with the mobile application is required.

## Implementation Note

A webhook-based architecture was explored for receiving Meta lead events directly
However, during testing, the required pages_manage_metadata permission was not available for this application. Therefore, the final PoC uses **Graph API polling** instead of the webhook-based approach.
The backend polls Meta every 5 seconds, and the React Native application polls the backend every 5 seconds.
This implementation is intended as a PoC and uses **in-memory storage** rather than a persistent database.

## Security

Sensitive Meta configuration is stored in the `.env` file.
The .env file is included in .gitignore and is **not committed to the repository**.
Never commit the Meta Page Access Token to the repository.

## Technologies Used

### Backend

* Node.js
* Express
* Axios
* dotenv
* CORS
* Meta Graph API

### Frontend

* React Native
* Expo
* TypeScript

## Repository

GitHub:

https://github.com/SagarP00007/meta-lead-poc
