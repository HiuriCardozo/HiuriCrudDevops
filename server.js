```javascript
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Mostra apenas uma mensagem para confirmar leitura do .env
// (não expõe a senha do MongoDB nos logs)
console.log("Configuração do MongoDB carregada");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch(err => console.log(err));

const Aluno = mongoose.model("Aluno", {
    nome: String,
    idade: Number,
    curso: String
});

app.get("/alunos", async (req, res) => {
    const alunos = await Aluno.find();
    res.json(alunos);
});

app.post("/alunos", async (req, res) => {
    const aluno = await Aluno.create(req.body);
    res.json(aluno);
});

app.put("/alunos/:id", async (req, res) => {
    const aluno = await Aluno.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(aluno);
});

app.delete("/alunos/:id", async (req, res) => {
    await Aluno.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Aluno removido" });
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
```
