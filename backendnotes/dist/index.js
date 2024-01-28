"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Working!");
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
app.get("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield prisma.note.findMany();
    res.json(notes);
}));
app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const users = yield prisma.user.findUnique({
            where: { id },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).send("error: " + error);
    }
}));
// okiee haw khulsu , baad fe bs nusul frontend aal backend
app.get("/notes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const users = yield prisma.note.findUnique({
            where: { id },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).send("error: " + error);
    }
}));
app.get("/users/:id/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const users = yield prisma.note.findMany({
            where: { userId: id },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).send("error: " + error);
    }
}));
// !whenever you add or delete an attribute bl prisma schemayou do the same bl requests
app.post("/users/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // console.log(name, email)
    const user = yield prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
    // console.log(user);
    res.json(user);
}));
app.post("/notes/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, priority, category, userId } = req.body;
    const dueDate = new Date("2024-01-31T12:00:00Z").toISOString();
    const note = yield prisma.note.create({
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
}));
app.put("/notes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, priority, userId } = req.body;
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        return res.status(400).send("ID must be a valid number");
    }
    if (!title || !content) {
        return res.status(400).send("title and content fields required");
    }
    try {
        const updatedNote = yield prisma.note.update({
            where: { id },
            data: { title, content, priority, userId },
        });
        res.json(updatedNote);
    }
    catch (error) {
        res.status(500).send("error: " + error);
    }
}));
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        return res.status(400).send("ID must be a valid number");
    }
    try {
        const updatedUser = yield prisma.user.update({
            where: { id },
            data: { name, email },
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).send("error: " + error);
    }
}));
app.delete("/notes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        return res.status(400).send("ID field required");
    }
    try {
        yield prisma.note.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send("error: " + error);
    }
}));
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        return res.status(400).send("ID field required");
    }
    try {
        yield prisma.user.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send("error: " + error);
    }
}));
app.listen(PORT, () => {
    console.log("running on PORT");
});
