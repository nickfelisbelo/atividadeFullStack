let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let apiUrl = "http://localhost:3000/professores";

async function autentificar() {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    if (!senha || !email) { return window.alert("Preencha os Dados") }
    try {
        const resposta = await fetch(`${API}/listar`);
        
        const professores = resposta.json();

        const professor = professores.find(p =>
            p.email === email &&
            p.senha === senha
        );

        if (professor) {
            alert("Login realizado com sucesso!");

            localStorage.setItem(
                "professorLogado",
                JSON.stringify(professor)
            );

            window.location.href = "../home/index.html";
        } else {
            window.alert("Email ou senha incorretos!");
        }

    } catch (err) {
        console.error(err);
        alert("Erro ao conectar com a API.");
    }
}