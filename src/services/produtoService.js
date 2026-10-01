const urlApi = import.meta.env.VITE_API_URL; // base da API

// escolhe a imagem pelo nome do produto (se não achar, usa a imagem padrão)
function escolherImagem(nome) {
  const texto = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (texto.includes("coca")) return "/coca-cola.png";
  if (texto.includes("marg")) return "/pizza-marguerita.png";
  if (texto.includes("calabresa")) return "/pizza-calabresa.png";
  return "/images.jpg"; // imagem padrão
}

export async function listarProdutos(id) {
  // busca produtos da loja passando o id da loja
  const resposta = await fetch(`${urlApi}/lojas/${id}/produtos`, {
    method: "GET", // leitura de dados
    headers: {
      "Content-Type": "application/json", // informa o tipo de dado
    },
  });

  const resultado = await resposta.json(); // converte resposta em objeto

  if (!resposta.ok) {
    throw new Error(resultado.error); // erro da API
  }

  // usa .map para transformar o array de produtos retornado pela API
  // em um novo array com os campos desejados.
  return resultado.data.map((produto) => ({
    id: produto.id_produto, // id do produto
    nome: produto.produto_nome, // nome
    preco: produto.produto_valor, // valor
    imagem: escolherImagem(produto.produto_nome), // imagem do produto
  }));
}
