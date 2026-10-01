import "../styles/ModalCarrinho.css";

export default function ModalCarrinho({ itens, total, aoFechar, aoRemover }) {
  function finalizarPedido() {
    aoFechar();
    // redirecionar para /checkout
  }

  return (
    <div className="carrinho_modal" onClick={aoFechar}>
      {/* o stopPropagation evita fechar quando clica dentro do carrinho */}
      <div className="carrinho_conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="btn_fechar" onClick={aoFechar}>X</button>
        <h2>Seu Pedido</h2>

        {/* se o numero de itens for 0 exibe a mensagem de carrinho vazio */}
        {itens.length === 0 ? (<div className="carrinho_vazio">Carrinho vazio.</div>)
        : (<ul>
            {itens.map((item) => (
              <li key={item.id}>
                <div className="item_info">
                  <strong>{item.nome}</strong>
                  <span>{item.quantidade} x R$ {Number(item.preco).toFixed(2)}</span>
                </div>
                <button className="btn_remover" onClick={() => aoRemover(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
        )}

        <div className="carrinho_total">
          <span>Total</span>
          <strong>R$ {total.toFixed(2)}</strong>
        </div>
        <button className="btn_finalizar" onClick={finalizarPedido}>Fechar pedido</button>
      </div>
    </div>
  );
}
