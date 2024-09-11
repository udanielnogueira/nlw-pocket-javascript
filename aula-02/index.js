const { select } = require("@inquirer/prompts"); // Usa somente o select do prompts

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
        console.log("Vamos cadastrar");
        break;
      case "listar":
        console.log("Vamos listar");
        break;
      case "sair":
        console.log("Até a próxima");
        return;
    }
  }
};

start();
