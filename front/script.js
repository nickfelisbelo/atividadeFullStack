const API = "http://localhost:3000";

async function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch(`${API}/professores/listar`);
        const professores = await resposta.json();

        const professor = professores.find(
            p => p.email === email && p.senha === senha
        );

        if (professor) {

            localStorage.setItem("professorId", professor.id);
            localStorage.setItem("professorNome", professor.nome);

            window.location.href = "professores.html";

        } else {

            alert("Email ou senha inválidos.");

        }

    } catch (erro) {

        console.error(erro);
        alert("Erro ao conectar ao servidor.");

    }

}

async function listarTurmas() {

    const tabela = document.getElementById("listaTurmas");

    if (!tabela) return;

    tabela.innerHTML = "";

    const professorId = Number(
        localStorage.getItem("professorId")
    );

    const resposta = await fetch(`${API}/turmas/listar`);
    const turmas = await resposta.json();

    turmas
        .filter(t => t.professorId === professorId)
        .forEach(turma => {

            tabela.innerHTML += `
                <tr>
                    <td>${turma.id}</td>
                    <td>${turma.serie}</td>
                    <td>${turma.materia}</td>
                    <td>
                        <button onclick="visualizar(${turma.id})">
                            Visualizar
                        </button>

                        <button onclick="excluirTurma(${turma.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;

        });

}
async function cadastrarTurma() {

    const serie = document.getElementById("nomeTurma").value.trim();
    const materia = document.getElementById("materia").value.trim();

    const professorId = Number(
        localStorage.getItem("professorId")
    );

    if (!serie || !materia) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        const resposta = await fetch(`${API}/turmas/cadastrar`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                serie,
                materia,
                professorId
            })

        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar turma");
        }

        alert("Turma cadastrada com sucesso!");

        window.location.href = "professores.html";

    } catch (erro) {

        console.error(erro);
        alert("Erro ao cadastrar turma.");

    }

}

async function excluirTurma(id) {

    if (confirm("Deseja excluir esta turma?")) {

        await fetch(`${API}/turmas/excluir/${id}`, {
            method: "DELETE"
        });

        listarTurmas();

    }

}

function visualizar(id) {

    localStorage.setItem("turmaId", id);

    window.location.href = "atividades.html";

}

async function listarAtividades() {

    const tabela = document.getElementById("listaAtividades");

    if (!tabela) return;

    tabela.innerHTML = "";

    const turmaId = Number(
        localStorage.getItem("turmaId")
    );

    const resposta = await fetch(`${API}/atividades/listar`);
    const atividades = await resposta.json();

    atividades
        .filter(a => a.idTurma === turmaId)
        .forEach(atividade => {

            tabela.innerHTML += `
                <tr>
                    <td>${atividade.id}</td>
                    <td>${atividade.descricao}</td>
                    <td>
                        <button onclick="excluirAtividade(${atividade.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;

        });

}

async function cadastrarAtividade() {

    const descricao =
        document.getElementById("descricao").value;

    const turmaId = Number(
        localStorage.getItem("turmaId")
    );

    if (!descricao) {

        alert("Digite a descrição.");
        return;

    }

    await fetch(`${API}/atividades/cadastrar`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            descricao,
            idTurma: turmaId
        })

    });

    alert("Atividade cadastrada.");

    window.location.href = "atividades.html";

}

async function excluirAtividade(id) {

    if (confirm("Deseja excluir esta atividade?")) {

        await fetch(`${API}/atividades/excluir/${id}`, {
            method: "DELETE"
        });

        listarAtividades();

    }

}

function logout() {

    localStorage.clear();

    window.location.href = "index.html";

}

window.onload = () => {

    listarTurmas();
    listarAtividades();

};