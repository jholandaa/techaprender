import { useSearchParams, useNavigate } from 'react-router-dom'

const trilhas = {
  frontend: {
    titulo: '🎨 Trilha Frontend',
    descricao: 'Você tem perfil para criar interfaces incríveis! Aprenda a construir sites e aplicações web bonitas, acessíveis e funcionais.',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['HTML5 — estrutura semântica de páginas', 'CSS3 — estilização, flexbox e grid', 'JavaScript — lógica e manipulação do DOM'],
        projetos: ['Página pessoal com HTML e CSS', 'Calculadora com JavaScript', 'Landing page responsiva'],
        videoaulas: [
          { titulo: 'HTML e CSS — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ejkb_YpuHWs' },
          { titulo: 'JavaScript — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=BXqUH86F-kA' },
        ],
        livros: ['HTML e CSS: Projete e Construa Websites — Jon Duckett', 'Eloquent JavaScript — Marijn Haverbeke (gratuito online)'],
        certificacoes: ['Certificado HTML/CSS — freeCodeCamp (gratuito)', 'Responsive Web Design — freeCodeCamp (gratuito)']
      },
      {
        nivel: 'Intermediário',
        topicos: ['React.js — componentes, props e estado', 'Git e GitHub — controle de versão', 'Responsividade e acessibilidade'],
        projetos: ['To-do list com React', 'Portfólio pessoal com React', 'Clone de interface (Netflix, Spotify)'],
        videoaulas: [
          { titulo: 'React — Matheus Battisti (Hora de Codar)', url: 'https://www.youtube.com/watch?v=FXqX7oof0I4' },
          { titulo: 'Git e GitHub — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=xEKo29OWILE' },
        ],
        livros: ['Learning React — Alex Banks e Eve Porcello', 'CSS Grid e Flexbox — Rachel Andrew'],
        certificacoes: ['JavaScript Algorithms — freeCodeCamp (gratuito)', 'Front End Development Libraries — freeCodeCamp (gratuito)']
      },
      {
        nivel: 'Avançado',
        topicos: ['TypeScript — tipagem estática no JavaScript', 'Testes de interface com Jest e Testing Library', 'Deploy e otimização de performance'],
        projetos: ['E-commerce completo com React e TypeScript', 'Dashboard com gráficos e dados em tempo real', 'PWA (Progressive Web App)'],
        videoaulas: [
          { titulo: 'TypeScript — Rocketseat', url: 'https://www.youtube.com/watch?v=0mYq5LrQN1s' },
          { titulo: 'Testes no React — Filipe Deschamps', url: 'https://www.youtube.com/watch?v=OXdNGTEP0gE' },
        ],
        livros: ['Programming TypeScript — Boris Cherny', 'High Performance Web Sites — Steve Souders'],
        certificacoes: ['TypeScript — Alura (gratuito no trial)', 'Google UX Design Certificate — Coursera']
      }
    ]
  },
  backend: {
    titulo: '⚙️ Trilha Backend',
    descricao: 'Você tem perfil para construir sistemas robustos! Aprenda a criar APIs, gerenciar servidores e desenvolver a lógica por trás das aplicações.',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['Lógica de programação com Python ou Node.js', 'HTTP e fundamentos de APIs REST', 'Banco de dados SQL básico'],
        projetos: ['API simples de lista de tarefas', 'CRUD básico com Node.js', 'Script de automação com Python'],
        videoaulas: [
          { titulo: 'Python — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=S9uPNppGsGo' },
          { titulo: 'Node.js — Rocketseat', url: 'https://www.youtube.com/watch?v=DiXbJL3iWVs' },
        ],
        livros: ['Python Crash Course — Eric Matthes', 'Node.js Design Patterns — Mario Casciaro'],
        certificacoes: ['Python — freeCodeCamp (gratuito)', 'Back End Development — freeCodeCamp (gratuito)']
      },
      {
        nivel: 'Intermediário',
        topicos: ['APIs REST com autenticação JWT', 'ORM — Sequelize ou Prisma', 'NoSQL — MongoDB e Firebase'],
        projetos: ['API de autenticação completa', 'Sistema de blog com CRUD completo', 'Chat em tempo real com Socket.io'],
        videoaulas: [
          { titulo: 'API REST com Node.js — Rocketseat', url: 'https://www.youtube.com/watch?v=RSr85jzSTMk' },
          { titulo: 'MongoDB — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=x9tC0eK0GtA' },
        ],
        livros: ['RESTful Web APIs — Leonard Richardson', 'MongoDB: The Definitive Guide'],
        certificacoes: ['APIs and Microservices — freeCodeCamp (gratuito)', 'Node.js — Dio.me (gratuito)']
      },
      {
        nivel: 'Avançado',
        topicos: ['Arquitetura de microsserviços', 'Docker e containerização', 'CI/CD e deploy em produção'],
        projetos: ['Microsserviço de pagamentos', 'Deploy automatizado com GitHub Actions', 'API escalável com cache e filas'],
        videoaulas: [
          { titulo: 'Docker — Código Fonte TV', url: 'https://www.youtube.com/watch?v=Kzcz-EVKBEQ' },
          { titulo: 'Microsserviços — Full Cycle', url: 'https://www.youtube.com/watch?v=1Bld2c2248E' },
        ],
        livros: ['Clean Architecture — Robert C. Martin', 'Designing Distributed Systems — Brendan Burns'],
        certificacoes: ['AWS Cloud Practitioner — Amazon (gratuito no nível básico)', 'Docker — Dio.me (gratuito)']
      }
    ]
  },
  banco: {
    titulo: '🗄️ Trilha Banco de Dados',
    descricao: 'Você tem perfil analítico e organizacional! Aprenda a modelar, administrar e otimizar bancos de dados relacionais e não relacionais.',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['Modelagem de dados — entidade e relacionamento', 'SQL básico — SELECT, INSERT, UPDATE, DELETE', 'Normalização de banco de dados'],
        projetos: ['Modelagem de banco para sistema de biblioteca', 'Banco de dados de uma loja virtual', 'Relatórios simples com SQL'],
        videoaulas: [
          { titulo: 'SQL — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ofktsne-utM' },
          { titulo: 'Modelagem de Dados — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=Q_KTYFgvu1s' },
        ],
        livros: ['SQL Cookbook — Anthony Molinaro', 'Banco de Dados — Navathe e Elmasri'],
        certificacoes: ['SQL — freeCodeCamp (gratuito)', 'Banco de Dados — Dio.me (gratuito)']
      },
      {
        nivel: 'Intermediário',
        topicos: ['SQL avançado — JOINs, subqueries e views', 'Stored procedures e triggers', 'PostgreSQL e MySQL na prática'],
        projetos: ['Sistema de relatórios gerenciais', 'Banco de dados de RH com procedures', 'Dashboard conectado a banco real'],
        videoaulas: [
          { titulo: 'PostgreSQL — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=c2fHCMjk_Ys' },
          { titulo: 'MySQL Avançado — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ofktsne-utM' },
        ],
        livros: ['Learning SQL — Alan Beaulieu', 'PostgreSQL: Up and Running — Regina Obe'],
        certificacoes: ['MySQL — Oracle (gratuito no nível básico)', 'Relational Databases — freeCodeCamp (gratuito)']
      },
      {
        nivel: 'Avançado',
        topicos: ['Otimização de queries e índices', 'Replicação e alta disponibilidade', 'NoSQL — MongoDB, Redis e Cassandra'],
        projetos: ['Banco de dados distribuído', 'Sistema de cache com Redis', 'Migração de banco relacional para NoSQL'],
        videoaulas: [
          { titulo: 'Redis — Código Fonte TV', url: 'https://www.youtube.com/watch?v=HMEwYxXFTjM' },
          { titulo: 'MongoDB Avançado — Traversy Media', url: 'https://www.youtube.com/watch?v=-56x56UppqQ' },
        ],
        livros: ['Designing Data-Intensive Applications — Martin Kleppmann', 'NoSQL Distilled — Martin Fowler'],
        certificacoes: ['MongoDB Associate Developer — MongoDB (gratuito no básico)', 'Database Administrator — Oracle']
      }
    ]
  },
  ia: {
    titulo: '🤖 Trilha Inteligência Artificial',
    descricao: 'Você tem perfil para o futuro da tecnologia! Aprenda a criar sistemas inteligentes, treinar modelos e trabalhar com dados para tomada de decisão.',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['Python para ciência de dados', 'Estatística e probabilidade básica', 'Pandas e NumPy — manipulação de dados'],
        projetos: ['Análise exploratória de dados públicos', 'Visualização de dados com Matplotlib', 'Estatísticas de um dataset real'],
        videoaulas: [
          { titulo: 'Python para Data Science — Alura', url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4' },
          { titulo: 'Pandas — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4' },
        ],
        livros: ['Python for Data Analysis — Wes McKinney', 'Estatística Prática para Cientistas de Dados'],
        certificacoes: ['Data Analysis with Python — freeCodeCamp (gratuito)', 'Google Data Analytics — Coursera (gratuito no audit)']
      },
      {
        nivel: 'Intermediário',
        topicos: ['Machine Learning com scikit-learn', 'Regressão, classificação e clusterização', 'Avaliação e validação de modelos'],
        projetos: ['Modelo de previsão de preços', 'Classificador de sentimentos em textos', 'Sistema de recomendação simples'],
        videoaulas: [
          { titulo: 'Machine Learning — Sentdex', url: 'https://www.youtube.com/watch?v=OGxgnH8y2NM' },
          { titulo: 'scikit-learn — Curso completo', url: 'https://www.youtube.com/watch?v=pqNCD_5r0IU' },
        ],
        livros: ['Hands-On Machine Learning — Aurélien Géron', 'Introduction to Machine Learning — Alpaydin'],
        certificacoes: ['Machine Learning — Stanford/Coursera (gratuito no audit)', 'Data Science — IBM/Coursera (gratuito no audit)']
      },
      {
        nivel: 'Avançado',
        topicos: ['Deep Learning com TensorFlow e PyTorch', 'Redes neurais convolucionais e recorrentes', 'Processamento de linguagem natural (NLP)'],
        projetos: ['Reconhecimento de imagens com CNN', 'Chatbot com processamento de linguagem natural', 'Modelo de previsão de séries temporais'],
        videoaulas: [
          { titulo: 'Deep Learning — Fast.ai (gratuito)', url: 'https://www.youtube.com/watch?v=0oyCUWLL_fU' },
          { titulo: 'TensorFlow — TensorFlow oficial', url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk' },
        ],
        livros: ['Deep Learning — Ian Goodfellow', 'Natural Language Processing with Python — Bird, Klein e Loper'],
        certificacoes: ['TensorFlow Developer Certificate — Google', 'Deep Learning Specialization — Coursera (Andrew Ng)']
      }
    ]
  },
  seguranca: {
    titulo: '🔒 Trilha Segurança da Informação',
    descricao: 'Você tem perfil para proteger sistemas e dados! Aprenda a identificar vulnerabilidades, aplicar boas práticas e defender aplicações contra ataques.',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['Fundamentos de redes e protocolos', 'Conceitos de criptografia', 'OWASP Top 10 — principais vulnerabilidades web'],
        projetos: ['Análise de rede com Wireshark', 'Relatório de vulnerabilidades de um site', 'Implementar HTTPS em uma aplicação local'],
        videoaulas: [
          { titulo: 'Segurança da Informação — Professor Messer', url: 'https://www.youtube.com/watch?v=0RLDEVHaEio' },
          { titulo: 'Redes de Computadores — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=F6ImodzPuTs' },
        ],
        livros: ['The Web Application Hacker\'s Handbook', 'Segurança em Computadores — William Stallings'],
        certificacoes: ['CompTIA Security+ (estudo gratuito online)', 'Google Cybersecurity Certificate — Coursera (gratuito no audit)']
      },
      {
        nivel: 'Intermediário',
        topicos: ['Testes de penetração (Pentest)', 'Análise de malware básica', 'Segurança em aplicações web'],
        projetos: ['Pentest em ambiente controlado com Kali Linux', 'CTF (Capture The Flag) — desafios online', 'Implementar autenticação segura em uma API'],
        videoaulas: [
          { titulo: 'Kali Linux — NetworkChuck', url: 'https://www.youtube.com/watch?v=lZAoFs75_cs' },
          { titulo: 'Ethical Hacking — freeCodeCamp', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE' },
        ],
        livros: ['Penetration Testing — Georgia Weidman', 'Hacking: The Art of Exploitation — Jon Erickson'],
        certificacoes: ['CEH — Certified Ethical Hacker (estudo gratuito online)', 'eJPT — eLearnSecurity (gratuito)']
      },
      {
        nivel: 'Avançado',
        topicos: ['Forense digital e resposta a incidentes', 'Segurança em cloud computing', 'Desenvolvimento seguro de software (DevSecOps)'],
        projetos: ['Análise forense de um disco comprometido', 'Implementar pipeline DevSecOps', 'Auditoria de segurança em aplicação real'],
        videoaulas: [
          { titulo: 'DevSecOps — TechWorld with Nana', url: 'https://www.youtube.com/watch?v=OXdNGTEP0gE' },
          { titulo: 'Cloud Security — AWS', url: 'https://www.youtube.com/watch?v=N4pT3-7b5Rs' },
        ],
        livros: ['The Practice of Network Security Monitoring — Richard Bejtlich', 'DevSecOps — Jim Bird'],
        certificacoes: ['CISSP — ISC2 (referência mundial)', 'AWS Security Specialty — Amazon']
      }
    ]
  },
  mobile: {
    titulo: '📱 Trilha Desenvolvimento Mobile',
    descricao: 'Você tem perfil para criar aplicativos! Aprenda a desenvolver apps modernos para Android e iOS usando tecnologias web e nativas.',
    niveis: [
      {
        nivel: 'Básico',
        topicos: ['Fundamentos de React Native', 'Componentes, navegação e estilização mobile', 'Publicação na Play Store e App Store'],
        projetos: ['App de lista de tarefas', 'App de calculadora', 'App de clima com API'],
        videoaulas: [
          { titulo: 'React Native — Rocketseat', url: 'https://www.youtube.com/watch?v=0DhQd_EK1Ng' },
          { titulo: 'React Native para iniciantes — William Canin', url: 'https://www.youtube.com/watch?v=XcU9GEUZTQA' },
        ],
        livros: ['Learning React Native — Bonnie Eisenman', 'React Native in Action — Nader Dabit'],
        certificacoes: ['React Native — Dio.me (gratuito)', 'Mobile Development — freeCodeCamp (gratuito)']
      },
      {
        nivel: 'Intermediário',
        topicos: ['Integração com APIs e Firebase', 'Gerenciamento de estado com Context e Redux', 'Notificações push e armazenamento local'],
        projetos: ['App de delivery com mapa', 'Clone do WhatsApp com Firebase', 'App de finanças pessoais'],
        videoaulas: [
          { titulo: 'App completo com React Native — Rocketseat', url: 'https://www.youtube.com/watch?v=TjIBTSqBOjw' },
          { titulo: 'Redux com React Native — Traversy Media', url: 'https://www.youtube.com/watch?v=93p3LxR9xfM' },
        ],
        livros: ['Fullstack React Native — Devin Abbott', 'Programming React Native — Dotan Nahum'],
        certificacoes: ['React Native — Alura (gratuito no trial)', 'Firebase — Google (gratuito)']
      },
      {
        nivel: 'Avançado',
        topicos: ['Performance e otimização de apps', 'Testes automatizados em mobile com Detox', 'Kotlin e Swift — introdução ao nativo'],
        projetos: ['App com reconhecimento de imagem via IA', 'App com realidade aumentada', 'App publicado e com usuários reais'],
        videoaulas: [
          { titulo: 'Kotlin para Android — Alura', url: 'https://www.youtube.com/watch?v=r0HMRWiP-i4' },
          { titulo: 'Flutter avançado — Flutterando', url: 'https://www.youtube.com/watch?v=TTe4TZqM-Bo' },
        ],
        livros: ['Android Programming — Big Nerd Ranch Guide', 'Swift Programming — Big Nerd Ranch Guide'],
        certificacoes: ['Android Developer — Google (gratuito)', 'iOS App Development — Apple (gratuito)']
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

            <div style={styles.secao}>
              <h4 style={styles.secaoTitulo}>📋 Tópicos</h4>
              <ul style={styles.lista}>
                {item.topicos.map((t, i) => <li key={i} style={styles.item}>✅ {t}</li>)}
              </ul>
            </div>

            <div style={styles.secao}>
              <h4 style={styles.secaoTitulo}>🛠️ Projetos práticos sugeridos</h4>
              <ul style={styles.lista}>
                {item.projetos.map((p, i) => <li key={i} style={styles.item}>💡 {p}</li>)}
              </ul>
            </div>

            <div style={styles.secao}>
              <h4 style={styles.secaoTitulo}>🎥 Videoaulas gratuitas</h4>
              <ul style={styles.lista}>
                {item.videoaulas.map((v, i) => (
                  <li key={i} style={styles.item}>
                    ▶️ <a href={v.url} target="_blank" rel="noopener noreferrer" style={styles.link}>{v.titulo}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.secao}>
              <h4 style={styles.secaoTitulo}>📚 Livros recomendados</h4>
              <ul style={styles.lista}>
                {item.livros.map((l, i) => <li key={i} style={styles.item}>📖 {l}</li>)}
              </ul>
            </div>

            <div style={styles.secao}>
              <h4 style={styles.secaoTitulo}>🏆 Certificações</h4>
              <ul style={styles.lista}>
                {item.certificacoes.map((c, i) => <li key={i} style={styles.item}>🎓 {c}</li>)}
              </ul>
            </div>
          </div>
        ))}
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
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  titulo: {
    fontSize: 'clamp(24px, 4vw, 32px)',
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
    gap: '32px',
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
    marginBottom: '24px',
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
  secao: {
    marginBottom: '20px',
  },
  secaoTitulo: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '10px',
  },
  lista: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  item: {
    fontSize: '14px',
    color: '#444',
    lineHeight: '1.5',
  },
  link: {
    color: '#2d7a3a',
    textDecoration: 'none',
    fontWeight: '500',
  }
}

export default Trilha 