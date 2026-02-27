# 📄 Automação de Geração do Diário Oficial (HTML → PDF)

Este projeto realiza a **automação completa do processamento do HTML do
Diário Oficial**, aplicando ajustes estruturais, inserindo cabeçalhos,
sumário automático, padronização de estilos e geração final do PDF
utilizando PrinceXML.

------------------------------------------------------------------------

## 🚀 Fluxo Geral da Automação

A automação é composta por múltiplos scripts Node.js executados em
sequência.

### 🔹 Etapas do Processo

  ---------------------------------------------------------------------------
  Etapa                 Script                       Função
  --------------------- ---------------------------- ------------------------
  1                     `1 - FormataDoc.js`          Formata o HTML usando
                                                     js-beautify

  2                     `2 - idh2gestao.js`          Adiciona ID na seção
                                                     "Secretaria Municipal de
                                                     Gestão"

  3                     `3 - CabAtosdoExcutivo.js`   Substitui cabeçalho
                                                     principal

  3.1                   `3.1 - Rodape.js`            Ajusta rodapé

  3.1.1                 `3.1.1 - rodapeExtra.js`     Ajusta rodapé edição
                                                     extra

  3.2                   `3.2 CabExtra.js`            Ajusta cabeçalho edição
                                                     extra

  4                     `4 - CabaSumario.js`         Insere estrutura HTML do
                                                     Sumário

  5                     `5 - CabatosAtosdaCMSP.js`   Ajusta bloco "Atos da
                                                     CMSP"

  6                     `6 - RemoveStyle.js`         Remove estilos inline e
                                                     atualiza data

  7                     `7 - AjustarTabelas.js`      Ajusta blocos com
                                                     tabelas

  8                     `8 - FazSumario.js`          Gera sumário automático
                                                     com links

  9                     PrinceXML                    Geração do PDF

  10                    `10 - TrocaCapa.js`          (Opcional) Troca capa do
                                                     PDF

  11                    `11 - AtualizarCss.js`       Atualiza CSS com edição
                                                     e data

  12                    `12 - InserirCalhau.js`      (Opcional) Ajustes
                                                     finais

  Final                 `java -jar`                  Pós-processamento do PDF
  ---------------------------------------------------------------------------

------------------------------------------------------------------------

## 🧱 Pré-requisitos

-   Node.js instalado
-   Java instalado
-   PrinceXML 16.1 instalado em:

```{=html}
<!-- -->
```
    C:\Users\x583082\Desktop\ROTINA DIARIO\rotina\9 - prince-16.1-win64\prince-16.1-win64\bin\prince.exe

------------------------------------------------------------------------

## 📌 Execução do Prince (Etapa 9)

Exemplo de execução:

    "C:\Users\x583082\Desktop\ROTINA DIARIO\rotina\9 - prince-16.1-win64\prince-16.1-win64\bin\prince.exe" diario.html -o diario.pdf

------------------------------------------------------------------------

## 🔹 Execução Final (Pós-processamento Java)

Após geração do PDF:

    java -jar "nome-do-arquivo.jar" pdf pdf

------------------------------------------------------------------------

## 📂 Estrutura Recomendada do Projeto

    /rotina
     ├── diario.html
     ├── style.css
     ├── imagens_random/
     ├── 1 - FormataDoc.js
     ├── 2 - idh2gestao.js
     ├── ...
     ├── 12 - InserirCalhau.js

------------------------------------------------------------------------

## 🛠 Tecnologias Utilizadas

-   Node.js
-   jsdom
-   glob
-   pdf-lib
-   PrinceXML
-   Java

------------------------------------------------------------------------

## 📌 Observações

-   Os scripts 10 e 12 são opcionais.
-   O fluxo principal termina na geração do PDF pelo Prince.
-   O comando Java é utilizado como etapa final adicional.

------------------------------------------------------------------------

## 👨‍💻 Autor

Gustavo Freire de Oliveira Borges
