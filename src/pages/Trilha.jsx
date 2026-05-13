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
            emoji: '🏗️',
            descricao: 'A linguagem de marcação que estrutura toda página web.',
            motivacao: 'HTML é o esqueleto de toda página web. Sem ele, nada existe na internet!',
            videoaulas: [
              { titulo: 'HTML5 Completo — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ejkb_YpuHWs' },
              { titulo: 'HTML para iniciantes — Rafaella Ballerini', url: 'https://www.youtube.com/watch?v=3oSIqIqzN3M' },
            ],
            projetos: ['Página pessoal com HTML puro', 'Formulário de contato completo'],
            referencias: [
              { titulo: 'MDN Web Docs — HTML', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML' },
              { titulo: 'W3Schools HTML', url: 'https://www.w3schools.com/html/' },
            ],
          },
          {
            id: 'css',
            titulo: 'CSS3',
            emoji: '🎨',
            descricao: 'Responsável pela estilização, cores, layouts e animações.',
            motivacao: 'CSS transforma páginas simples em experiências visuais incríveis. É aqui que a magia acontece!',
            videoaulas: [
              { titulo: 'CSS3 Completo — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=K1PnUMJ5pos' },
              { titulo: 'Flexbox — Origamid', url: 'https://www.youtube.com/watch?v=s9tiFRoqTNY' },
              { titulo: 'CSS Grid — Origamid', url: 'https://www.youtube.com/watch?v=HhUlt4CqAlE' },
            ],
            projetos: ['Landing page responsiva', 'Cartão de perfil estilizado com animações'],
            referencias: [
              { titulo: 'MDN Web Docs — CSS', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS' },
              { titulo: 'CSS-Tricks', url: 'https://css-tricks.com' },
            ],
          },
          {
            id: 'javascript',
            titulo: 'JavaScript',
            emoji: '⚡',
            descricao: 'A linguagem de programação da web, responsável pela interatividade.',
            motivacao: 'JavaScript dá vida às páginas! Com ele você cria experiências dinâmicas e interativas que encantam os usuários.',
            videoaulas: [
              { titulo: 'JavaScript — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=BXqUH86F-kA' },
              { titulo: 'JavaScript para iniciantes — Rafaella Ballerini', url: 'https://www.youtube.com/watch?v=FdePtO5JSd0' },
              { titulo: 'DOM — Matheus Battisti', url: 'https://www.youtube.com/watch?v=UftSB4DaRU4' },
            ],
            projetos: ['Calculadora funcional', 'Lista de tarefas com localStorage', 'Quiz interativo com pontuação'],
            referencias: [
              { titulo: 'MDN Web Docs — JavaScript', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript' },
              { titulo: 'JavaScript.info', url: 'https://javascript.info' },
            ],
          },
        ]
      },
      intermediario: {
        topicos: [
          {
            id: 'react',
            titulo: 'React.js',
            emoji: '⚛️',
            descricao: 'Biblioteca JavaScript para construção de interfaces baseadas em componentes.',
            motivacao: 'React é usado por Facebook, Netflix e Airbnb. Dominar React abre as portas para as maiores empresas do mundo!',
            videoaulas: [
              { titulo: 'React — Matheus Battisti', url: 'https://www.youtube.com/watch?v=FXqX7oof0I4' },
              { titulo: 'React Hooks — Rocketseat', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' },
              { titulo: 'React na prática — Filipe Deschamps', url: 'https://www.youtube.com/watch?v=aJR7f45dBNs' },
            ],
            projetos: ['To-do list com React', 'Clone do Instagram', 'Dashboard com gráficos'],
            referencias: [
              { titulo: 'Documentação oficial React', url: 'https://react.dev' },
              { titulo: 'React Tutorial — W3Schools', url: 'https://www.w3schools.com/react/' },
            ],
          },
          {
            id: 'git',
            titulo: 'Git e GitHub',
            emoji: '🔀',
            descricao: 'Controle de versão e colaboração em projetos de software.',
            motivacao: 'Git é obrigatório no mercado de trabalho. Nenhuma empresa contrata quem não sabe versionamento!',
            videoaulas: [
              { titulo: 'Git e GitHub — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=xEKo29OWILE' },
              { titulo: 'Git para iniciantes — Rafaella Ballerini', url: 'https://www.youtube.com/watch?v=DqTITcMq68k' },
            ],
            projetos: ['Portfólio no GitHub Pages', 'Contribuição em projeto open source'],
            referencias: [
              { titulo: 'Documentação oficial Git', url: 'https://git-scm.com/doc' },
              { titulo: 'GitHub Docs', url: 'https://docs.github.com/pt' },
            ],
          },
          {
            id: 'responsividade',
            titulo: 'Responsividade e UX',
            emoji: '📱',
            descricao: 'Técnicas para criar interfaces que funcionam bem em qualquer dispositivo.',
            motivacao: 'Mais de 60% dos acessos são pelo celular. Saber fazer sites responsivos é essencial para qualquer desenvolvedor!',
            videoaulas: [
              { titulo: 'Design Responsivo — Origamid', url: 'https://www.youtube.com/watch?v=5KH4RUBQ0BU' },
              { titulo: 'UX para desenvolvedores — Rocketseat', url: 'https://www.youtube.com/watch?v=qposZM5TSCI' },
            ],
            projetos: ['Site completamente responsivo', 'Redesign de um site existente'],
            referencias: [
              { titulo: 'Web.dev — Responsividade', url: 'https://web.dev/responsive-web-design-basics/' },
              { titulo: 'Nielsen Norman Group — UX', url: 'https://www.nngroup.com/articles/' },
            ],
          },
        ]
      },
      avancado: {
        topicos: [
          {
            id: 'typescript',
            titulo: 'TypeScript',
            emoji: '🔷',
            descricao: 'Superset do JavaScript que adiciona tipagem estática ao código.',
            motivacao: 'TypeScript é o padrão em grandes projetos. Quem sabe TypeScript se destaca nas melhores vagas!',
            videoaulas: [
              { titulo: 'TypeScript — Rocketseat', url: 'https://www.youtube.com/watch?v=0mYq5LrQN1s' },
              { titulo: 'TypeScript do zero — Matheus Battisti', url: 'https://www.youtube.com/watch?v=aTf8QTjw4RE' },
            ],
            projetos: ['Reescrever um projeto React em TypeScript', 'API tipada com TypeScript'],
            referencias: [
              { titulo: 'Documentação oficial TypeScript', url: 'https://www.typescriptlang.org/docs/' },
              { titulo: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
            ],
          },
          {
            id: 'testes',
            titulo: 'Testes de Interface',
            emoji: '🧪',
            descricao: 'Garantir que os componentes funcionam corretamente com Jest e Testing Library.',
            motivacao: 'Código sem testes é código com prazo de validade. Testes garantem que sua aplicação funcione sempre!',
            videoaulas: [
              { titulo: 'Testes no React — Rocketseat', url: 'https://www.youtube.com/watch?v=OXdNGTEP0gE' },
              { titulo: 'Jest do zero — Filipe Deschamps', url: 'https://www.youtube.com/watch?v=TL1ByAIf8Ck' },
            ],
            projetos: ['Suite de testes para um projeto React', 'TDD — desenvolvimento orientado a testes'],
            referencias: [
              { titulo: 'Jest — Documentação', url: 'https://jestjs.io/pt-BR/' },
              { titulo: 'Testing Library', url: 'https://testing-library.com/' },
            ],
          },
          {
            id: 'performance',
            titulo: 'Performance e Deploy',
            emoji: '🚀',
            descricao: 'Otimização de aplicações e publicação em produção.',
            motivacao: 'Uma aplicação lenta perde usuários. Performance é o que separa projetos amadores de produtos profissionais!',
            videoaulas: [
              { titulo: 'Performance no React — Rocketseat', url: 'https://www.youtube.com/watch?v=cpH3e-gg9kY' },
              { titulo: 'Deploy com Vercel — Matheus Battisti', url: 'https://www.youtube.com/watch?v=KpHNGKuALCk' },
            ],
            projetos: ['Otimizar um projeto existente', 'Publicar app com CI/CD'],
            referencias: [
              { titulo: 'Web.dev — Performance', url: 'https://web.dev/performance/' },
              { titulo: 'Vercel Docs', url: 'https://vercel.com/docs' },
            ],
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
          { id: 'logica', titulo: 'Lógica de Programação', emoji: '🧠', descricao: 'Base fundamental para qualquer desenvolvedor.', motivacao: 'Lógica é o alicerce de tudo. Quem pensa bem, programa bem!', videoaulas: [{ titulo: 'Lógica de Programação — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=8mei6uVttho' }, { titulo: 'Lógica com Python — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=S9uPNppGsGo' }], projetos: ['Algoritmos de ordenação', 'Calculadora no terminal'], referencias: [{ titulo: 'Coursera — Algoritmos', url: 'https://www.coursera.org/learn/algoritmos' }, { titulo: 'Khan Academy — Programação', url: 'https://pt.khanacademy.org/computing/computer-programming' }] },
          { id: 'python', titulo: 'Python ou Node.js', emoji: '🐍', descricao: 'Linguagens principais para desenvolvimento backend.', motivacao: 'Python é a linguagem mais amada do mundo. Node.js roda em toda startup de sucesso. Escolha uma e domine!', videoaulas: [{ titulo: 'Python — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=S9uPNppGsGo' }, { titulo: 'Node.js — Rocketseat', url: 'https://www.youtube.com/watch?v=DiXbJL3iWVs' }], projetos: ['Script de automação de tarefas', 'API simples com Express'], referencias: [{ titulo: 'Documentação Python', url: 'https://docs.python.org/pt-br/3/' }, { titulo: 'Documentação Node.js', url: 'https://nodejs.org/pt-br/docs/' }] },
          { id: 'http', titulo: 'HTTP e APIs REST', emoji: '🌐', descricao: 'Fundamentos de comunicação na web.', motivacao: 'Toda aplicação moderna usa APIs. Entender HTTP é entender como a internet funciona por dentro!', videoaulas: [{ titulo: 'HTTP — Código Fonte TV', url: 'https://www.youtube.com/watch?v=CXzbUwK6lc8' }, { titulo: 'REST API — Rocketseat', url: 'https://www.youtube.com/watch?v=RSr85jzSTMk' }], projetos: ['Consumir uma API pública', 'Criar CRUD básico com Express'], referencias: [{ titulo: 'MDN — HTTP', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP' }, { titulo: 'REST API Tutorial', url: 'https://restfulapi.net/' }] },
        ]
      },
      intermediario: {
        topicos: [
          { id: 'jwt', titulo: 'Autenticação com JWT', emoji: '🔐', descricao: 'Sistema de autenticação seguro para APIs.', motivacao: 'Segurança é inegociável. JWT é o padrão de autenticação usado pelas maiores plataformas do mundo!', videoaulas: [{ titulo: 'JWT — Rocketseat', url: 'https://www.youtube.com/watch?v=EMIjNEpTuaU' }, { titulo: 'Auth com Node.js — Matheus Battisti', url: 'https://www.youtube.com/watch?v=qEBoZ8lJR3k' }], projetos: ['Sistema de login com JWT', 'API com refresh token e blacklist'], referencias: [{ titulo: 'JWT.io', url: 'https://jwt.io/introduction' }, { titulo: 'OWASP Auth Guide', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' }] },
          { id: 'orm', titulo: 'ORM — Prisma ou Sequelize', emoji: '🗃️', descricao: 'Abstração do banco de dados no código.', motivacao: 'ORMs aceleram o desenvolvimento e evitam erros. É como falar com o banco de dados na sua linguagem!', videoaulas: [{ titulo: 'Prisma — Matheus Battisti', url: 'https://www.youtube.com/watch?v=GxMGGkxI5AI' }, { titulo: 'Sequelize — Rocketseat', url: 'https://www.youtube.com/watch?v=Fbu7z5dXcRs' }], projetos: ['CRUD completo com Prisma e PostgreSQL', 'Sistema de blog com relações complexas'], referencias: [{ titulo: 'Documentação Prisma', url: 'https://www.prisma.io/docs' }, { titulo: 'Documentação Sequelize', url: 'https://sequelize.org/' }] },
          { id: 'nosql', titulo: 'NoSQL — MongoDB e Firebase', emoji: '☁️', descricao: 'Bancos de dados não relacionais modernos.', motivacao: 'NoSQL é usado por Twitter, Netflix e WhatsApp. Flexibilidade e escala são seus superpoderes!', videoaulas: [{ titulo: 'MongoDB — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=x9tC0eK0GtA' }, { titulo: 'Firebase — Matheus Battisti', url: 'https://www.youtube.com/watch?v=GxMGGkxI5AI' }], projetos: ['API com MongoDB', 'Chat em tempo real com Firebase'], referencias: [{ titulo: 'Documentação MongoDB', url: 'https://www.mongodb.com/docs/' }, { titulo: 'Firebase Docs', url: 'https://firebase.google.com/docs' }] },
        ]
      },
      avancado: {
        topicos: [
          { id: 'microsservicos', titulo: 'Microsserviços', emoji: '🔧', descricao: 'Arquitetura de sistemas distribuídos e escaláveis.', motivacao: 'Microsserviços são a arquitetura do futuro. Google, Amazon e Netflix usam isso para escalar para bilhões de usuários!', videoaulas: [{ titulo: 'Microsserviços — Full Cycle', url: 'https://www.youtube.com/watch?v=1Bld2c2248E' }, { titulo: 'Arquitetura — Rodrigo Branas', url: 'https://www.youtube.com/watch?v=7uvK4WInq6k' }], projetos: ['Sistema com 2+ microsserviços comunicando via API', 'Microsserviço de autenticação independente'], referencias: [{ titulo: 'Microservices.io', url: 'https://microservices.io/' }, { titulo: 'Martin Fowler — Microsserviços', url: 'https://martinfowler.com/articles/microservices.html' }] },
          { id: 'docker', titulo: 'Docker', emoji: '🐳', descricao: 'Containerização de aplicações para qualquer ambiente.', motivacao: 'Se funciona no Docker, funciona em qualquer lugar. Docker eliminou o famoso "na minha máquina funciona"!', videoaulas: [{ titulo: 'Docker — Código Fonte TV', url: 'https://www.youtube.com/watch?v=Kzcz-EVKBEQ' }, { titulo: 'Docker do zero — Full Cycle', url: 'https://www.youtube.com/watch?v=yb2udL9GG2U' }], projetos: ['Dockerizar uma API completa', 'Docker Compose com múltiplos serviços'], referencias: [{ titulo: 'Documentação Docker', url: 'https://docs.docker.com/' }, { titulo: 'Play with Docker', url: 'https://labs.play-with-docker.com/' }] },
          { id: 'cicd', titulo: 'CI/CD', emoji: '⚙️', descricao: 'Integração e entrega contínua automatizada.', motivacao: 'CI/CD é o que permite empresas lançar novas versões dezenas de vezes por dia com segurança e velocidade!', videoaulas: [{ titulo: 'GitHub Actions — Rocketseat', url: 'https://www.youtube.com/watch?v=ePDzExmRYoY' }, { titulo: 'CI/CD — Full Cycle', url: 'https://www.youtube.com/watch?v=s5MaRn7LBMM' }], projetos: ['Pipeline de deploy automatizado com GitHub Actions', 'Testes automáticos a cada commit'], referencias: [{ titulo: 'GitHub Actions Docs', url: 'https://docs.github.com/pt/actions' }, { titulo: 'CI/CD — Atlassian', url: 'https://www.atlassian.com/br/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment' }] },
        ]
      }
    }
  },
  banco: {
    titulo: '🗄️ Trilha Banco de Dados',
    descricao: 'Você tem perfil analítico e organizacional! Aprenda a modelar, administrar e otimizar bancos de dados.',
    niveis: {
      basico: {
        topicos: [
          { id: 'modelagem', titulo: 'Modelagem de Dados', emoji: '📐', descricao: 'Entidades, relacionamentos e diagramas ER.', motivacao: 'Um banco bem modelado é a diferença entre um sistema rápido e um sistema que trava. Tudo começa aqui!', videoaulas: [{ titulo: 'Modelagem — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=Q_KTYFgvu1s' }, { titulo: 'Diagrama ER — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Q_KTYFgvu1s' }], projetos: ['Modelar banco de uma biblioteca', 'Diagrama ER de uma loja virtual'], referencias: [{ titulo: 'Lucidchart — ER Diagrams', url: 'https://www.lucidchart.com/pages/er-diagrams' }, { titulo: 'DevMedia — Modelagem', url: 'https://www.devmedia.com.br/modelagem-de-dados' }] },
          { id: 'sql', titulo: 'SQL Básico', emoji: '🔍', descricao: 'SELECT, INSERT, UPDATE, DELETE e fundamentos.', motivacao: 'SQL é a linguagem mais antiga ainda em uso e continua sendo a mais demandada em vagas de emprego. Domine-a!', videoaulas: [{ titulo: 'SQL — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ofktsne-utM' }, { titulo: 'MySQL — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=Rp4MTmYLHJA' }], projetos: ['CRUD completo em SQL puro', 'Banco de dados de uma escola'], referencias: [{ titulo: 'W3Schools SQL', url: 'https://www.w3schools.com/sql/' }, { titulo: 'SQLZoo', url: 'https://sqlzoo.net/' }] },
          { id: 'normalizacao', titulo: 'Normalização', emoji: '✂️', descricao: 'Formas normais e eliminação de redundâncias.', motivacao: 'Normalização evita duplicidade e inconsistência. É o que separa um banco profissional de um banco amador!', videoaulas: [{ titulo: 'Normalização — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=GFQaEYEc8_8' }, { titulo: 'Formas Normais — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=GFQaEYEc8_8' }], projetos: ['Normalizar um banco existente', 'Identificar violações de 1FN, 2FN e 3FN'], referencias: [{ titulo: 'DevMedia — Normalização', url: 'https://www.devmedia.com.br/normalizacao-em-banco-de-dados' }, { titulo: 'Wikipedia — Normalização', url: 'https://pt.wikipedia.org/wiki/Normaliza%C3%A7%C3%A3o_de_dados' }] },
        ]
      },
      intermediario: {
        topicos: [
          { id: 'sqlavancado', titulo: 'SQL Avançado', emoji: '⚡', descricao: 'JOINs, subqueries, views e funções agregadas.', motivacao: 'SQL avançado multiplica sua produtividade. Consultas que levariam horas ficam prontas em segundos!', videoaulas: [{ titulo: 'SQL Avançado — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=nGwhNkdQTDM' }, { titulo: 'JOINs — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=Ofktsne-utM' }], projetos: ['Relatórios complexos com múltiplos JOINs', 'Dashboard de dados com SQL puro'], referencias: [{ titulo: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/' }, { titulo: 'LeetCode SQL', url: 'https://leetcode.com/problemset/database/' }] },
          { id: 'postgresql', titulo: 'PostgreSQL', emoji: '🐘', descricao: 'Banco relacional robusto, gratuito e completo.', motivacao: 'PostgreSQL é o banco preferido dos desenvolvedores profissionais. É gratuito, poderoso e usado em produção por grandes empresas!', videoaulas: [{ titulo: 'PostgreSQL — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=c2fHCMjk_Ys' }, { titulo: 'PostgreSQL do zero — Full Cycle', url: 'https://www.youtube.com/watch?v=c2fHCMjk_Ys' }], projetos: ['Sistema completo com PostgreSQL', 'Migração de MySQL para PostgreSQL'], referencias: [{ titulo: 'Documentação PostgreSQL', url: 'https://www.postgresql.org/docs/' }, { titulo: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/' }] },
          { id: 'procedures', titulo: 'Stored Procedures e Triggers', emoji: '⚙️', descricao: 'Automação de processos diretamente no banco.', motivacao: 'Procedures e triggers executam lógica automaticamente no banco. É eficiência em estado puro!', videoaulas: [{ titulo: 'Procedures — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=nGwhNkdQTDM' }, { titulo: 'Triggers — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=nGwhNkdQTDM' }], projetos: ['Sistema de auditoria automática com triggers', 'Procedure de relatório mensal'], referencias: [{ titulo: 'PostgreSQL — PL/pgSQL', url: 'https://www.postgresql.org/docs/current/plpgsql.html' }, { titulo: 'MySQL Stored Procedures', url: 'https://www.mysqltutorial.org/mysql-stored-procedure/' }] },
        ]
      },
      avancado: {
        topicos: [
          { id: 'otimizacao', titulo: 'Otimização e Índices', emoji: '🏎️', descricao: 'Performance em consultas complexas e grandes volumes.', motivacao: 'Índices podem tornar uma consulta 1000x mais rápida. Otimização é o que faz sistemas escalarem para milhões!', videoaulas: [{ titulo: 'Índices SQL — Bóson Treinamentos', url: 'https://www.youtube.com/watch?v=fsG1XaZEa78' }, { titulo: 'Query Performance — Full Cycle', url: 'https://www.youtube.com/watch?v=fsG1XaZEa78' }], projetos: ['Otimizar queries lentas com EXPLAIN ANALYZE', 'Benchmark antes e depois da otimização'], referencias: [{ titulo: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/' }, { titulo: 'PostgreSQL Performance', url: 'https://www.postgresql.org/docs/current/performance-tips.html' }] },
          { id: 'nosqlbd', titulo: 'NoSQL — MongoDB e Redis', emoji: '☁️', descricao: 'Bancos não relacionais para alta performance e flexibilidade.', motivacao: 'Redis processa 1 milhão de operações por segundo. MongoDB escala para qualquer volume. São ferramentas do futuro!', videoaulas: [{ titulo: 'Redis — Código Fonte TV', url: 'https://www.youtube.com/watch?v=HMEwYxXFTjM' }, { titulo: 'MongoDB Avançado — Traversy Media', url: 'https://www.youtube.com/watch?v=-56x56UppqQ' }], projetos: ['Sistema de cache com Redis', 'API com MongoDB e agregações complexas'], referencias: [{ titulo: 'Documentação MongoDB', url: 'https://www.mongodb.com/docs/' }, { titulo: 'Redis Documentation', url: 'https://redis.io/documentation' }] },
          { id: 'replicacao', titulo: 'Replicação e Alta Disponibilidade', emoji: '🔄', descricao: 'Bancos distribuídos e tolerância a falhas.', motivacao: 'Alta disponibilidade garante que seu sistema nunca caia. É o que bancos e hospitais exigem nos seus sistemas!', videoaulas: [{ titulo: 'Replicação — Full Cycle', url: 'https://www.youtube.com/watch?v=1Bld2c2248E' }, { titulo: 'HA com PostgreSQL — Bóson', url: 'https://www.youtube.com/watch?v=c2fHCMjk_Ys' }], projetos: ['Cluster de banco com replicação', 'Failover automático'], referencias: [{ titulo: 'PostgreSQL HA', url: 'https://www.postgresql.org/docs/current/high-availability.html' }, { titulo: 'MongoDB Replication', url: 'https://www.mongodb.com/docs/manual/replication/' }] },
        ]
      }
    }
  },
  ia: {
    titulo: '🤖 Trilha Inteligência Artificial',
    descricao: 'Você tem perfil para o futuro da tecnologia! Aprenda a criar sistemas inteligentes e trabalhar com dados.',
    niveis: {
      basico: {
        topicos: [
          { id: 'python_ia', titulo: 'Python para IA', emoji: '🐍', descricao: 'A linguagem principal para ciência de dados e IA.', motivacao: 'Python é a linguagem número 1 para IA. Todas as grandes descobertas em inteligência artificial foram feitas com Python!', videoaulas: [{ titulo: 'Python — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=S9uPNppGsGo' }, { titulo: 'Python para Data Science — Alura', url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4' }], projetos: ['Scripts de análise de dados', 'Automatizador de tarefas com Python'], referencias: [{ titulo: 'Documentação Python', url: 'https://docs.python.org/pt-br/3/' }, { titulo: 'Real Python', url: 'https://realpython.com/' }] },
          { id: 'pandas', titulo: 'Pandas e NumPy', emoji: '🐼', descricao: 'Bibliotecas essenciais para manipulação de dados.', motivacao: 'Pandas é o Excel dos programadores — mas 1000x mais poderoso. Com ele você processa milhões de registros em segundos!', videoaulas: [{ titulo: 'Pandas — Stack Overflow', url: 'https://www.youtube.com/watch?v=vmEHCJofslg' }, { titulo: 'NumPy — Sentdex', url: 'https://www.youtube.com/watch?v=GT1sRCC3DwQ' }], projetos: ['Análise exploratória de dataset público', 'Limpeza e transformação de dados reais'], referencias: [{ titulo: 'Documentação Pandas', url: 'https://pandas.pydata.org/docs/' }, { titulo: 'NumPy Documentation', url: 'https://numpy.org/doc/' }] },
          { id: 'estatistica', titulo: 'Estatística Básica', emoji: '📊', descricao: 'Fundamentos matemáticos para entender e interpretar dados.', motivacao: 'Estatística é o idioma dos dados. Sem ela, você vê números. Com ela, você enxerga padrões e insights valiosos!', videoaulas: [{ titulo: 'Estatística — Marcos Severo', url: 'https://www.youtube.com/watch?v=R2QGTbxNxoE' }, { titulo: 'Probabilidade — Khan Academy', url: 'https://www.youtube.com/watch?v=R2QGTbxNxoE' }], projetos: ['Análise estatística de dados reais', 'Relatório com média, mediana e desvio padrão'], referencias: [{ titulo: 'Khan Academy — Estatística', url: 'https://pt.khanacademy.org/math/statistics-probability' }, { titulo: 'StatQuest — YouTube', url: 'https://www.youtube.com/@statquest' }] },
        ]
      },
      intermediario: {
        topicos: [
          { id: 'ml', titulo: 'Machine Learning', emoji: '🤖', descricao: 'Algoritmos que aprendem com dados para fazer previsões.', motivacao: 'Machine Learning está em todo lugar — recomendações do Spotify, reconhecimento facial, carros autônomos. Você pode criar isso!', videoaulas: [{ titulo: 'ML — Sentdex', url: 'https://www.youtube.com/watch?v=OGxgnH8y2NM' }, { titulo: 'Intro ao ML — Google', url: 'https://www.youtube.com/watch?v=HcqpanDadyQ' }], projetos: ['Modelo de classificação de e-mails spam', 'Previsão de preços de imóveis'], referencias: [{ titulo: 'scikit-learn', url: 'https://scikit-learn.org/stable/' }, { titulo: 'Google ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }] },
          { id: 'sklearn', titulo: 'scikit-learn', emoji: '⚗️', descricao: 'A biblioteca de Machine Learning mais usada do mundo.', motivacao: 'scikit-learn coloca na sua mão os mesmos algoritmos usados por cientistas de dados do Google e Facebook!', videoaulas: [{ titulo: 'scikit-learn — Curso completo', url: 'https://www.youtube.com/watch?v=pqNCD_5r0IU' }, { titulo: 'ML com scikit-learn — Sentdex', url: 'https://www.youtube.com/watch?v=OGxgnH8y2NM' }], projetos: ['Pipeline completo de ML', 'Comparação de algoritmos em um dataset'], referencias: [{ titulo: 'scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html' }, { titulo: 'Kaggle — Datasets', url: 'https://www.kaggle.com/datasets' }] },
          { id: 'visualizacao', titulo: 'Visualização de Dados', emoji: '📈', descricao: 'Matplotlib, Seaborn e Plotly para comunicar insights.', motivacao: 'Um gráfico bem feito vale mais que mil linhas de dados. Visualização transforma números em decisões!', videoaulas: [{ titulo: 'Matplotlib — Sentdex', url: 'https://www.youtube.com/watch?v=q7Bo_J8x_dw' }, { titulo: 'Seaborn — Kimberly Fessel', url: 'https://www.youtube.com/watch?v=6GUZXDef2U0' }], projetos: ['Dashboard de dados interativo', 'Relatório visual de análise de mercado'], referencias: [{ titulo: 'Matplotlib Documentation', url: 'https://matplotlib.org/stable/' }, { titulo: 'Plotly Python', url: 'https://plotly.com/python/' }] },
        ]
      },
      avancado: {
        topicos: [
          { id: 'deeplearning', titulo: 'Deep Learning', emoji: '🧬', descricao: 'Redes neurais profundas com TensorFlow e PyTorch.', motivacao: 'Deep Learning é o que permite reconhecimento de voz, tradução automática e imagens médicas. Você está entrando no futuro!', videoaulas: [{ titulo: 'Deep Learning — Fast.ai', url: 'https://www.youtube.com/watch?v=0oyCUWLL_fU' }, { titulo: 'TensorFlow — TensorFlow oficial', url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk' }], projetos: ['Rede neural para reconhecimento de dígitos', 'Classificador de imagens com CNN'], referencias: [{ titulo: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' }, { titulo: 'Fast.ai — Curso gratuito', url: 'https://www.fast.ai/' }] },
          { id: 'nlp', titulo: 'NLP — Processamento de Linguagem Natural', emoji: '💬', descricao: 'Ensinar máquinas a entender e gerar linguagem humana.', motivacao: 'NLP está por trás do ChatGPT, Google Tradutor e Alexa. Dominar NLP é dominar a tecnologia mais quente do momento!', videoaulas: [{ titulo: 'NLP — Hugging Face', url: 'https://www.youtube.com/watch?v=00GKzGyWFEs' }, { titulo: 'Transformers — Yannic Kilcher', url: 'https://www.youtube.com/watch?v=TQQlZhbC5ps' }], projetos: ['Chatbot com NLP', 'Análise de sentimentos em reviews', 'Sumarizador de textos'], referencias: [{ titulo: 'Hugging Face — Learn', url: 'https://huggingface.co/learn' }, { titulo: 'NLTK Book', url: 'https://www.nltk.org/book/' }] },
          { id: 'mlops', titulo: 'MLOps', emoji: '🏭', descricao: 'Deploy, monitoramento e manutenção de modelos em produção.', motivacao: 'Um modelo que não está em produção não gera valor. MLOps é o que leva a IA do laboratório para o mundo real!', videoaulas: [{ titulo: 'MLOps — Full Cycle', url: 'https://www.youtube.com/watch?v=1Bld2c2248E' }, { titulo: 'MLflow — Databricks', url: 'https://www.youtube.com/watch?v=859OxXrt_TI' }], projetos: ['API de modelo ML em produção com FastAPI', 'Pipeline de retreinamento automático'], referencias: [{ titulo: 'ML-Ops.org', url: 'https://ml-ops.org/' }, { titulo: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html' }] },
        ]
      }
    }
  },
  seguranca: {
    titulo: '🔒 Trilha Segurança da Informação',
    descricao: 'Você tem perfil para proteger sistemas! Aprenda a identificar vulnerabilidades e defender aplicações contra ataques.',
    niveis: {
      basico: {
        topicos: [
          { id: 'redes', titulo: 'Fundamentos de Redes', emoji: '🌐', descricao: 'TCP/IP, DNS, HTTP e os protocolos que sustentam a internet.', motivacao: 'Segurança começa na rede. Quem não entende como a informação trafega, não consegue protegê-la!', videoaulas: [{ titulo: 'Redes — Curso em Vídeo', url: 'https://www.youtube.com/watch?v=F6ImodzPuTs' }, { titulo: 'TCP/IP — Código Fonte TV', url: 'https://www.youtube.com/watch?v=CXzbUwK6lc8' }], projetos: ['Análise de tráfego com Wireshark', 'Mapeamento de rede local'], referencias: [{ titulo: 'Coursera — Computer Networking', url: 'https://www.coursera.org/learn/computer-networking' }, { titulo: 'Cisco Networking Academy', url: 'https://www.netacad.com/' }] },
          { id: 'criptografia', titulo: 'Criptografia', emoji: '🔑', descricao: 'Hash, SSL/TLS, criptografia simétrica e assimétrica.', motivacao: 'Criptografia protege bilhões de transações bancárias todos os dias. É a ciência que mantém o mundo digital seguro!', videoaulas: [{ titulo: 'Criptografia — Código Fonte TV', url: 'https://www.youtube.com/watch?v=CcU5Kc_FN_4' }, { titulo: 'SSL/TLS — NetworkChuck', url: 'https://www.youtube.com/watch?v=j9QmMEWmcfo' }], projetos: ['Implementar criptografia em uma aplicação', 'Comparar algoritmos de hash'], referencias: [{ titulo: 'Cryptography.io', url: 'https://cryptography.io/en/latest/' }, { titulo: 'Khan Academy — Criptografia', url: 'https://pt.khanacademy.org/computing/computer-science/cryptography' }] },
          { id: 'owasp', titulo: 'OWASP Top 10', emoji: '⚠️', descricao: 'As 10 principais vulnerabilidades de segurança web.', motivacao: 'OWASP é o guia de segurança mais respeitado do mundo. Conhecer as Top 10 é o mínimo exigido em qualquer empresa!', videoaulas: [{ titulo: 'OWASP — NetworkChuck', url: 'https://www.youtube.com/watch?v=lc7scxvKQOo' }, { titulo: 'SQL Injection — LiveOverflow', url: 'https://www.youtube.com/watch?v=ciNHn38EyRc' }], projetos: ['Relatório de vulnerabilidades de um site', 'Testar aplicação contra OWASP Top 10'], referencias: [{ titulo: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }, { titulo: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' }] },
        ]
      },
      intermediario: {
        topicos: [
          { id: 'pentest', titulo: 'Pentest', emoji: '🕵️', descricao: 'Testes de penetração éticos para encontrar vulnerabilidades.', motivacao: 'Pentesters são hackers do bem, pagos para invadir sistemas antes dos criminosos. É uma das carreiras mais bem pagas em TI!', videoaulas: [{ titulo: 'Ethical Hacking — freeCodeCamp', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE' }, { titulo: 'Pentest com Metasploit — HackerSploit', url: 'https://www.youtube.com/watch?v=8lR27r8Y_ik' }], projetos: ['CTF — Capture The Flag no TryHackMe', 'Pentest em ambiente controlado com DVWA'], referencias: [{ titulo: 'HackTheBox', url: 'https://www.hackthebox.com/' }, { titulo: 'TryHackMe', url: 'https://tryhackme.com/' }] },
          { id: 'kali', titulo: 'Kali Linux', emoji: '🐉', descricao: 'O sistema operacional padrão para profissionais de segurança.', motivacao: 'Kali Linux é o arsenal do hacker ético. Com mais de 600 ferramentas de segurança, é o ambiente definitivo para quem quer testar e proteger sistemas!', videoaulas: [{ titulo: 'Kali Linux — NetworkChuck', url: 'https://www.youtube.com/watch?v=lZAoFs75_cs' }, { titulo: 'Kali do zero — HackerSploit', url: 'https://www.youtube.com/watch?v=ElWo5fd4rIU' }], projetos: ['Ambiente de lab com Kali Linux em VM', 'Varredura de rede com nmap'], referencias: [{ titulo: 'Kali Linux Docs', url: 'https://www.kali.org/docs/' }, { titulo: 'Offensive Security', url: 'https://www.offensive-security.com/' }] },
          { id: 'webseq', titulo: 'Segurança em Aplicações Web', emoji: '🛡️', descricao: 'SQL Injection, XSS, CSRF e como se defender.', motivacao: 'Aplicações web são o principal alvo de ataques. Saber como atacar é o primeiro passo para saber como defender!', videoaulas: [{ titulo: 'Web Security — PortSwigger', url: 'https://www.youtube.com/watch?v=X4eRbHgRqGk' }, { titulo: 'XSS e CSRF — LiveOverflow', url: 'https://www.youtube.com/watch?v=L5l9lSnNMxg' }], projetos: ['Explorar e corrigir vulnerabilidades no DVWA', 'Implementar proteções contra XSS e CSRF'], referencias: [{ titulo: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' }, { titulo: 'OWASP WebGoat', url: 'https://owasp.org/www-project-webgoat/' }] },
        ]
      },
      avancado: {
        topicos: [
          { id: 'forense', titulo: 'Forense Digital', emoji: '🔬', descricao: 'Investigação de incidentes e análise de evidências digitais.', motivacao: 'Forense digital é usada por polícias, empresas e governos para investigar crimes cibernéticos. Uma habilidade rara e muito valorizada!', videoaulas: [{ titulo: 'Forense Digital — SANS', url: 'https://www.youtube.com/watch?v=Bjd5rb_eYHU' }, { titulo: 'Autopsy — 13Cubed', url: 'https://www.youtube.com/watch?v=5mPNKOaABGs' }], projetos: ['Análise forense de disco comprometido com Autopsy', 'Recuperação de arquivos deletados'], referencias: [{ titulo: 'SANS DFIR', url: 'https://www.sans.org/cyber-security-courses/digital-forensics-essentials/' }, { titulo: 'Forensics Wiki', url: 'https://forensics.wiki/' }] },
          { id: 'devsecops', titulo: 'DevSecOps', emoji: '🔐', descricao: 'Segurança integrada ao ciclo de desenvolvimento de software.', motivacao: 'DevSecOps é o futuro do desenvolvimento seguro. Empresas que adotam economizam milhões em correções e incidentes!', videoaulas: [{ titulo: 'DevSecOps — TechWorld with Nana', url: 'https://www.youtube.com/watch?v=OXdNGTEP0gE' }, { titulo: 'SAST e DAST — Snyk', url: 'https://www.youtube.com/watch?v=F5KJVuii0Yw' }], projetos: ['Pipeline CI/CD com análise de segurança automática', 'Scan de dependências vulneráveis com Snyk'], referencias: [{ titulo: 'DevSecOps.org', url: 'https://www.devsecops.org/' }, { titulo: 'Snyk — Security Platform', url: 'https://snyk.io/' }] },
          { id: 'cloudsec', titulo: 'Segurança em Cloud', emoji: '☁️', descricao: 'Proteção de ambientes AWS, GCP e Azure.', motivacao: 'Toda empresa migrou para a nuvem. Especialistas em cloud security são os mais escassos e os mais bem pagos do mercado!', videoaulas: [{ titulo: 'AWS Security — AWS', url: 'https://www.youtube.com/watch?v=N4pT3-7b5Rs' }, { titulo: 'Cloud Security — NetworkChuck', url: 'https://www.youtube.com/watch?v=M988_fsOSWo' }], projetos: ['Auditoria de segurança em conta AWS', 'Implementar IAM e políticas de acesso mínimo'], referencias: [{ titulo: 'AWS Security', url: 'https://aws.amazon.com/security/' }, { titulo: 'CIS Benchmarks', url: 'https://www.cisecurity.org/cis-benchmarks/' }] },
        ]
      }
    }
  },
  mobile: {
    titulo: '📱 Trilha Mobile',
    descricao: 'Você tem perfil para criar aplicativos! Aprenda a desenvolver apps modernos para Android e iOS.',
    niveis: {
      basico: {
        topicos: [
          { id: 'rn_intro', titulo: 'Introdução ao React Native', emoji: '📱', descricao: 'Fundamentos do desenvolvimento mobile com React Native.', motivacao: 'React Native permite criar apps para iOS e Android com um único código. Uma habilidade, duas plataformas, mercado gigantesco!', videoaulas: [{ titulo: 'React Native — Rocketseat', url: 'https://www.youtube.com/watch?v=0DhQd_EK1Ng' }, { titulo: 'React Native do zero — William Canin', url: 'https://www.youtube.com/watch?v=XcU9GEUZTQA' }], projetos: ['App de lista de tarefas', 'App de calculadora com design bonito'], referencias: [{ titulo: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started' }, { titulo: 'Expo Documentation', url: 'https://docs.expo.dev/' }] },
          { id: 'componentes_mobile', titulo: 'Componentes e Navegação', emoji: '🗺️', descricao: 'Estrutura de telas, pilhas de navegação e tabs.', motivacao: 'Navegação é o coração de qualquer app. Um app bem estruturado faz o usuário querer ficar e voltar sempre!', videoaulas: [{ titulo: 'React Navigation — William Canin', url: 'https://www.youtube.com/watch?v=XcU9GEUZTQA' }, { titulo: 'Stack e Tab Navigation — Rocketseat', url: 'https://www.youtube.com/watch?v=0DhQd_EK1Ng' }], projetos: ['App com 4+ telas e navegação entre elas', 'App com menu de abas inferior'], referencias: [{ titulo: 'React Navigation Docs', url: 'https://reactnavigation.org/docs/getting-started' }, { titulo: 'Expo Router', url: 'https://docs.expo.dev/router/introduction/' }] },
          { id: 'estilizacao_mobile', titulo: 'Estilização Mobile', emoji: '🎨', descricao: 'StyleSheet, design responsivo e componentes visuais.', motivacao: 'O design de um app é seu cartão de visitas. Apps bonitos são baixados, apps feios são deletados!', videoaulas: [{ titulo: 'Estilização RN — Rocketseat', url: 'https://www.youtube.com/watch?v=TjIBTSqBOjw' }, { titulo: 'UI Design em React Native — Unsure Programmer', url: 'https://www.youtube.com/watch?v=ANdSdIlgsEw' }], projetos: ['Interface de app de clima com design profissional', 'Clone de tela de app famoso (Uber, iFood)'], referencias: [{ titulo: 'React Native StyleSheet', url: 'https://reactnative.dev/docs/style' }, { titulo: 'NativeWind — Tailwind para RN', url: 'https://www.nativewind.dev/' }] },
        ]
      },
      intermediario: {
        topicos: [
          { id: 'api_mobile', titulo: 'Integração com APIs', emoji: '🔌', descricao: 'Consumo de APIs REST e gerenciamento de dados externos.', motivacao: 'Apps sem dados são apps mortos. Integrar APIs transforma um app estático em uma experiência viva e dinâmica!', videoaulas: [{ titulo: 'Axios no React Native — Matheus Battisti', url: 'https://www.youtube.com/watch?v=TjIBTSqBOjw' }, { titulo: 'React Query — Rocketseat', url: 'https://www.youtube.com/watch?v=vxkbf5QMA2g' }], projetos: ['App de notícias consumindo API real', 'App de previsão do tempo com API'], referencias: [{ titulo: 'Axios Documentation', url: 'https://axios-http.com/docs/intro' }, { titulo: 'TanStack Query', url: 'https://tanstack.com/query/latest' }] },
          { id: 'estado', titulo: 'Gerenciamento de Estado', emoji: '🧩', descricao: 'Context API, Zustand e Redux para gerenciar dados globais.', motivacao: 'Estado global bem gerenciado é o segredo dos apps que não travam. É o que separa apps amadores de apps profissionais!', videoaulas: [{ titulo: 'Context API — Rocketseat', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' }, { titulo: 'Zustand — Matheus Battisti', url: 'https://www.youtube.com/watch?v=0dKB8gQkxKI' }], projetos: ['App de carrinho de compras com estado global', 'App com autenticação persistente'], referencias: [{ titulo: 'Zustand Documentation', url: 'https://zustand-demo.pmnd.rs/' }, { titulo: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' }] },
          { id: 'firebase_mobile', titulo: 'Firebase no Mobile', emoji: '🔥', descricao: 'Autenticação, banco de dados em tempo real e notificações push.', motivacao: 'Firebase elimina a necessidade de backend próprio. Com ele, você lança apps completos em tempo recorde!', videoaulas: [{ titulo: 'Firebase + React Native — Rocketseat', url: 'https://www.youtube.com/watch?v=TjIBTSqBOjw' }, { titulo: 'Push Notifications — Simon Grimm', url: 'https://www.youtube.com/watch?v=zcVSuvMK97Q' }], projetos: ['App de chat em tempo real', 'App com login social e notificações'], referencias: [{ titulo: 'React Native Firebase', url: 'https://rnfirebase.io/' }, { titulo: 'Expo Notifications', url: 'https://docs.expo.dev/push-notifications/overview/' }] },
        ]
      },
      avancado: {
        topicos: [
          { id: 'performance_mobile', titulo: 'Performance Mobile', emoji: '⚡', descricao: 'Otimização, profiling e boas práticas para apps rápidos.', motivacao: 'Um app lento perde 53% dos usuários em menos de 3 segundos. Performance é o que retém usuários e gera receita!', videoaulas: [{ titulo: 'Performance RN — Rocketseat', url: 'https://www.youtube.com/watch?v=cpH3e-gg9kY' }, { titulo: 'React Native Profiling — William Candillon', url: 'https://www.youtube.com/watch?v=f187R3yAaxI' }], projetos: ['Otimizar app existente com Flashlist e memo', 'Análise de performance com Flipper'], referencias: [{ titulo: 'React Native Performance', url: 'https://reactnative.dev/docs/performance' }, { titulo: 'Shopify Flashlist', url: 'https://shopify.github.io/flash-list/' }] },
          { id: 'testes_mobile', titulo: 'Testes com Detox e Jest', emoji: '🧪', descricao: 'Testes unitários, de integração e end-to-end em apps mobile.', motivacao: 'Apps sem testes quebram em produção na hora errada. Testes automatizados são o seguro do seu app!', videoaulas: [{ titulo: 'Detox — Wix Engineering', url: 'https://www.youtube.com/watch?v=tU_LvK8gOhI' }, { titulo: 'Jest no React Native — Rocketseat', url: 'https://www.youtube.com/watch?v=OXdNGTEP0gE' }], projetos: ['Suite de testes E2E para app', 'Testes unitários de hooks e componentes'], referencias: [{ titulo: 'Detox Documentation', url: 'https://wix.github.io/Detox/' }, { titulo: 'Testing React Native — Docs', url: 'https://reactnative.dev/docs/testing-overview' }] },
          { id: 'nativo', titulo: 'Kotlin e Swift', emoji: '🏗️', descricao: 'Desenvolvimento nativo para máxima performance e acesso a recursos do dispositivo.', motivacao: 'Kotlin e Swift abrem portas para recursos exclusivos de cada plataforma. É o próximo nível do desenvolvimento mobile!', videoaulas: [{ titulo: 'Kotlin para Android — Alura', url: 'https://www.youtube.com/watch?v=r0HMRWiP-i4' }, { titulo: 'Swift — Paul Hudson', url: 'https://www.youtube.com/watch?v=comQ1-x2a1Q' }], projetos: ['App nativo simples para Android em Kotlin', 'Módulo nativo integrado ao React Native'], referencias: [{ titulo: 'Android Developers — Kotlin', url: 'https://developer.android.com/kotlin' }, { titulo: 'Swift.org', url: 'https://www.swift.org/documentation/' }] },
        ]
      }
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

  // Lógica de exibição gradual dos tópicos
  const topicosVisiveis = (topicos) => {
    let ultimoConcluido = -1
    topicos.forEach((t, i) => {
      if (checks[`${area}_${abaAtiva}_${t.id}`]) ultimoConcluido = i
    })
    return topicos.filter((_, i) => i <= ultimoConcluido + 1)
  }

  if (carregando) return (
    <div style={styles.loading}>
      <div style={styles.loadingSpinner}>⏳</div>
      <p>Carregando sua trilha...</p>
    </div>
  )

  const topicosAba = trilha.niveis[abaAtiva]?.topicos || []
  const topicosExibidos = topicosVisiveis(topicosAba)
  const idxNivelAtual = ordemNiveis.indexOf(nivelAtual)
  const temProximo = idxNivelAtual < ordemNiveis.length - 1
  const concluidos = topicosAba.filter(t => checks[`${area}_${abaAtiva}_${t.id}`]).length
  const porcentagem = topicosAba.length > 0 ? Math.round((concluidos / topicosAba.length) * 100) : 0

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.titulo}>{trilha.titulo}</h1>
        <p style={styles.descricao}>{trilha.descricao}</p>
        <button style={styles.botaoRefazer} onClick={() => navigate('/questionario')}>
          🔄 Refazer questionário
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
          <span style={styles.progressoTexto}>Progresso em {labelNivel[abaAtiva]}</span>
          <span style={styles.progressoNumero}>{concluidos} de {topicosAba.length} tópicos — {porcentagem}%</span>
        </div>
        <div style={styles.progressoFundo}>
          <div style={{ ...styles.progressoBarra, width: `${porcentagem}%` }} />
        </div>
      </div>

      {/* TÓPICOS COM EXIBIÇÃO GRADUAL */}
      <div style={styles.topicos}>
        {topicosExibidos.map((topico, index) => {
          const checkKey = `${area}_${abaAtiva}_${topico.id}`
          const concluido = !!checks[checkKey]
          const eAtual = index === topicosExibidos.length - 1 && !concluido

          return (
            <div
              key={topico.id}
              style={{
                ...styles.topicoCard,
                ...(concluido ? styles.topicoCardConcluido : {}),
                ...(eAtual ? styles.topicoCardAtual : {}),
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* BADGE DO TÓPICO */}
              <div style={styles.topicoBadge}>
                <div style={{ ...styles.topicoNumero, ...(concluido ? styles.topicoNumeroConcluido : {}) }}>
                  {concluido ? '✓' : index + 1}
                </div>
                <div style={styles.topicoEmoji}>{topico.emoji}</div>
                {eAtual && <div style={styles.badgeAtual}>Estudando agora</div>}
                {concluido && <div style={styles.badgeConcluido}>Concluído ✅</div>}
              </div>

              {/* TÍTULO E MOTIVAÇÃO */}
              <div style={styles.topicoHeaderInfo}>
                <h3 style={styles.topicoTitulo}>{topico.titulo}</h3>
                <p style={styles.topicoDesc}>{topico.descricao}</p>
                <div style={styles.motivacaoBox}>
                  <span style={styles.motivacaoIcone}>💡</span>
                  <p style={styles.motivacaoTexto}>{topico.motivacao}</p>
                </div>
              </div>

              {/* CONTEÚDO */}
              <div style={styles.secoes}>

                <div style={styles.secao}>
                  <h4 style={styles.secaoTitulo}>🎥 Videoaulas gratuitas</h4>
                  <div style={styles.listaCards}>
                    {topico.videoaulas.map((v, i) => (
                      <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={styles.videoCard}>
                        <span style={styles.videoIcone}>▶️</span>
                        <span style={styles.videoTitulo}>{v.titulo}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div style={styles.secao}>
                  <h4 style={styles.secaoTitulo}>🛠️ Projetos práticos sugeridos</h4>
                  <div style={styles.projetosGrid}>
                    {topico.projetos.map((p, i) => (
                      <div key={i} style={styles.projetoCard}>
                        <span style={styles.projetoIcone}>💡</span>
                        <span style={styles.projetoTexto}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.secao}>
                  <h4 style={styles.secaoTitulo}>📚 Referências e documentação</h4>
                  <div style={styles.listaCards}>
                    {topico.referencias.map((r, i) => (
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={styles.referenciaCard}>
                        <span>🔗</span>
                        <span>{r.titulo}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* BOTÃO DE CHECK */}
              <button
                style={{ ...styles.checkBtn, ...(concluido ? styles.checkBtnConcluido : {}) }}
                onClick={() => handleCheck(topico.id)}
              >
                {concluido ? '↩️ Desmarcar tópico' : '✅ Marcar como concluído'}
              </button>

            </div>
          )
        })}
      </div>

      {/* CONCLUSÃO DO NÍVEL */}
      {todosChecados(abaAtiva) && abaAtiva === nivelAtual && temProximo && (
        <div style={styles.desbloqueioContainer}>
          <div style={styles.desbloqueioEmoji}>🎉</div>
          <h2 style={styles.desbloqueioTitulo}>Parabéns! Você concluiu o {labelNivel[nivelAtual]}!</h2>
          <p style={styles.desbloqueioDesc}>
            Você dominou todos os tópicos deste nível. Está pronto para o próximo desafio!
          </p>
          <button style={styles.botaoDesbloquear} onClick={desbloquearProximo}>
            🚀 Desbloquear {labelNivel[ordemNiveis[idxNivelAtual + 1]]}
          </button>
        </div>
      )}

      {/* CONCLUSÃO TOTAL */}
      {todosChecados(abaAtiva) && !temProximo && abaAtiva === 'avancado' && (
        <div style={{ ...styles.desbloqueioContainer, background: 'linear-gradient(135deg, #1a4d2e, #2d7a3a)' }}>
          <div style={styles.desbloqueioEmoji}>🏆</div>
          <h2 style={{ ...styles.desbloqueioTitulo, color: 'white' }}>Trilha concluída!</h2>
          <p style={{ ...styles.desbloqueioDesc, color: 'rgba(255,255,255,0.9)' }}>
            Incrível! Você completou toda a {trilha.titulo}. Você está pronto para o mercado de trabalho!
          </p>
        </div>
      )}

    </div>
  )
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '48px 20px', fontFamily: 'Segoe UI, sans-serif' },
  loading: { textAlign: 'center', padding: '80px 20px', color: '#1a4d2e', fontSize: '18px' },
  loadingSpinner: { fontSize: '48px', marginBottom: '16px' },

  header: { textAlign: 'center', marginBottom: '40px' },
  titulo: { fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 'bold', color: '#1a4d2e', marginBottom: '12px' },
  descricao: { fontSize: '17px', color: '#555', lineHeight: '1.7', marginBottom: '24px', maxWidth: '680px', margin: '0 auto 24px' },
  botaoRefazer: { padding: '10px 24px', backgroundColor: 'transparent', border: '2px solid #1a4d2e', borderRadius: '8px', color: '#1a4d2e', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },

  abas: { display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' },
  aba: { flex: 1, padding: '14px 16px', backgroundColor: '#ffffff', border: '2px solid #2d7a3a', borderRadius: '10px', fontSize: '15px', color: '#1a4d2e', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', minWidth: '140px' },
  abaAtiva: { backgroundColor: '#1a4d2e', color: '#ffffff', boxShadow: '0 4px 12px rgba(26,77,46,0.3)' },
  abaBloqueada: { backgroundColor: '#f0f0f0', border: '2px solid #ddd', color: '#aaa', cursor: 'not-allowed' },

  progressoContainer: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  progressoInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' },
  progressoTexto: { fontSize: '15px', fontWeight: 'bold', color: '#1a4d2e' },
  progressoNumero: { fontSize: '14px', color: '#666' },
  progressoFundo: { width: '100%', height: '12px', backgroundColor: '#e0e0e0', borderRadius: '8px' },
  progressoBarra: { height: '12px', backgroundColor: '#2d7a3a', borderRadius: '8px', transition: 'width 0.5s ease', background: 'linear-gradient(90deg, #1a4d2e, #2d7a3a, #3d9e4e)' },

  topicos: { display: 'flex', flexDirection: 'column', gap: '28px' },

  topicoCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
    borderLeft: '6px solid #2d7a3a',
    animation: 'fadeIn 0.5s ease forwards',
    transition: 'all 0.3s ease',
  },
  topicoCardAtual: {
    borderLeft: '6px solid #1a4d2e',
    boxShadow: '0 8px 32px rgba(26,77,46,0.15)',
    transform: 'scale(1.01)',
  },
  topicoCardConcluido: {
    borderLeft: '6px solid #27ae60',
    backgroundColor: '#f0fdf4',
  },

  topicoBadge: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' },
  topicoNumero: {
    backgroundColor: '#1a4d2e',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    flexShrink: 0,
  },
  topicoNumeroConcluido: { backgroundColor: '#27ae60' },
  topicoEmoji: { fontSize: '32px' },
  badgeAtual: {
    backgroundColor: '#1a4d2e',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    animation: 'pulse 2s infinite',
  },
  badgeConcluido: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },

  topicoHeaderInfo: { marginBottom: '24px' },
  topicoTitulo: { fontSize: '22px', fontWeight: 'bold', color: '#1a4d2e', margin: '0 0 8px 0' },
  topicoDesc: { fontSize: '16px', color: '#555', margin: '0 0 16px 0', lineHeight: '1.6' },
  motivacaoBox: {
    display: 'flex',
    gap: '12px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #2d7a3a',
    borderRadius: '10px',
    padding: '12px 16px',
    alignItems: 'flex-start',
  },
  motivacaoIcone: { fontSize: '20px', flexShrink: 0 },
  motivacaoTexto: { fontSize: '14px', color: '#2d6a3a', margin: 0, lineHeight: '1.6', fontStyle: 'italic' },

  secoes: { display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' },
  secao: { display: 'flex', flexDirection: 'column', gap: '10px' },
  secaoTitulo: { fontSize: '16px', fontWeight: 'bold', color: '#1a4d2e', margin: 0 },

  listaCards: { display: 'flex', flexDirection: 'column', gap: '8px' },
  videoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#1a4d2e',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
    border: '1px solid #e0e0e0',
  },
  videoIcone: { fontSize: '20px', flexShrink: 0 },
  videoTitulo: { flex: 1 },

  projetosGrid: { display: 'flex', flexDirection: 'column', gap: '8px' },
  projetoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: '#fffbf0',
    borderRadius: '8px',
    border: '1px solid #ffd',
    fontSize: '14px',
    color: '#444',
  },
  projetoIcone: { fontSize: '18px', flexShrink: 0 },
  projetoTexto: { flex: 1, fontWeight: '500' },

  referenciaCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: '#f0f4ff',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#1a4d2e',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #dde',
  },

  checkBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid #1a4d2e',
    borderRadius: '10px',
    fontSize: '16px',
    color: '#1a4d2e',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  checkBtnConcluido: {
    backgroundColor: '#f0fdf4',
    border: '2px solid #27ae60',
    color: '#27ae60',
  },

  desbloqueioContainer: {
    marginTop: '40px',
    backgroundColor: '#f0fdf4',
    border: '2px solid #27ae60',
    borderRadius: '16px',
    padding: '40px',
    textAlign: 'center',
  },
  desbloqueioEmoji: { fontSize: '56px', marginBottom: '16px' },
  desbloqueioTitulo: { fontSize: '24px', fontWeight: 'bold', color: '#1a4d2e', marginBottom: '12px' },
  desbloqueioDesc: { fontSize: '16px', color: '#555', marginBottom: '24px', lineHeight: '1.6' },
  botaoDesbloquear: {
    padding: '16px 40px',
    backgroundColor: '#1a4d2e',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(26,77,46,0.3)',
  },
}

export default Trilha