import express, {  } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Working!");
});

app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/notes", async (_req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const users = await prisma.user.findUnique({
      where: { id },
    });
    res.json(users);
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});
// okiee haw khulsu , baad fe bs nusul frontend aal backend
app.get("/notes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const users = await prisma.note.findUnique({
      where: { id },
    });
    res.json(users);
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});

app.get("/users/:id/notes", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const users = await prisma.note.findMany({
      where: { userId: id },
    });
    res.json(users);
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});

// !whenever you add or delete an attribute bl prisma schemayou do the same bl requests

app.post("/users/create", async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name, email)
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  // console.log(user);
  res.json(user);
});

app.post("/notes/create", async (req, res) => {
  const { title, content, priority, category, userId } = req.body;
  const dueDate = new Date("2024-01-31T12:00:00Z").toISOString();

  const note = await prisma.note.create({
    data: {
      title: title,
      content: content,
      priority: priority,
      dueDate: dueDate,
      category: category,
      userId: userId,
    },
  });
  // console.log(note);
  res.json(note);
});

app.put("/notes/:id", async (req, res) => {
  const { title, content, priority, userId } = req.body;
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be a valid number");
  }

  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content, priority, userId },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});

app.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be a valid number");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});

app.delete("/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID field required");
  }

  try {
    await prisma.note.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID field required");
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});

app.listen(PORT, () => {
  console.log("running on PORT");
});
