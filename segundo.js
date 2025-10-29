const fs = require("fs");
const { JSDOM } = require("jsdom");
const path = require("path");

const inputFile = path.resolve("./diario_modificado.html");  // HTML original
const outputFile = path.resolve("./diario_sumario.html"); // HTML com sumário

// Lê o HTML
const html = fs.readFileSync(inputFile, "utf-8");
const dom = new JSDOM(html);
const document = dom.window.document;

// Encontra o container do sumário
let sumario = document.getElementById("sumario");
if (!sumario) {
    sumario = document.createElement("ul");
    sumario.id = "sumario";
    document.body.insertBefore(sumario, document.body.firstChild);
}

// Seleciona todos os h1 e h2
const headings = document.querySelectorAll("h1, h2");

// Limpa sumário
sumario.innerHTML = "";

// Variáveis para agrupar h2 dentro do último h1
let currentH1Li = null;

headings.forEach((h, i) => {
    const id = h.id || `sec-${i}`;
    h.id = id;

    const li = document.createElement("li");
    li.className = h.tagName.toLowerCase();

    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = h.textContent;

    li.appendChild(a);

    if (h.tagName.toLowerCase() === "h1") {
        // Novo h1 → adiciona direto no sumário
        sumario.appendChild(li);
        currentH1Li = li; // guarda referência para adicionar h2
    } else if (h.tagName.toLowerCase() === "h2") {
        // h2 → adiciona dentro do último h1
        if (currentH1Li) {
            let ulH2 = currentH1Li.querySelector("ul");
            if (!ulH2) {
                ulH2 = document.createElement("ul");
                currentH1Li.appendChild(ulH2);
            }
            ulH2.appendChild(li);
        } else {
            // Se não houver h1 antes, adiciona no nível raiz
            sumario.appendChild(li);
        }
    }
});

console.log(`Sumário gerado com ${headings.length} itens.`);
fs.writeFileSync(outputFile, dom.serialize());
console.log(`HTML com sumário salvo em: ${outputFile}`);
