<h1 align="center">Welcome to idea-to-process 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
  <a href="https://twitter.com/wkmaaj" target="_blank">
    <img alt="Twitter: wkmaaj" src="https://img.shields.io/twitter/follow/wkmaaj.svg?style=social" />
  </a>
</p>

> Avertra Idea to Process application for Solutions Architect role.

This application is built on Next.js 14, and utilizes a MongoDB datastore, and thus uses JavaScript throughout the entire stack. Being a proof-of-concept application, a decision was taken to use Ollama in order to self host and run the Llama LLM locally to avoid unnecessary account registration with some cloud providers and other potential headaches such as being charged. In addition this decision was seen to be developer friendly as there was no need to worry about exceeding limits or quotas. Another major reason for taking this decision initially was because there is a Docker image available of Ollama and thus there was an initial desire to containerize the Ollama service providing the ability to ship the application, database, and LLM all as Docker containers capable of being deployed together in a Kubernetes pod. However, it was discovered late that the Ollama Docker image was significantly slower (takes minutes to respond) than the locally installed version, and thus that goal was scrapped.

In later sections, commands are given on how to start the application, database, and LLM layers locally, but an overview of the application flow is given in the section below. Once the application is up and running:

- navigate to [Home](http://localhost:3000) where you will be met with an input prompt to enter the process requirement/idea that you would like to generate
- enter the requirement and hit submit, the requirement will be sent to the LLM to generate a series of questions to help gather additional context to the requirement
- once the LLM's response is received, the input prompt is replaced by a chat box in which the LLM's questions are rendered one at a time so the user can answer each
- once the LLM's questions have been answered the chat's input will be replaced with a submit button, this submit button will send the entire chat history along with a prompt to the LLM instructing it to generate a BPMN XML using all the input that has been provided by the user
- once the LLM's response is received a modal is opened for the user to review:
  - the diagram the LLM generated
  - the information the user entered
- at the bottom of the modal will be a save button which if the user clicks will persist all the information to MongoDB

In the side navigation there are two links, [Home](http://localhost:3000) and [History](http://localhost:3000/history), the [History](http://localhost:3000/history) page displays a table showing all the documents contained in the `ideas-to-process` collection in MongoDB. Additionally each row contains a view button which when clicked will open a modal that displays all that document's information.

Being a proof-of-concept application, `console.log` statements were intentionally left to help illustrate application logic flow.

## Install

### Application

To download and install the modules that the application is dependent on run the following command:

```sh
pnpm install

# alternatively, using npm
npm install
```

### Database

This application uses MongoDB as its database, to install it on your local machine you can either:

- Visit [Install MongoDB](https://www.mongodb.com/docs/manual/installation/) and choose the appropriate installer for your machine.
- If you have Docker and Docker-Compose installed then simply run the command below:
  - If you'd like to install Docker Desktop, visit [Overview of Docker Desktop](https://docs.docker.com/desktop/) and choose the appropriate installer for your machine.

```sh
docker-compose up -d
```

### LLM (Ollama)

To install Ollama on your local machine visit [here](https://ollama.com/download) and choose the appropriate installer for your machine.

Alternatively, if using Homebrew on a Mac you can install via the following command:

```sh
brew install ollama
```

## Usage

### Application

To run the application, after running the abovce `install` command, either of the commands below will suffice.
The difference between the two is one will run the application in development mode, while the other will build and run the application in production mode.

```sh
# development mode
pnpm dev

# alternatively, using npm
npm run dev

# production mode
pnpm build && pnpm start

# alternatively, using npm
npm run build && npm run start
```

### Database

```sh
docker start itpmongo

# to access the Mongo shell, run the following commands
docker exec -it itpmongo bash
mongosh -u admin -p pwd123!
```

### LLM (Ollama)

When running Ollama via Homebrew, use the following command to start the service:

```sh
brew services start ollama

# once the service is up and running run the following command to pull and run the Llama 3.1 LLM
ollama run llama3.1

# to stop the service
brew services stop ollama
```

## TODO

- Fine tune the prompt provided to the LLM to generate more complex BPMN XMLs.
- Add a regenerate button to display modal which would send a new request to the LLM.
- Clean up [Home](http://localhost:3000) page to reset when a user exits out of the modal.
- Add tests.
- Add pagination to [History](http://localhost:3000/history) table.

## Author

👤 **wkmaaj**

- Twitter: [@wkmaaj](https://twitter.com/wkmaaj)
- Github: [@wkmaaj](https://github.com/wkmaaj)
- LinkedIn: [@wkmaaj](https://linkedin.com/in/wkmaaj)

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
