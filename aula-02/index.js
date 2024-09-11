const { select, input } = require("@inquirer/prompts"); // Usa somente o select do prompts

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
          name: "Sair",
          value: "sair",
        },
      ],
    }); // Espera para o usuário selecionar

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        console.log(metas.reverse());
        break;
      case "listar":
        console.log(metas);
        break;
      case "sair":
        console.log("Até a próxima");
        return;
    }
  }
};

start();
