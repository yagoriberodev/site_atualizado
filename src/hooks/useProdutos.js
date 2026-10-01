import { useEffect, useState } from 'react';
import { listarProdutos } from '../services/produtoService';

export function useProdutos(idLoja) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // O useEffect tem uma lista de dependências ([idLoja]): se idLoja mudar,
  // o efeito roda de novo para buscar os produtos da nova loja.
  useEffect(() => {
    async function buscarProdutos() {
      try {
        const products = await listarProdutos(idLoja);
        setProdutos(products);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarProdutos();
  }, [idLoja]);

  return { produtos, carregando, erro };
}
