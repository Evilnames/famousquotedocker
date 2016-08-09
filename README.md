# Famous Quotes Demo

This is a simple demonstration of a Node.js container connecting to a Mongo container.

# Installation

With node.js installed and the project cloned to a local directory:

```bash
npm install
docker-compose build && docker-compose up
```

Then go to http://localhost:8080 in your browser.

Ctrl-C the docker compose process when done.

# Manual Start

```bash
./build
./start-mongo
./start-app
```

Then go to http://localhost:8080 in your browser.

```bash
./stop-mongo
./stop-app
```
