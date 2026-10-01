import { useState } from 'react';

export function useCarrinho(produtos) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarAoCarrinho(idProduto, quantidade) {
    const produto = produtos.find(item => item.id === idProduto);

    if (!produto) return;

    setCarrinho(carrinhoAtual => {
      const itemExistente = carrinhoAtual.find(item => item.id === idProduto);

      if (itemExistente) {
        return carrinhoAtual.map(item => item.id === idProduto
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item,
        );
      }

      return [
        ...carrinhoAtual,
        {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade,
        },
      ];
    });
  }

  // tira um item do carrinho pelo id
  function removerDoCarrinho(idProduto) {
    setCarrinho(carrinhoAtual => carrinhoAtual.filter(item => item.id !== idProduto));
  }

  // soma das quantidades (número que aparece no botão do carrinho)
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  // soma dos valores (preço x quantidade)
  const totalValor = carrinho.reduce((soma, item) => soma + Number(item.preco) * item.quantidade, 0);

  return { carrinho, adicionarAoCarrinho, removerDoCarrinho, totalItens, totalValor };
}
