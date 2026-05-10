import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth, db } from '../services/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const trilhas = {
  frontend: {
    titulo: '🎨 Trilha Frontend',
    descricao: 'Você tem perfil para criar interfaces incríveis! Aprenda a construir sites e aplicações web bonitas, acessíveis e funcionais.',
    niveis: {
      basico: {
        topicos: [
          {
            id: 'html',
            titulo: 'HTML5',
            descricao: 'A linguagem de marcação que estrutura toda página web.',
            videoaulas: [
              { titulo: 'HTML5 Completo — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ejkb_YpuHWs' },
              { titulo: 'HTML para iniciantes — Rafaella Ballerini', url: 'https://www.youtube.com/watch?v=3oSIqIqzN3M' },
            ],
            projetos: ['Página pessoal com HTML puro', 'Formulário de contato'],
            referencias: ['https://developer.mozilla.org/pt-BR/docs/Web/HTML'],
          },
          {
            id: 'css',
            titulo: 'CSS3',
            descricao: 'Responsável pela estilização, cores, layouts e animações.',
            videoaulas: [
              { titulo: 'CSS3 Completo — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=K1PnUMJ5pos' },
              { titulo: 'Flexbox — Origamid', url: 'https://www.youtube.com/watch?v=s9tiFRoqTNY' },
              { titulo: 'CSS Grid — Origamid', url: 'https://www.youtube.com/watch?v=HhUlt4CqAlE' },
            ],
            projetos: ['Landing page responsiva', 'Cartão de perfil estilizado'],
            referencias: ['https://developer.mozilla.org/pt-BR/docs/Web/CSS'],
          },
          {
            id: 'javascript',
            titulo: 'JavaScript',
            descricao: 'A linguagem de programação da web, responsável pela interatividade.',
            videoaulas: [
              { titulo: 'JavaScript — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=BXqUH86F-kA' },
              { titulo: 'JavaScript para iniciantes — Rafaella Ballerini', url: 'https://www.youtube.com/watch?v=FdePtO5JSd0' },
              { titulo: 'DOM — Matheus Battisti', url: 'https://www.youtube.com/watch?v=UftSB4DaRU4' },
            ],
            projetos: ['Calculadora', 'Lista de tarefas', 'Quiz interativo'],
            referencias: ['https://developer.mozilla.org/pt-BR/docs/Web/JavaScript'],
          },
        ]
      },
      intermediario: {
        topicos: [
          {
            id: 'react',
            titulo: 'React.js',
            descricao: 'Biblioteca JavaScript para construção de interfaces baseadas em componentes.',
            videoaulas: [
              { titulo: 'React — Matheus Battisti', url: 'https://www.youtube.com/watch?v=FXqX7oof0I4' },
              { titulo: 'React Hooks — Rocketseat', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' },
              { titulo: 'React na prática — Filipe Deschamps', url: 'https://www.youtube.com/watch?v=aJR7f45dBNs' },
            ],
            projetos: ['To-do list com React', 'Clone do Instagram', 'Dashboard com gráficos'],
            referencias: ['https://react.dev'],
          },
          {
            id: 'git',
            titulo: 'Git e GitHub',
            descricao: 'Controle de versão e colaboração em projetos de software.',
            videoaulas: [
              { titulo: 'Git e GitHub — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=xEKo29OWILE' },
              { titulo: 'Git para iniciantes — Rafaella Ballerini', url: 'https://www.youtube.com/watch?v=DqTITcMq68k' },
            ],
            projetos: ['Portfólio no GitHub Pages', 'Contribuição em projeto open source'],
            referencias: ['https://git-scm.com/doc'],
          },
          {
            id: 'responsividade',
            titulo: 'Responsividade e UX',
            descricao: 'Técnicas para criar interfaces que funcionam bem em qualquer dispositivo.',
            videoaulas: [
              { titulo: 'Design Responsivo — Origamid', url: 'https://www.youtube.com/watch?v=5KH4RUBQ0BU' },
              { titulo: 'UX para desenvolvedores — Rocketseat', url: 'https://www.youtube.com/watch?v=qposZM5TSCI' },
            ],
            projetos: ['Site completamente responsivo', 'Redesign de um site existente'],
            referencias: ['https://web.dev/responsive-web-design-basics/'],
          },
        ]
      },
      avancado: {
        topicos: [
          {
            id: 'typescript',
            titulo: 'TypeScript',
            descricao: 'Superset do JavaScript que adiciona tipagem estática ao código.',
            videoaulas: [
              { titulo: 'TypeScript — Rocketseat', url: 'https://www.youtube.com/watch?v=0mYq5LrQN1s' },
              { titulo: 'TypeScript do zero — Matheus Battisti', url: 'https://www.youtube.com/watch?v=aTf8QTjw4RE' },
            ],
            projetos: ['Reescrever um projeto React em TypeScript', 'API tipada com TypeScript'],
            referencias: ['https://www.typescriptlang.org/docs/'],
          },
          {
            id: 'testes',
            titulo: 'Testes de Interface',
            descricao: 'Garantir que os componentes funcionam corretamente com Jest e Testing Library.',
            videoaulas: [
              { titulo: 'Testes no React — Rocketseat', url: 'https://www.youtube.com/watch?v=OXdNGTEP0gE' },
              { titulo: 'Jest do zero — Filipe Deschamps', url: 'https://www.youtube.com/watch?v=TL1ByAIf8Ck' },
            ],
            projetos: ['Suite de testes para um projeto React', 'TDD — desenvolvimento orientado a testes'],
            referencias: ['https://jestjs.io/pt-BR/', 'https://testing-library.com/'],
          },
          {
            id: 'performance',
            titulo: 'Performance e Deploy',
            descricao: 'Otimização de aplicações e publicação em produção.',
            videoaulas: [
              { titulo: 'Performance no React — Rocketseat', url: 'https://www.youtube.com/watch?v=cpH3e-gg9kY' },
              { titulo: 'Deploy com Vercel — Matheus Battisti', url: 'https://www.youtube.com/watch?v=KpHNGKuALCk' },
            ],
            projetos: ['Otimizar um projeto existente', 'Publicar app com CI/CD'],
            referencias: ['https://web.dev/performance/', 'https://vercel.com/docs'],
          },
        ]
      }
    }
  },
  backend: {
    titulo: '⚙️ Trilha Backend',
    descricao: 'Você tem perfil para construir sistemas robustos! Aprenda a criar APIs, gerenciar servidores e desenvolver a lógica por trás das aplicações.',
    niveis: {
      basico: {
        topicos: [
          { id: 'logica', titulo: 'Lógica de Programação', descricao: 'Base fundamental para qualquer desenvolvedor.', videoaulas: [{ titulo: 'Lógica de Programação — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=8mei6uVttho' }], projetos: ['Algoritmos básicos', 'Calculadora no terminal'], referencias: ['https://www.coursera.org/learn/algoritmos'] },
          { id: 'python', titulo: 'Python ou Node.js', descricao: 'Linguagens principais para desenvolvimento backend.', videoaulas: [{ titulo: 'Python — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=S9uPNppGsGo' }, { titulo: 'Node.js — Rocketseat', url: 'https://www.youtube.com/watch?v=DiXbJL3iWVs' }], projetos: ['Script de automação', 'API simples'], referencias: ['https://docs.python.org/pt-br/3/', 'https://nodejs.org/pt-br/docs/'] },
          { id: 'http', titulo: 'HTTP e APIs REST', descricao: 'Fundamentos de comunicação na web.', videoaulas: [{ titulo: 'HTTP — Código Fonte TV', url: 'https://www.youtube.com/watch?v=CXzbUwK6lc8' }, { titulo: 'REST API — Rocketseat', url: 'https://www.youtube.com/watch?v=RSr85jzSTMk' }], projetos: ['Consumir uma API pública', 'Criar CRUD básico'], referencias: ['https://developer.mozilla.org/pt-BR/docs/Web/HTTP'] },
        ]
      },
      intermediario: {
        topicos: [
          { id: 'jwt', titulo: 'Autenticação com JWT', descricao: 'Sistema de autenticação seguro para APIs.', videoaulas: [{ titulo: 'JWT — Rocketseat', url: 'https://www.youtube.com/watch?v=EMIjNEpTuaU' }], projetos: ['Sistema de login com JWT', 'API com refresh token'], referencias: ['https://jwt.io/introduction'] },
          { id: 'orm', titulo: 'ORM — Prisma ou Sequelize', descricao: 'Abstração do banco de dados no código.', videoaulas: [{ titulo: 'Prisma — Matheus Battisti', url: 'https://www.youtube.com/watch?v=GxMGGkxI5AI' }], projetos: ['CRUD com Prisma e PostgreSQL'], referencias: ['https://www.prisma.io/docs'] },
          { id: 'nosql', titulo: 'NoSQL — MongoDB e Firebase', descricao: 'Bancos de dados não relacionais.', videoaulas: [{ titulo: 'MongoDB — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=x9tC0eK0GtA' }], projetos: ['API com MongoDB', 'Chat em tempo real com Firebase'], referencias: ['https://www.mongodb.com/docs/'] },
        ]
      },
      avancado: {
        topicos: [
          { id: 'microsservicos', titulo: 'Microsserviços', descricao: 'Arquitetura de sistemas distribuídos.', videoaulas: [{ titulo: 'Microsserviços — Full Cycle', url: 'https://www.youtube.com/watch?v=1Bld2c2248E' }], projetos: ['Sistema com 2+ microsserviços'], referencias: ['https://microservices.io/'] },
          { id: 'docker', titulo: 'Docker', descricao: 'Containerização de aplicações.', videoaulas: [{ titulo: 'Docker — Código Fonte TV', url: 'https://www.youtube.com/watch?v=Kzcz-EVKBEQ' }], projetos: ['Dockerizar uma API', 'Docker Compose com banco de dados'], referencias: ['https://docs.docker.com/'] },
          { id: 'cicd', titulo: 'CI/CD', descricao: 'Integração e entrega contínua.', videoaulas: [{ titulo: 'GitHub Actions — Rocketseat', url: 'https://www.youtube.com/watch?v=ePDzExmRYoY' }], projetos: ['Pipeline de deploy automatizado'], referencias: ['https://docs.github.com/pt/actions'] },
        ]
      }
    }
  },
  banco: {
    titulo: '🗄️ Trilha Banco de Dados',
    descricao: 'Você tem perfil analítico e organizacional! Aprenda a modelar, administrar e otimizar bancos de dados.',
    niveis: {
      basico: { topicos: [{ id: 'modelagem', titulo: 'Modelagem de Dados', descricao: 'Entidades, relacionamentos e diagramas ER.', videoaulas: [{ titulo: 'Modelagem — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=Q_KTYFgvu1s' }], projetos: ['Modelar banco de uma biblioteca'], referencias: ['https://www.lucidchart.com/pages/er-diagrams'] }, { id: 'sql', titulo: 'SQL Básico', descricao: 'SELECT, INSERT, UPDATE, DELETE.', videoaulas: [{ titulo: 'SQL — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ofktsne-utM' }], projetos: ['CRUD em SQL puro'], referencias: ['https://www.w3schools.com/sql/'] }, { id: 'normalizacao', titulo: 'Normalização', descricao: 'Formas normais e eliminação de redundâncias.', videoaulas: [{ titulo: 'Normalização — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=GFQaEYEc8_8' }], projetos: ['Normalizar banco existente'], referencias: ['https://www.devmedia.com.br/normalizacao-em-banco-de-dados'] }] },
      intermediario: { topicos: [{ id: 'sqlavancado', titulo: 'SQL Avançado', descricao: 'JOINs, subqueries, views e funções.', videoaulas: [{ titulo: 'SQL Avançado — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=nGwhNkdQTDM' }], projetos: ['Relatórios complexos com SQL'], referencias: ['https://mode.com/sql-tutorial/'] }, { id: 'postgresql', titulo: 'PostgreSQL', descricao: 'Banco relacional robusto e completo.', videoaulas: [{ titulo: 'PostgreSQL — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=c2fHCMjk_Ys' }], projetos: ['Sistema com PostgreSQL'], referencias: ['https://www.postgresql.org/docs/'] }, { id: 'procedures', titulo: 'Stored Procedures e Triggers', descricao: 'Automação de processos no banco.', videoaulas: [{ titulo: 'Procedures — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=nGwhNkdQTDM' }], projetos: ['Automatizar auditoria com triggers'], referencias: ['https://www.postgresql.org/docs/current/plpgsql.html'] }] },
      avancado: { topicos: [{ id: 'otimizacao', titulo: 'Otimização e Índices', descricao: 'Performance em consultas complexas.', videoaulas: [{ titulo: 'Índices SQL — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=fsG1XaZEa78' }], projetos: ['Otimizar queries lentas'], referencias: ['https://use-the-index-luke.com/'] }, { id: 'nosqlbd', titulo: 'NoSQL', descricao: 'MongoDB, Redis e Cassandra.', videoaulas: [{ titulo: 'Redis — Código Fonte TV', url: 'https://www.youtube.com/watch?v=HMEwYxXFTjM' }], projetos: ['Cache com Redis'], referencias: ['https://www.mongodb.com/docs/'] }, { id: 'replicacao', titulo: 'Replicação e Alta Disponibilidade', descricao: 'Bancos distribuídos e tolerância a falhas.', videoaulas: [{ titulo: 'Replicação — Full Cycle', url: 'https://www.youtube.com/watch?v=1Bld2c2248E' }], projetos: ['Cluster de banco de dados'], referencias: ['https://www.postgresql.org/docs/current/high-availability.html'] }] }
    }
  },
  ia: {
    titulo: '🤖 Trilha Inteligência Artificial',
    descricao: 'Você tem perfil para o futuro da tecnologia! Aprenda a criar sistemas inteligentes e trabalhar com dados.',
    niveis: {
      basico: { topicos: [{ id: 'python_ia', titulo: 'Python para IA', descricao: 'A linguagem principal para ciência de dados e IA.', videoaulas: [{ titulo: 'Python — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=S9uPNppGsGo' }], projetos: ['Scripts de análise de dados'], referencias: ['https://docs.python.org/pt-br/3/'] }, { id: 'pandas', titulo: 'Pandas e NumPy', descricao: 'Bibliotecas para manipulação de dados.', videoaulas: [{ titulo: 'Pandas — Stack Overflow', url: 'https://www.youtube.com/watch?v=vmEHCJofslg' }], projetos: ['Análise de dataset público'], referencias: ['https://pandas.pydata.org/docs/'] }, { id: 'estatistica', titulo: 'Estatística Básica', descricao: 'Fundamentos para entender dados.', videoaulas: [{ titulo: 'Estatística — Marcos Severo', url: 'https://www.youtube.com/watch?v=R2QGTbxNxoE' }], projetos: ['Análise estatística de dados reais'], referencias: ['https://www.khanacademy.org/math/statistics-probability'] }] },
      intermediario: { topicos: [{ id: 'ml', titulo: 'Machine Learning', descricao: 'Algoritmos de aprendizado de máquina.', videoaulas: [{ titulo: 'ML — Sentdex', url: 'https://www.youtube.com/watch?v=OGxgnH8y2NM' }], projetos: ['Modelo de classificação'], referencias: ['https://scikit-learn.org/stable/'] }, { id: 'sklearn', titulo: 'scikit-learn', descricao: 'Biblioteca de Machine Learning em Python.', videoaulas: [{ titulo: 'scikit-learn — Curso completo', url: 'https://www.youtube.com/watch?v=pqNCD_5r0IU' }], projetos: ['Previsão de preços'], referencias: ['https://scikit-learn.org/stable/user_guide.html'] }, { id: 'visualizacao', titulo: 'Visualização de Dados', descricao: 'Matplotlib, Seaborn e Plotly.', videoaulas: [{ titulo: 'Matplotlib — Sentdex', url: 'https://www.youtube.com/watch?v=q7Bo_J8x_dw' }], projetos: ['Dashboard de dados'], referencias: ['https://matplotlib.org/stable/'] }] },
      avancado: { topicos: [{ id: 'deeplearning', titulo: 'Deep Learning', descricao: 'Redes neurais com TensorFlow e PyTorch.', videoaulas: [{ titulo: 'Deep Learning — Fast.ai', url: 'https://www.youtube.com/watch?v=0oyCUWLL_fU' }], projetos: ['Reconhecimento de imagens'], referencias: ['https://www.tensorflow.org/tutorials'] }, { id: 'nlp', titulo: 'NLP — Processamento de Linguagem Natural', descricao: 'Análise e geração de texto com IA.', videoaulas: [{ titulo: 'NLP — Hugging Face', url: 'https://www.youtube.com/watch?v=00GKzGyWFEs' }], projetos: ['Chatbot com NLP', 'Análise de sentimentos'], referencias: ['https://huggingface.co/learn'] }, { id: 'mlops', titulo: 'MLOps', descricao: 'Deploy e monitoramento de modelos em produção.', videoaulas: [{ titulo: 'MLOps — Full Cycle', url: 'https://www.youtube.com/watch?v=1Bld2c2248E' }], projetos: ['API de modelo ML em produção'], referencias: ['https://ml-ops.org/'] }] }
    }
  },
  seguranca: {
    titulo: '🔒 Trilha Segurança da Informação',
    descricao: 'Você tem perfil para proteger sistemas! Aprenda a identificar vulnerabilidades e defender aplicações contra ataques.',
    niveis: {
      basico: { topicos: [{ id: 'redes', titulo: 'Fundamentos de Redes', descricao: 'TCP/IP, DNS, HTTP e protocolos.', videoaulas: [{ titulo: 'Redes — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=F6ImodzPuTs' }], projetos: ['Análise de tráfego com Wireshark'], referencias: ['https://www.coursera.org/learn/computer-networking'] }, { id: 'criptografia', titulo: 'Criptografia', descricao: 'Hash, SSL/TLS e criptografia simétrica/assimétrica.', videoaulas: [{ titulo: 'Criptografia — Código Fonte TV', url: 'https://www.youtube.com/watch?v=CcU5Kc_FN_4' }], projetos: ['Implementar criptografia em uma aplicação'], referencias: ['https://cryptography.io/en/latest/'] }, { id: 'owasp', titulo: 'OWASP Top 10', descricao: 'Principais vulnerabilidades web.', videoaulas: [{ titulo: 'OWASP — NetworkChuck', url: 'https://www.youtube.com/watch?v=lc7scxvKQOo' }], projetos: ['Relatório de vulnerabilidades de um site'], referencias: ['https://owasp.org/www-project-top-ten/'] }] },
      intermediario: { topicos: [{ id: 'pentest', titulo: 'Pentest', descricao: 'Testes de penetração éticos.', videoaulas: [{ titulo: 'Ethical Hacking — freeCodeCamp', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE' }], projetos: ['CTF — Capture The Flag'], referencias: ['https://www.hackthebox.com/'] }, { id: 'kali', titulo: 'Kali Linux', descricao: 'Sistema operacional para segurança.', videoaulas: [{ titulo: 'Kali Linux — NetworkChuck', url: 'https://www.youtube.com/watch?v=lZAoFs75_cs' }], projetos: ['Ambiente de lab com Kali'], referencias: ['https://www.kali.org/docs/'] }, { id: 'webseq', titulo: 'Segurança em Aplicações Web', descricao: 'SQL Injection, XSS, CSRF e outras.', videoaulas: [{ titulo: 'Web Security — PortSwigger', url: 'https://www.youtube.com/watch?v=X4eRbHgRqGk' }], projetos: ['Corrigir vulnerabilidades em app real'], referencias: ['https://portswigger.net/web-security'] }] },
      avancado: { topicos: [{ id: 'forense', titulo: 'Forense Digital', descricao: 'Investigação de incidentes e evidências digitais.', videoaulas: [{ titulo: 'Forense Digital — SANS', url: 'https://www.youtube.com/watch?v=Bjd5rb_eYHU' }], projetos: ['Análise forense de disco comprometido'], referencias: ['https://www.sans.org/cyber-security-courses/digital-forensics-essentials/'] }, { id: 'devsecops', titulo: 'DevSecOps', descricao: 'Segurança integrada ao desenvolvimento.', videoaulas: [{ titulo: 'DevSecOps — TechWorld', url: 'https://www.youtube.com/watch?v=OXdNGTEP0gE' }], projetos: ['Pipeline com análise de segurança'], referencias: ['https://www.devsecops.org/'] }, { id: 'cloudsec', titulo: 'Segurança em Cloud', descricao: 'AWS, GCP e Azure security.', videoaulas: [{ titulo: 'Cloud Security — AWS', url: 'https://www.youtube.com/watch?v=N4pT3-7b5Rs' }], projetos: ['Auditoria de segurança em cloud'], referencias: ['https://aws.amazon.com/security/'] }] }
    }
  },
  mobile: {
    titulo: '📱 Trilha Mobile',
    descricao: 'Você tem perfil para criar aplicativos! Aprenda a desenvolver apps modernos para Android e iOS.',
    niveis: {
      basico: { topicos: [{ id: 'rn_intro', titulo: 'Introdução ao React Native', descricao: 'Fundamentos do desenvolvimento mobile com React Native.', videoaulas: [{ titulo: 'React Native — Rocketseat', url: 'https://www.youtube.com/watch?v=0DhQd_EK1Ng' }], projetos: ['App de lista de tarefas', 'App de calculadora'], referencias: ['https://reactnative.dev/docs/getting-started'] }, { id: 'componentes_mobile', titulo: 'Componentes e Navegação', descricao: 'Estrutura de telas e navegação entre elas.', videoaulas: [{ titulo: 'React Navigation — William Canin', url: 'https://www.youtube.com/watch?v=XcU9GEUZTQA' }], projetos: ['App com múltiplas telas'], referencias: ['https://reactnavigation.org/docs/getting-started'] }, { id: 'estilizacao_mobile', titulo: 'Estilização Mobile', descricao: 'StyleSheet e design para mobile.', videoaulas: [{ titulo: 'Estilização RN — Rocketseat', url: 'https://www.youtube.com/watch?v=TjIBTSqBOjw' }], projetos: ['Interface de app de clima'], referencias: ['https://reactnative.dev/docs/style'] }] },
      intermediario: { topicos: [{ id: 'api_mobile', titulo: 'Integração com APIs', descricao: 'Consumo de APIs REST no mobile.', videoaulas: [{ titulo: 'Axios no React Native — Matheus Battisti', url: 'https://www.youtube.com/watch?v=TjIBTSqBOjw' }], projetos: ['App de notícias com API'], referencias: ['https://axios-http.com/docs/intro'] }, { id: 'estado', titulo: 'Gerenciamento de Estado', descricao: 'Context API e Redux no mobile.', videoaulas: [{ titulo: 'Context API — Rocketseat', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' }], projetos: ['App de carrinho de compras'], referencias: ['https://redux.js.org/'] }, { id: 'firebase_mobile', titulo: 'Firebase no Mobile', descricao: 'Autenticação, banco de dados e notificações.', videoaulas: [{ titulo: 'Firebase + RN — Rocketseat', url: 'https://www.youtube.com/watch?v=TjIBTSqBOjw' }], projetos: ['App de chat em tempo real'], referencias: ['https://rnfirebase.io/'] }] },
      avancado: { topicos: [{ id: 'performance_mobile', titulo: 'Performance Mobile', descricao: 'Otimização e boas práticas.', videoaulas: [{ titulo: 'Performance RN — Rocketseat', url: 'https://www.youtube.com/watch?v=cpH3e-gg9kY' }], projetos: ['Otimizar app existente'], referencias: ['https://reactnative.dev/docs/performance'] }, { id: 'testes_mobile', titulo: 'Testes com Detox', descricao: 'Testes automatizados end-to-end.', videoaulas: [{ titulo: 'Detox — Wix Engineering', url: 'https://www.youtube.com/watch?v=tU_LvK8gOhI' }], projetos: ['Suite de testes para app'], referencias: ['https://wix.github.io/Detox/'] }, { id: 'nativo', titulo: 'Kotlin e Swift', descricao: 'Introdução ao desenvolvimento nativo.', videoaulas: [{ titulo: 'Kotlin — Alura', url: 'https://www.youtube.com/watch?v=r0HMRWiP-i4' }], projetos: ['App nativo simples'], referencias: ['https://developer.android.com/kotlin'] }] }
    }
  }
}

const ordemNiveis = ['basico', 'intermediario', 'avancado']
const labelNivel = { basico: '🌱 Básico', intermediario: '🌿 Intermediário', avancado: '🌳 Avançado' }

function Trilha() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const area = params.get('area') || 'frontend'
  const nivelParam = params.get('nivel') || 'basico'
  const trilha = trilhas[area] || trilhas.frontend

  const [nivelAtual, setNivelAtual] = useState(nivelParam)
  const [nivelInicial, setNivelInicial] = useState(nivelParam)
  const [abaAtiva, setAbaAtiva] = useState(nivelParam)
  const [checks, setChecks] = useState({})
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const carregar = async () => {
      const user = auth.currentUser
      if (user) {
        try {
          const docRef = doc(db, 'usuarios', user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const dados = docSnap.data()
            const ni = dados.nivelInicial || nivelParam
            const na = dados.nivelAtual || nivelParam
            const ch = dados.checks || {}
            setNivelInicial(ni)
            setNivelAtual(na)
            setAbaAtiva(na)
            setChecks(ch)
          }
        } catch (e) {
          console.log('Erro ao carregar:', e)
        }
      }
      setCarregando(false)
    }
    carregar()
  }, [])

  const nivelLiberado = (nivel) => {
    const idxInicial = ordemNiveis.indexOf(nivelInicial)
    const idxNivel = ordemNiveis.indexOf(nivel)
    return idxNivel <= idxInicial || ordemNiveis.indexOf(nivelAtual) >= idxNivel
  }

  const handleCheck = async (topicoId) => {
    const novosChecks = { ...checks, [`${area}_${abaAtiva}_${topicoId}`]: !checks[`${area}_${abaAtiva}_${topicoId}`] }
    setChecks(novosChecks)
    const user = auth.currentUser
    if (user) {
      try {
        await setDoc(doc(db, 'usuarios', user.uid), { checks: novosChecks }, { merge: true })
      } catch (e) {
        console.log('Erro ao salvar check:', e)
      }
    }
  }

  const todosChecados = (nivel) => {
    const topicos = trilha.niveis[nivel]?.topicos || []
    return topicos.every(t => checks[`${area}_${nivel}_${t.id}`])
  }

  const desbloquearProximo = async () => {
    const idxAtual = ordemNiveis.indexOf(nivelAtual)
    if (idxAtual < ordemNiveis.length - 1) {
      const proximo = ordemNiveis[idxAtual + 1]
      setNivelAtual(proximo)
      setAbaAtiva(proximo)
      const user = auth.currentUser
      if (user) {
        try {
          await setDoc(doc(db, 'usuarios', user.uid), { nivelAtual: proximo }, { merge: true })
        } catch (e) {
          console.log('Erro ao desbloquear:', e)
        }
      }
    }
  }

  if (carregando) return <div style={{ textAlign: 'center', padding: '80px', color: '#1a4d2e' }}>Carregando sua trilha...</div>

  const topicosAba = trilha.niveis[abaAtiva]?.topicos || []
  const idxNivelAtual = ordemNiveis.indexOf(nivelAtual)
  const temProximo = idxNivelAtual < ordemNiveis.length - 1
  const concluidos = topicosAba.filter(t => checks[`${area}_${abaAtiva}_${t.id}`]).length
  const porcentagem = topicosAba.length > 0 ? Math.round((concluidos / topicosAba.length) * 100) : 0

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h1 style={styles.titulo}>{trilha.titulo}</h1>
        <p style={styles.descricao}>{trilha.descricao}</p>
        <button style={styles.botaoRefazer} onClick={() => navigate('/questionario')}>
          Refazer questionário
        </button>
      </div>

      {/* ABAS */}
      <div style={styles.abas}>
        {ordemNiveis.map(nivel => {
          const liberado = nivelLiberado(nivel)
          const ativo = abaAtiva === nivel
          return (
            <button
              key={nivel}
              style={{
                ...styles.aba,
                ...(ativo ? styles.abaAtiva : {}),
                ...(liberado ? {} : styles.abaBloqueada),
              }}
              onClick={() => liberado && setAbaAtiva(nivel)}
              disabled={!liberado}
            >
              {labelNivel[nivel]}
              {!liberado && ' 🔒'}
            </button>
          )
        })}
      </div>

      {/* BARRA DE PROGRESSO */}
      <div style={styles.progressoContainer}>
        <div style={styles.progressoInfo}>
          <span style={styles.progressoTexto}>
            Progresso em {labelNivel[abaAtiva]}
          </span>
          <span style={styles.progressoNumero}>
            {concluidos} de {topicosAba.length} tópicos concluídos — {porcentagem}%
          </span>
        </div>
        <div style={styles.progressoFundo}>
          <div style={{ ...styles.progressoBarra, width: `${porcentagem}%` }} />
        </div>
      </div>

      {/* TÓPICOS */}
      <div style={styles.topicos}>
        {topicosAba.map((topico, index) => {
          const checkKey = `${area}_${abaAtiva}_${topico.id}`
          const concluido = !!checks[checkKey]
          return (
            <div key={topico.id} style={{ ...styles.topicoCard, ...(concluido ? styles.topicoCardConcluido : {}) }}>
              <div style={styles.topicoHeader}>
                <div style={styles.topicoNumero}>{index + 1}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.topicoTitulo}>{topico.titulo}</h3>
                  <p style={styles.topicoDesc}>{topico.descricao}</p>
                </div>
                <button
                  style={{ ...styles.checkBtn, ...(concluido ? styles.checkBtnConcluido : {}) }}
                  onClick={() => handleCheck(topico.id)}
                >
                  {concluido ? '✅ Concluído' : '⬜ Marcar'}
                </button>
              </div>

              <div style={styles.secoes}>
                <div style={styles.secao}>
                  <h4 style={styles.secaoTitulo}>🎥 Videoaulas</h4>
                  {topico.videoaulas.map((v, i) => (
                    <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={styles.link}>▶️ {v.titulo}</a>
                  ))}
                </div>
                <div style={styles.secao}>
                  <h4 style={styles.secaoTitulo}>🛠️ Projetos sugeridos</h4>
                  {topico.projetos.map((p, i) => (
                    <p key={i} style={styles.itemTexto}>💡 {p}</p>
                  ))}
                </div>
                <div style={styles.secao}>
                  <h4 style={styles.secaoTitulo}>📚 Referências</h4>
                  {topico.referencias.map((r, i) => (
                    <a key={i} href={r} target="_blank" rel="noopener noreferrer" style={styles.link}>🔗 {r}</a>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* BOTÃO DESBLOQUEAR */}
      {todosChecados(abaAtiva) && abaAtiva === nivelAtual && temProximo && (
        <div style={styles.desbloqueioContainer}>
          <p style={styles.desbloqueioTexto}>🎉 Parabéns! Você concluiu o nível {labelNivel[nivelAtual]}!</p>
          <button style={styles.botaoDesbloquear} onClick={desbloquearProximo}>
            🚀 Desbloquear {labelNivel[ordemNiveis[idxNivelAtual + 1]]}
          </button>
        </div>
      )}

      {/* CONCLUSÃO TOTAL */}
      {todosChecados(abaAtiva) && !temProximo && abaAtiva === 'avancado' && (
        <div style={styles.desbloqueioContainer}>
          <p style={styles.desbloqueioTexto}>🏆 Incrível! Você concluiu toda a trilha {trilha.titulo}!</p>
        </div>
      )}

    </div>
  )
}

const styles = {
  container: { maxWidth: '860px', margin: '0 auto', padding: '48px 20px', fontFamily: 'Segoe UI, sans-serif' },
  header: { textAlign: 'center', marginBottom: '40px' },
  titulo: { fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 'bold', color: '#1a4d2e', marginBottom: '16px' },
  descricao: { fontSize: '17px', color: '#555', lineHeight: '1.7', marginBottom: '24px' },
  botaoRefazer: { padding: '10px 24px', backgroundColor: 'transparent', border: '2px solid #1a4d2e', borderRadius: '8px', color: '#1a4d2e', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  abas: { display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' },
  aba: { flex: 1, padding: '12px 16px', backgroundColor: '#ffffff', border: '2px solid #2d7a3a', borderRadius: '8px', fontSize: '15px', color: '#1a4d2e', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', minWidth: '140px' },
  abaAtiva: { backgroundColor: '#1a4d2e', color: '#ffffff' },
  abaBloqueada: { backgroundColor: '#f0f0f0', border: '2px solid #ccc', color: '#999', cursor: 'not-allowed' },
  progressoContainer: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  progressoInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' },
  progressoTexto: { fontSize: '15px', fontWeight: 'bold', color: '#1a4d2e' },
  progressoNumero: { fontSize: '14px', color: '#666' },
  progressoFundo: { width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '8px' },
  progressoBarra: { height: '10px', backgroundColor: '#2d7a3a', borderRadius: '8px', transition: 'width 0.4s ease' },
  topicos: { display: 'flex', flexDirection: 'column', gap: '24px' },
  topicoCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', borderLeft: '6px solid #2d7a3a', transition: 'all 0.3s' },
  topicoCardConcluido: { borderLeft: '6px solid #27ae60', backgroundColor: '#f0fdf4' },
  topicoHeader: { display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' },
  topicoNumero: { backgroundColor: '#1a4d2e', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', flexShrink: 0 },
  topicoTitulo: { fontSize: '18px', fontWeight: 'bold', color: '#1a4d2e', margin: '0 0 4px 0' },
  topicoDesc: { fontSize: '14px', color: '#666', margin: 0 },
  checkBtn: { padding: '8px 16px', backgroundColor: '#ffffff', border: '2px solid #1a4d2e', borderRadius: '8px', fontSize: '13px', color: '#1a4d2e', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' },
  checkBtnConcluido: { backgroundColor: '#27ae60', border: '2px solid #27ae60', color: '#ffffff' },
  secoes: { display: 'flex', flexDirection: 'column', gap: '16px' },
  secao: { display: 'flex', flexDirection: 'column', gap: '8px' },
  secaoTitulo: { fontSize: '14px', fontWeight: 'bold', color: '#1a4d2e', margin: 0 },
  link: { fontSize: '14px', color: '#2d7a3a', textDecoration: 'none', display: 'block' },
  itemTexto: { fontSize: '14px', color: '#444', margin: 0 },
  desbloqueioContainer: { marginTop: '40px', backgroundColor: '#f0fdf4', border: '2px solid #27ae60', borderRadius: '12px', padding: '28px', textAlign: 'center' },
  desbloqueioTexto: { fontSize: '18px', color: '#1a4d2e', fontWeight: 'bold', marginBottom: '16px' },
  botaoDesbloquear: { padding: '14px 32px', backgroundColor: '#1a4d2e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
}

export default Trilha