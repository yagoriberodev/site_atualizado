import { useNavigate } from 'react-router-dom';
import { useUsuario } from '../hooks/useUsuario';
import '../styles/Login.css';

// escolhe para qual tela o usuário vai, de acordo com o tipo dele
function rotaDoUsuario(resultado) {
  const tipo = String(
    resultado?.data?.usuario_tipo ?? resultado?.usuario_tipo ?? resultado?.tipo ?? ''
  ).toLowerCase();

  if (tipo === 'admin') return '/dashboard/admin';
  if (tipo === 'cliente') return '/dashboard/cliente';
  if (tipo === 'loja') return '/dashboard/loja';
  return '/home';
}

export default function Login() {
  const navigate = useNavigate();
  const { email, senha, erro, carregando, setEmail, setSenha, entrar } = useUsuario();

  async function aoEnviar(evento) {
    evento.preventDefault();
    const resultado = await entrar();
    if (resultado) {
      navigate(rotaDoUsuario(resultado));
    }
  }

  return (
    <main className="login">
      <form className="login__form" onSubmit={aoEnviar}>
        <h1>Delivery</h1>

        {erro && <p className="login__erro">{erro}</p>}

        <div className="login_campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />
        </div>

        <div className="login_campo">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            required
          />
        </div>

        <button className="login__button" type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

      </form>
    </main>
  );
}
