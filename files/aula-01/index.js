let meta = {
  value: "Ler um livro por mês",
  checked: false,
};

let metas = [
  meta,
  {
    value: "Caminhar 20 minutos/dia",
    checked: false,
  },
];

console.log(metas);
console.log(metas[0]);
console.log(metas[0].value);

for (meta of metas) {
  console.log(meta.checked);
}
