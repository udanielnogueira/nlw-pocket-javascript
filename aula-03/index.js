const { select, input, checkbox } = require("@inquirer/prompts"); // Usa somente o select do prompts

let meta = {
  value: "Tomar 2l de água por dia",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia");
    return;
  }

  metas.push({ value: meta, checked: false });
}; // Toda função async tem um await

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as SETAS para mudar de meta, o ESPAÇO para marcar ou desmarcar e o ENTER para finalizar a etapa",
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada");
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  console.log("Metas marcadas como concluídas");
};

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    console.log("Não existem metas realizadas 🙁");
    return;
  }

  await select({
    message: "Metas realizadas" + abertas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true;
  });

  if (abertas == 0) {
    console.log("Não existem metas abertas 😁");
    return;
  }

  await select({
    message: "Metas abertas" + abertas.length,
    choices: [...abertas],
  });
};

const start = async () => {
  while (true) {
    // Variável opção recebe o valor selecionado
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    }); // Espera para o usuário selecionar

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "listar":
        await listarMetas();
        console.log(metas);
        break;
      case "realizadas":
        await metasRealizadas();
        break;
      case "abertas":
        await metasAbertas();
        break;
      case "sair":
        console.log("Até a próxima 👋");
        return;
    }
  }
};

start();
