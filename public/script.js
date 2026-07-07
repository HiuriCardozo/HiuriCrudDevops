async function listar() {
    const resposta = await fetch("/alunos");
    const alunos = await resposta.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    alunos.forEach(aluno => {
        lista.innerHTML += `
            <li>
                ${aluno.nome} - ${aluno.idade} anos - ${aluno.curso}

                <button onclick="editar('${aluno._id}')">
                    Editar
                </button>

                <button onclick="excluir('${aluno._id}')">
                    Excluir
                </button>
            </li>
        `;
    });
}

async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;

    await fetch("/alunos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            idade,
            curso
        })
    });

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("curso").value = "";

    listar();
}

async function excluir(id) {
    await fetch(`/alunos/${id}`, {
        method: "DELETE"
    });

    listar();
}

async function editar(id) {
    const nome = prompt("Novo nome:");
    const idade = prompt("Nova idade:");
    const curso = prompt("Novo curso:");

    if (!nome || !idade || !curso) return;

    await fetch(`/alunos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            idade,
            curso
        })
    });

    listar();
}

listar();