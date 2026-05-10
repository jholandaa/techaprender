import { useNavigate } from 'react-router-dom'

function Sobre() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.titulo}>Sobre o TechAprender</h1>
        <p style={styles.subtitulo}>
          Uma plataforma educacional desenvolvida para apoiar estudantes de Tecnologia da Informação na organização dos estudos e no direcionamento de carreira.
        </p>
      </div>

      {/* O QUE É */}
      <div style={styles.secao}>
        <h2 style={styles.secaoTitulo}>💡 O que é o TechAprender?</h2>
        <p style={styles.texto}>
          O TechAprender é uma plataforma digital de apoio educacional desenvolvida como Trabalho de Conclusão de Curso (TCC) do curso de Análise e Desenvolvimento de Sistemas do Instituto Federal de Educação, Ciência e Tecnologia do Piauí — IFPI, Campus Picos.
        </p>
        <p style={styles.texto}>
          A plataforma nasceu da observação de uma realidade recorrente entre estudantes da área de TI: o excesso de informações disponíveis, a dificuldade em organizar os estudos e a incerteza sobre qual caminho seguir profissionalmente. Esse cenário, frequentemente associado à "paralisia por análise", motivou a criação de uma solução que oferecesse clareza, estrutura e direcionamento.
        </p>
      </div>

      {/* COMO FUNCIONA */}
      <div style={styles.secao}>
        <h2 style={styles.secaoTitulo}>🚀 Como funciona?</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.cardIcone}>📋</div>
            <h3 style={styles.cardTitulo}>1. Questionário de perfil</h3>
            <p style={styles.cardTexto}>
              Responda 10 perguntas situacionais que identificam sua área de maior afinidade entre Frontend, Backend, Banco de Dados, Inteligência Artificial, Segurança da Informação e Mobile.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcone}>🎯</div>
            <h3 style={styles.cardTitulo}>2. Identificação do nível</h3>
            <p style={styles.cardTexto}>
              Com base no seu conhecimento prévio, a plataforma identifica se você está no nível Básico, Intermediário ou Avançado, evitando que você comece do zero quando já tem experiência.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcone}>📚</div>
            <h3 style={styles.cardTitulo}>3. Trilha personalizada</h3>
            <p style={styles.cardTexto}>
              Acesse sua trilha com conteúdos organizados por nível, incluindo videoaulas gratuitas, projetos práticos e referências. Avance gradualmente e desbloqueie novos níveis conforme progride.
            </p>
          </div>
        </div>
      </div>

      {/* TECNOLOGIAS */}
      <div style={styles.secao}>
        <h2 style={styles.secaoTitulo}>🛠️ Tecnologias utilizadas</h2>
        <div style={styles.techs}>
          {[
            { nome: 'React.js', desc: 'Biblioteca JavaScript para a interface' },
            { nome: 'Firebase', desc: 'Autenticação e banco de dados' },
            { nome: 'Firestore', desc: 'Armazenamento de dados em tempo real' },
            { nome: 'Vite', desc: 'Ferramenta de build e desenvolvimento' },
            { nome: 'Vercel', desc: 'Hospedagem e deploy contínuo' },
            { nome: 'GitHub', desc: 'Controle de versão do código' },
          ].map((tech, i) => (
            <div key={i} style={styles.techCard}>
              <strong style={styles.techNome}>{tech.nome}</strong>
              <p style={styles.techDesc}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AUTORA */}
      <div style={styles.secaoAutora}>
        <h2 style={styles.secaoTitulo}>👩‍💻 Sobre a autora</h2>
        <p style={styles.texto}>
          Desenvolvido por <strong>Juliana Holanda da Silva</strong>, estudante do 5º período do curso de Análise e Desenvolvimento de Sistemas do IFPI — Campus Picos, sob orientação do <strong>Prof. Esp. Denis Costa Paiva</strong>.
        </p>
        <p style={styles.texto}>
          Este projeto é resultado de uma pesquisa aplicada que busca contribuir para a permanência e o êxito escolar de estudantes da área de Tecnologia da Informação, oferecendo um ambiente estruturado de apoio ao aprendizado.
        </p>
       <div style={styles.botoes}>
  <button
    style={styles.botaoPrimario}
    onClick={() => navigate('/cadastro')}
  >
    Começar agora
  </button>

  <a
    href="https://github.com/jholandaa/techaprender"
    target="_blank"
    rel="noopener noreferrer"
    style={styles.botaoSecundario}
  >
    Ver no GitHub
  </a>
</div>
      </div>

    </div>
  )
}

const styles = {
  container: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '48px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '56px',
    padding: '48px 32px',
    backgroundColor: '#1a4d2e',
    borderRadius: '16px',
    color: 'white',
  },
  titulo: {
    fontSize: 'clamp(24px, 4vw, 36px)',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: 'white',
  },
  subtitulo: {
    fontSize: '17px',
    lineHeight: '1.7',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
  },
  secao: {
    marginBottom: '48px',
  },
  secaoAutora: {
    marginBottom: '48px',
    backgroundColor: '#f4f9f4',
    padding: '32px',
    borderRadius: '12px',
    borderLeft: '6px solid #2d7a3a',
  },
  secaoTitulo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '20px',
  },
  texto: {
    fontSize: '16px',
    color: '#444',
    lineHeight: '1.8',
    marginBottom: '16px',
  },
  cards: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1',
    minWidth: '220px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
    borderTop: '4px solid #2d7a3a',
  },
  cardIcone: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  cardTitulo: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '8px',
  },
  cardTexto: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    margin: 0,
  },
  techs: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  techCard: {
    flex: '1',
    minWidth: '150px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    borderLeft: '4px solid #2d7a3a',
  },
  techNome: {
    fontSize: '15px',
    color: '#1a4d2e',
    display: 'block',
    marginBottom: '4px',
  },
  techDesc: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
  },
  botoes: {
    display: 'flex',
    gap: '16px',
    marginTop: '24px',
    flexWrap: 'wrap',
  },
  botaoPrimario: {
    padding: '12px 28px',
    backgroundColor: '#1a4d2e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  botaoSecundario: {
    padding: '12px 28px',
    backgroundColor: 'transparent',
    color: '#1a4d2e',
    border: '2px solid #1a4d2e',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-block',
  },
}

export default Sobre