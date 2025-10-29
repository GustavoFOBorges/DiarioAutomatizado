const fs = require("fs");
const { JSDOM } = require("jsdom");
const path = require("path");

const inputFile = path.resolve("./diario.html");        // HTML original
const outputFile = path.resolve("./diario_modificado.html"); // HTML final

// Lê o HTML
const html = fs.readFileSync(inputFile, "utf-8");
const dom = new JSDOM(html);
const document = dom.window.document;

// =====================
// Remover estilos e colocar como comentário
// =====================
function removerEstiloComoComentario(seletor) {
  document.querySelectorAll(seletor).forEach((el) => {
    const styleValor = el.getAttribute("style");
    if (styleValor) {
      el.removeAttribute("style");
      const comentario = document.createComment(`style="${styleValor}"`);
      el.insertBefore(comentario, el.firstChild);
    }
  });
}

// Remove colgroups (substituindo por comentário)
document.querySelectorAll("colgroup").forEach((colgroup) => {
  const comentario = document.createComment(colgroup.outerHTML);
  colgroup.replaceWith(comentario);
});

// Remove estilos de tags específicas
const elementosComEstilo = [
  "img[style]",
  "th[style]",
  "td[style]",
  "p[style]",
  "div[style]",
  "ol[style]",
  "li[style], tr[style], span[style], table[style]",
];
elementosComEstilo.forEach((seletor) => removerEstiloComoComentario(seletor));

// =====================
// Atualizar data
// =====================
function atualizarData() {
  const data = new Date();
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const diaSemana = diasSemana[data.getDay()];
  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();
  const el = document.getElementById("dataAtual");
  const el2 = document.getElementById("dataAtual2");
  if (el)
    el.textContent = `São Paulo, ${diaSemana}, ${dia} de ${mes} de ${ano}`;
  if (el2)
    el2.textContent = `São Paulo, ${diaSemana}, ${dia} de ${mes} de ${ano}`;
}

atualizarData();

// =====================
// Salvar HTML modificado
// =====================
fs.writeFileSync(outputFile, dom.serialize());
console.log("HTML modificado salvo em:", outputFile);
