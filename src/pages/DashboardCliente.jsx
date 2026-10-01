import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function DashboardCliente() {
  return (
    <>
      <header className="topo">
        <h1>Delivery</h1>
        <nav>
          <Link to="/home">Ver produtos</Link>
          <Link to="/">Sair</Link>
        </nav>
      </header>

      <main className="dashboard">
        <h2>Dashboard Cliente</h2>
        <p>Você entrou como cliente.</p>
      </main>
    </>
  );
}
