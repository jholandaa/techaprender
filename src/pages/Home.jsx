import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={styles.container}>

      {/* SEÇÃO HERO */}
      <section style={styles.hero}>
        <div style={styles.heroTexto}>
          <h1 style={styles.heroTitulo}>
            Encontre seu caminho na <span style={styles.destaque}>Tecnologia da Informação</span>
          </h1>
          <p style={styles.heroSubtitulo}>
            O TechAprender é uma plataforma de apoio educacional para estudantes de ADS do IFPI – Campus Picos.
            Organize seus estudos, descubra sua área de afinidade e avance com clareza.
          </p>
          <div style={styles.heroBotoes}>
            <Link to="/cadastro" style={styles.botaoPrimario}>Começar agora</Link>
            <Link to="/login" style={styles.botaoSecundario}>Já tenho conta</Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CARDS */}
      <section style={styles.cards}>
        <h2 style={styles.cardsTitulo}>Como o TechAprender te ajuda?</h2>
        <div style={styles.cardsGrid}>

          <div style={styles.card}>
            <div style={styles.cardIcone}>🎯</div>
            <h3 style={styles.cardTitulo}>Direcionamento</h3>
            <p style={styles.cardTexto}>
              Descubra qual área da TI combina mais com você: Frontend, Backend, Dados e muito mais.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcone}>📚</div>
            <h3 style={styles.cardTitulo}>Trilhas de Aprendizagem</h3>
            <p style={styles.cardTexto}>
              Conteúdos organizados do básico ao avançado, sem sobrecarga e sem perda de tempo.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcone}>📈</div>
            <h3 style={styles.cardTitulo}>Acompanhe seu progresso</h3>
            <p style={styles.cardTexto}>
              Visualize sua evolução e mantenha o foco nos seus objetivos acadêmicos e profissionais.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitulo}>Pronto para começar sua jornada?</h2>
        <p style={styles.ctaTexto}>Cadastre-se gratuitamente e dê o primeiro passo com clareza.</p>
        <Link to="/cadastro" style={styles.botaoPrimario}>Criar minha conta</Link>
      </section>

    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    color: '#1a1a1a',
  },

  // HERO
  hero: {
    backgroundColor: '#f4f9f4',
    padding: '80px 32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '4px solid #2d7a3a',
  },
  heroTexto: {
    maxWidth: '700px',
    textAlign: 'center',
  },
  heroTitulo: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '20px',
    lineHeight: '1.3',
  },
  destaque: {
    color: '#2d7a3a',
  },
  heroSubtitulo: {
    fontSize: '18px',
    color: '#444',
    marginBottom: '32px',
    lineHeight: '1.7',
  },
  heroBotoes: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  // BOTÕES
  botaoPrimario: {
    backgroundColor: '#1a4d2e',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    color: '#1a4d2e',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '2px solid #1a4d2e',
  },

  // CARDS
  cards: {
    padding: '64px 32px',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  cardsTitulo: {
    fontSize: '28px',
    color: '#1a4d2e',
    marginBottom: '40px',
    fontWeight: 'bold',
  },
  cardsGrid: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#f4f9f4',
    borderRadius: '12px',
    padding: '32px 24px',
    maxWidth: '280px',
    textAlign: 'center',
    borderTop: '4px solid #2d7a3a',
  },
  cardIcone: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  cardTitulo: {
    fontSize: '20px',
    color: '#1a4d2e',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  cardTexto: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6',
  },

  // CTA
  cta: {
    backgroundColor: '#1a4d2e',
    color: 'white',
    padding: '64px 32px',
    textAlign: 'center',
  },
  ctaTitulo: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  ctaTexto: {
    fontSize: '17px',
    marginBottom: '32px',
    opacity: 0.9,
  },
}

export default Home