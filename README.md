# AAR Frontend

Install dependencies with `npm install`

Run development server with `npm start`

Build production assets with `npm run webpack`

## Server

Serve your prebuilt production assets using the small server

`node server.js`

To use your own AAR API set the environment variable `AAR_API_URL` before starting the server

`AAR_API_URL=https://api.aar.anrop.se`

## Docker

Prebuilt server image can be fetch from [Docker Hub](https://hub.docker.com/r/anrop/aar-frontend)

`docker run -p 8080:8080 anrop/aar-frontend`

You can change which port the server uses with the environment variable `PORT`

`docker run -e PORT=3000 -p 3000:3000 anrop/aar-frontend`

To use your own AAR API set the environment variable `AAR_API_URL` when starting your container

`docker run -e AAR_API_URL=https://api.aar.anrop.se -p 8080:8080 anrop/aar-frontend`
