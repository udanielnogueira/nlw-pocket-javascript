const { select, input, checkbox } = require("@inquirer/prompts"); // Usa somente o select do prompts

let mensagem = "Bem-vindo ao App de Metas";

let meta = {
  value: "Tomar 2l de água por dia",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });

  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia";
    return;
  }

  metas.push({ value: meta, checked: false });

  mensagem = "Meta cadastrada com sucesso";
}; // Toda função async tem um await

const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas cadastradas";
    return;
  }

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
    mensagem = "Nenhuma meta marcada como concluída";
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  mensagem = "Meta(s) marcada(s) como concluída(s)";
};

const metasRealizadas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas cadastradas";
    return;
  }

  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas 🙁";
    return;
  }

  await select({
    message: "Meta(s) realizada(s): " + realizadas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas cadastradas";
    return;
  }

  const abertas = metas.filter((meta) => {
    return meta.checked != true;
  });

  if (abertas == 0) {
    mensagem = "Não existem metas abertas 😁";
    return;
  }

  await select({
    message: "Meta(s) aberta(s): " + abertas.length,
    choices: [...abertas],
  });
};

const deletarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas cadastradas";
    return;
  }

  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });

  const itensADeletar = await checkbox({
    message: "Selecione item para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itensADeletar.length == 0) {
    mensagem = "Nenhuma meta foi deletada";
    return;
  }

  itensADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });

  mensagem = "Meta(s) deletada(s) com sucesso";
};

const mostrarMensagem = () => {
  console.clear();

  if (mensagem != "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const start = async () => {
  while (true) {
    mostrarMensagem();

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
          name: "Deletar metas",
          value: "deletar",
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
      case "deletar":
        await deletarMetas();
        break;
      case "sair":
        console.log("Até a próxima 👋");
        return;
    }
  }
};

start();
