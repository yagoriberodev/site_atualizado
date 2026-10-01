import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProdutos } from '../hooks/useProdutos';
import { useCarrinho } from '../hooks/useCarrinho';
import ModalCarrinho from './Carrinho';
import '../styles/Home.css';

// imagem cinza usada se a images.jpg não for encontrada
const SEM_IMAGEM =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280">' +
      '<rect width="100%" height="100%" fill="#e5e5e5"/>' +
      '<text x="50%" y="50%" fill="#999" font-family="Arial" font-size="22" text-anchor="middle">Sem imagem</text>' +
      '</svg>'
  );

export default function Home() {
  // id da loja que será listada (troque pelo id da sua loja)
  const idLoja = 1;

  const { produtos, carregando, erro } = useProdutos(idLoja);
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, totalItens, totalValor } = useCarrinho(produtos);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <>
      <header className="topo">
        <h1>Delivery</h1>
        <nav>
          <Link to="/">Sair</Link>
          <button className="btn_carrinho" onClick={() => setCarrinhoAberto(true)}>
            Carrinho
            <span className="badge">{totalItens}</span>
          </button>
        </nav>
      </header>

      <main className="home">
        <h2>Produtos</h2>

        {carregando && <p>Carregando produtos...</p>}
        {erro && <p className="home__erro">{erro}</p>}
        {!carregando && !erro && produtos.length === 0 && <p>Nenhum produto encontrado.</p>}

        <div className="home__produtos">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto">
              <img
                src={produto.imagem}
                alt={produto.nome}
                onError={(e) => { e.target.onerror = null; e.target.src = SEM_IMAGEM; }}
              />
              <h3>{produto.nome}</h3>
              <p className="produto__preco">R$ {Number(produto.preco).toFixed(2)}</p>
              <button className="btn_adicionar" onClick={() => adicionarAoCarrinho(produto.id, 1)}>
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </main>

      {carrinhoAberto && (
        <ModalCarrinho
          itens={carrinho}
          total={totalValor}
          aoFechar={() => setCarrinhoAberto(false)}
          aoRemover={removerDoCarrinho}
        />
      )}
    </>
  );
}
