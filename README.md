# Home Library Service

## Setup

- Clone this repo: $ git clone https://github.com/OlgaSavitsk/nodejs2024Q1-service.git
- Go to downloaded folder: $ cd nodejs2024Q1-service
- Go to branch: $ git checkout feature/service
- Install dependencies: $ npm install
- Change name file .env.example to .env.
- development mode: $ npm run start:dev
- production mode: $ npm run start:prod

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

After application running open new terminal and enter:

```
npm run test
```

## Usage

- Get Users / Get Albums / Get Tracks / Get Artists
  Returns json data.

  - URL
    /user
    /album
    /track
    /artist

  - Method
    GET

- Get User / Get Album / Get Track / Get Artist
  Returns json data about specified сharacteristics.

  - URL
    /user/:id
    /album/:id
    /track/:id
    /artist/:id

  - Method
    GET

- Create User / Create Album / Create Track / Create Artist / Create Favorites
  Creates a new сharacteristics

  - URL
    /user
    /album
    /track
    /artist
    /favs/track/:id
    /favs/album/:id
    /favs/artist/:id

  - Method
    POST

- Delete User / Delete Album / Delete Track / Delete Artist / Delete Favorites
  Delete specified user

  - URL
    /user/:id
    /album/:id
    /track/:id
    /artist/:id
    /favs/track/:id
    /favs/album/:id
    /favs/artist/:id

  - Method
    DELETE

- Update User / Update Album / Update Track / Update Artist
  Updates attributes of specified user

  - URL
    /user/:id
    /album/:id
    /track/:id
    /artist/:id

  - Method
    PUT
