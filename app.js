const app = document.getElementById("app");

const pages = {
    "/": () => `
    <section class="card">
    <h2>Início</h2>
    <p>Isso é uma SPA: Navegação sem carregar a página.</p>
    <p>Use o menu para trocar de página</p>
    `,
    "/alunos": () => {
        const alunos = ["Ana", "Bruno", "Carlos", "Diana"];
        return `
        <section class="card">
        <h2>Alunos</h2>
        <ul>
            ${alunos.map((a) => `<li> ${a} </li>`).join("")}
        </ul>
        </section>
        `;
    },
    "/sobre": () => `
    <section class="card">
    <h2>Sobre</h2>
    <p>Exemplo simples de roteamento no front-end (sem framework).</p>
    <p>Próximo passo: carregar via fetch e criar componentes.</p>
    </section>
    `,
    "/cursos": () => {
        const cursos = ["Administração", "Desenvolvimento de Sistemas", "Logística", "Enfermagem"];
        return `
        <section class="card">
        <h2>Cursos</h2>
        <ul>
            ${cursos.map((c) => `<li> ${c} </li>`).join("")}
        </ul>
        </section>
        `;
    },
    "/professores": () => {
        const professores = ["Mauricio", "Diego", "Andrei", "Enfermagem"];
        return `
        <section class="card">
        <h2>Professores</h2>
        <ul>
            ${professores.map((p) => `<li> ${p} </li>`).join("")}
        </ul>
        </section>
        `;
    },
};

function setActiveLink(path) {
    document.querySelectorAll("a[data-link]").forEach((a) => {
        const isActive = a.getAttribute("href") === path;
        a.classList.toggle("active", isActive)
        });
}

function render() {
    const path = window.location.pathname;
    const page = pages[path] ?? (() =>`
    <section class="card">
    <h2>Erro 404</h2>
    <p>Rota não encontrada:<code>${path} </code></p>
    <p><a href="/" data-link>Voltar ao Início</a></p>
    </section>
    `);

    app.innerHTML = page();
    setActiveLink(path);
}

function navigateTo(url) {
    history.pushState(null, "", url);
    render();
}

//intercepta cliques nos links do menu
document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]")

    if (!a)
        return;
    e.preventDefault();

    navigateTo(a.getAttribute("href"));
});

//Voltar ou Avançar do navegador
window.addEventListener("popstate", render);

//primeira renderização
render();