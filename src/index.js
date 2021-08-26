const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(newRepository);

  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;
  const { repository } = request

  const repositoryIndex = repositories.findIndex(r => r.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.url = url;
  repository.title = title;
  repository.techs = techs;
 

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;  
  const { repository } = request
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }
 
  repository.likes = repository.likes + 1;
  return response.json(repository.likes);
});

module.exports = app;
