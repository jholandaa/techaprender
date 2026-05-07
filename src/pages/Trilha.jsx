import { useSearchParams, useNavigate } from 'react-router-dom'

const trilhas = {
  frontend: {
    titulo: '🎨 Trilha Frontend',
    descricao: 'Você tem perfil para criar interfaces incríveis! Aprenda a construir sites e aplicações web bonitas e funcionais.',
    cor: '#2d7a3a',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['HTML5 — estrutura de páginas web', 'CSS3 — estilização e layout', 'JavaScript — lógica e interatividade']
      },
      {
        nivel: 'Intermediário',
        topicos: ['React.js — componentes e interfaces', 'Git e GitHub — controle de versão', 'Responsividade e UX']
      },
      {
        nivel: 'Avançado',
        topicos: ['TypeScript — tipagem no JavaScript', 'Testes de interface', 'Deploy e hospedagem']
      }
    ]
  },
  backend: {
    titulo: '⚙️ Trilha Backend',
    descricao: 'Você tem perfil para construir sistemas robustos! Aprenda a criar APIs, banco de dados e a lógica por trás das aplicações.',
    cor: '#2d7a3a',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['Lógica de programação', 'Python ou Node.js — introdução', 'Banco de dados SQL']
      },
      {
        nivel: 'Intermediário',
        topicos: ['APIs REST — criação e consumo', 'Autenticação e segurança', 'NoSQL — MongoDB e Firebase']
      },
      {
        nivel: 'Avançado',
        topicos: ['Arquitetura de software', 'Docker e deploy', 'Testes automatizados']
      }
    ]
  },
  dados: {
    titulo: '📊 Trilha Dados',
    descricao: 'Você tem perfil analítico! Aprenda a coletar, tratar e transformar dados em informações valiosas para tomada de decisão.',
    cor: '#2d7a3a',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['Excel e Google Sheets avançado', 'SQL — consultas em banco de dados', 'Estatística básica']
      },
      {
        nivel: 'Intermediário',
        topicos: ['Python para análise de dados', 'Pandas e visualização de dados', 'Power BI e dashboards']
      },
      {
        nivel: 'Avançado',
        topicos: ['Machine Learning introdutório', 'Big Data conceitos', 'Storytelling com dados']
      }
    ]
  }
}

function Trilha() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const area = params.get('area') || 'frontend'
  const trilha = trilhas[area] || trilhas.frontend

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h1 style={styles.titulo}>{trilha.titulo}</h1>
        <p style={styles.descricao}>{trilha.descricao}</p>
        <button style={styles.botaoRefazer} onClick={() => navigate('/questionario')}>
          Refazer questionário
        </button>
      </div>

      <div style={styles.niveis}>
        {trilha.niveis.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.numeroNivel}>{index + 1}</span>
              <h3 style={styles.nivelTitulo}>{item.nivel}</h3>
            </div>
            <ul style={styles.lista}>
              {item.topicos.map((topico, i) => (
                <li key={i} style={styles.item}>✅ {topico}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '48px 32px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  titulo: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '16px',
  },
  descricao: {
    fontSize: '17px',
    color: '#555',
    lineHeight: '1.7',
    marginBottom: '24px',
  },
  botaoRefazer: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    border: '2px solid #1a4d2e',
    borderRadius: '8px',
    color: '#1a4d2e',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  niveis: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
    borderLeft: '6px solid #2d7a3a',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  numeroNivel: {
    backgroundColor: '#1a4d2e',
    color: 'white',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    flexShrink: 0,
  },
  nivelTitulo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    margin: 0,
  },
  lista: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  item: {
    fontSize: '15px',
    color: '#444',
    lineHeight: '1.5',
  }
}

export default Trilha     