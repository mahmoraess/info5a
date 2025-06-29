import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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
    <main className={styles.container}>
      <h1 className={styles.title}>Buscar Cotação USD/BRL</h1>

      <div className={styles.inputGroup}>
        <label>Data Início:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>

      <div className={styles.inputGroup}>
        <label>Data Fim:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>

      <button className={styles.button} onClick={buscarCotacoes}>Buscar</button>

      <Link href="/">
        <button className={styles.button}>Voltar para Home</button>
      </Link>

      {loading && <p>Carregando...</p>}

      {cotacoes.length > 0 && (
        <div>
          <h2 className={styles.title}>Resultados:</h2>
          <ul className={styles.resultList}>
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
