import { useState } from 'react';

export default function Cotacao() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cotacoes, setCotacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarCotacoes = async () => {
    setLoading(true);

    const start = startDate.replace(/-/g, '');
    const end = endDate.replace(/-/g, '');

    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${start}&end_date=${end}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCotacoes(data);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Buscar Cotação USD/BRL</h1>

      <div>
        <label>Data Início:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>

      <div>
        <label>Data Fim:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>

      <button onClick={buscarCotacoes}>Buscar</button>

      {loading && <p>Carregando...</p>}

      {cotacoes.length > 0 && (
        <div>
          <h2>Resultados:</h2>
          <ul>
            {cotacoes.map((item, index) => (
              <li key={index}>
                <strong>Data:</strong> {new Date(item.timestamp * 1000).toLocaleDateString()} |
                <strong> Compra:</strong> R$ {item.bid} |
                <strong> Venda:</strong> R$ {item.ask}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
