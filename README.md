# Home Library Service

## Setup

- Clone this repo: $ git clone https://github.com/OlgaSavitsk/nodejs2024Q1-service.git
- Go to downloaded folder: $ cd nodejs2024Q1-service
- Go to branch: $ git checkout feature/docker-orm
- Install dependencies: $ npm install
- Change name file .env.example to .env.
- development mode: $ npm run start:dev
- production mode: $ npm run start:prod


## Create and start containers

- Install [Docker](https://docs.docker.com/engine/install/)

### Running application:

```
npm run docker
```

### Vulnerabilities scanning:

```
npm run docker:scan
```

### Testing on Docker:

```
npm run docker:test
```
