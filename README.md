# frontent-internship

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# My Vue.js Application

This is a Vue.js application that can be easily run within a Docker container.

## Prerequisites

Ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)

## Build and Run with Docker

1. Clone this repository:
   ```bash
   git clone https://github.com/krignalion/meduzzen-frontend.git
   cd meduzzen-frontend

2. docker build -t frontent-internship .

3. Run the Docker container:
    docker run -p 8080:8080 -d frontent-internship

4. The Vue.js application will now be running in a Docker container. Access it in your browser at http://localhost:8080

#Stopping the Container
1. To stop the Docker container, find the container ID using:
    docker ps
2. Then stop the container using:
    docker stop <container_id>

License
This project is licensed under the MIT License.
