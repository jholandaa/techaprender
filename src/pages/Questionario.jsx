import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../services/firebase'
import { doc, setDoc } from 'firebase/firestore'

const perguntas = [
  {
    id: 1,
    texto: 'Você está desenvolvendo um sistema para uma escola. Qual parte do projeto te empolgaria mais trabalhar?',
    opcoes: [
      { texto: 'Desenhar as telas e a experiência do aluno', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Criar o banco que armazena notas e alunos', pontos: { frontend: 0, backend: 1, banco: 3, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Programar as regras de negócio do sistema', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Garantir que os dados dos alunos estejam seguros', pontos: { frontend: 0, backend: 0, banco: 1, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Criar um app para os alunos acessarem pelo celular', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Implementar recomendações de conteúdo com IA', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 2,
    texto: 'Um erro crítico aconteceu no sistema da empresa. O que você faz primeiro?',
    opcoes: [
      { texto: 'Verifico a interface para ver se o problema está visível ao usuário', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Analiso os logs do banco de dados para encontrar inconsistências', pontos: { frontend: 0, backend: 1, banco: 3, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Depuro o código do servidor para encontrar a falha', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Verifico se houve alguma invasão ou brecha de segurança', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Testo o app no celular para ver se o erro é específico do mobile', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Analiso os dados gerados para identificar padrões do erro', pontos: { frontend: 0, backend: 0, banco: 1, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 3,
    texto: 'Você tem um fim de semana livre para estudar tecnologia. O que você escolhe aprender?',
    opcoes: [
      { texto: 'Como criar animações e interfaces modernas com CSS e React', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Como modelar e otimizar consultas em banco de dados', pontos: { frontend: 0, backend: 0, banco: 3, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Como construir uma API REST do zero', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Como identificar e corrigir vulnerabilidades em sistemas', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Como publicar um aplicativo na Play Store', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Como treinar um modelo de machine learning com Python', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 4,
    texto: 'Uma startup te contrata como desenvolvedor. Qual função você escolheria?',
    opcoes: [
      { texto: 'Responsável pela identidade visual e experiência do usuário', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Administrador e arquiteto do banco de dados', pontos: { frontend: 0, backend: 0, banco: 3, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Desenvolvedor das regras de negócio e integrações', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Analista de segurança e proteção de dados', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Desenvolvedor do aplicativo mobile da startup', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Cientista de dados e desenvolvedor de modelos preditivos', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 5,
    texto: 'Qual dessas situações te daria mais satisfação ao resolver?',
    opcoes: [
      { texto: 'Ver um site bonito e intuitivo que desenvolvi sendo elogiado pelos usuários', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Descobrir que meu banco de dados suporta milhões de acessos sem falhar', pontos: { frontend: 0, backend: 1, banco: 3, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Ver uma API que desenvolvi sendo usada por outros sistemas com sucesso', pontos: { frontend: 0, backend: 3, banco: 0, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Identificar e bloquear uma tentativa de ataque antes que causasse dano', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Lançar um app que chegou ao top 10 da Play Store', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Ver meu modelo de IA fazer uma previsão correta que ajudou uma decisão', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 6,
    texto: 'Você precisa explicar tecnologia para um familiar leigo. Sobre o que falaria com mais entusiasmo?',
    opcoes: [
      { texto: 'Como os sites são construídos e como o design influencia o comportamento das pessoas', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Como os dados são organizados e recuperados de forma eficiente', pontos: { frontend: 0, backend: 0, banco: 3, ia: 1, seguranca: 0, mobile: 0 } },
      { texto: 'Como os sistemas conversam entre si através de APIs e serviços', pontos: { frontend: 0, backend: 3, banco: 0, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Como hackers agem e como nos protegemos no mundo digital', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Como os aplicativos do celular funcionam por dentro', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Como as máquinas aprendem a reconhecer padrões e tomar decisões', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 7,
    texto: 'Você precisa montar um portfólio para uma vaga de emprego. O que você desenvolveria?',
    opcoes: [
      { texto: 'Um site pessoal com design moderno e animações', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Um sistema com relatórios e dashboards de dados', pontos: { frontend: 0, backend: 0, banco: 3, ia: 1, seguranca: 0, mobile: 0 } },
      { texto: 'Uma API completa com autenticação e documentação', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Um relatório de análise de vulnerabilidades de um sistema', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Um aplicativo funcional publicado na loja', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Um projeto de análise de dados com visualizações e previsões', pontos: { frontend: 0, backend: 0, banco: 1, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 8,
    texto: 'Qual dessas frases mais combina com você?',
    opcoes: [
      { texto: 'Acredito que a primeira impressão do usuário é tudo', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Acredito que dados bem organizados são a base de tudo', pontos: { frontend: 0, backend: 0, banco: 3, ia: 1, seguranca: 0, mobile: 0 } },
      { texto: 'Acredito que um sistema robusto por dentro é o que importa', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Acredito que um sistema sem segurança é um sistema inútil', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Acredito que o futuro é mobile e tudo deve caber na palma da mão', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Acredito que dados e inteligência artificial vão transformar o mundo', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 9,
    texto: 'Durante uma aula prática, qual atividade você se envolveria mais?',
    opcoes: [
      { texto: 'Criar a interface de um sistema com HTML, CSS e JavaScript', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Modelar o banco de dados e escrever queries SQL', pontos: { frontend: 0, backend: 0, banco: 3, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Desenvolver o backend de uma aplicação com Node.js ou Python', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Realizar testes de invasão e análise de vulnerabilidades', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Desenvolver uma tela funcional em React Native', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Treinar e avaliar um modelo de classificação com dados reais', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  },
  {
    id: 10,
    texto: 'Um amigo te pede ajuda com o projeto dele. Em qual situação você se sentiria mais útil?',
    opcoes: [
      { texto: 'Ele precisa deixar o site mais bonito e responsivo', pontos: { frontend: 3, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 1 } },
      { texto: 'Ele precisa organizar e otimizar o banco de dados da aplicação', pontos: { frontend: 0, backend: 0, banco: 3, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Ele precisa criar um sistema de autenticação e integração com outras APIs', pontos: { frontend: 0, backend: 3, banco: 1, ia: 0, seguranca: 0, mobile: 0 } },
      { texto: 'Ele precisa proteger o sistema contra ataques e vazamento de dados', pontos: { frontend: 0, backend: 0, banco: 0, ia: 0, seguranca: 3, mobile: 0 } },
      { texto: 'Ele precisa adaptar o sistema para funcionar bem no celular', pontos: { frontend: 1, backend: 0, banco: 0, ia: 0, seguranca: 0, mobile: 3 } },
      { texto: 'Ele precisa criar um sistema que aprenda com os dados dos usuários', pontos: { frontend: 0, backend: 0, banco: 0, ia: 3, seguranca: 0, mobile: 0 } },
    ]
  }
]

const nomeArea = {
  frontend: 'Frontend',
  backend: 'Backend',
  banco: 'Banco de Dados',
  ia: 'Inteligência Artificial',
  seguranca: 'Segurança da Informação',
  mobile: 'Mobile'
}

function Questionario() {
  const [etapa, setEtapa] = useState('perguntas') // 'perguntas' | 'conhecimento' | 'miniteste'
  const [respostas, setRespostas] = useState({})
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [trilhaDefinida, setTrilhaDefinida] = useState(null)
  const navigate = useNavigate()

  const handleResposta = async (pontos) => {
    const novasRespostas = { ...respostas }
    Object.keys(pontos).forEach(area => {
      novasRespostas[area] = (novasRespostas[area] || 0) + pontos[area]
    })
    setRespostas(novasRespostas)

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1)
    } else {
      const trilha = Object.entries(novasRespostas).sort((a, b) => b[1] - a[1])[0][0]
      setTrilhaDefinida(trilha)
      setEtapa('conhecimento')
    }
  }

  const handleConhecimento = async (temConhecimento) => {
    if (!temConhecimento) {
      await salvarENavegar(trilhaDefinida, 'basico')
    } else {
      setEtapa('miniteste')
    }
  }

  const handleMiniteste = async (nivel) => {
    await salvarENavegar(trilhaDefinida, nivel)
  }

  const salvarENavegar = async (trilha, nivel) => {
    const user = auth.currentUser
    if (user) {
      try {
        await setDoc(doc(db, 'usuarios', user.uid), {
          trilha,
          nivelInicial: nivel,
          nivelAtual: nivel,
        }, { merge: true })
      } catch (e) {
        console.log('Erro ao salvar:', e)
      }
    }
    navigate(`/trilha?area=${trilha}&nivel=${nivel}`)
  }

  const progresso = (perguntaAtual / perguntas.length) * 100
  const pergunta = perguntas[perguntaAtual]

  // TELA DE CONHECIMENTO PRÉVIO
  if (etapa === 'conhecimento') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconeGrande}>🎯</div>
          <h2 style={styles.pergunta}>
            Sua área é <span style={styles.destaque}>{nomeArea[trilhaDefinida]}</span>!
          </h2>
          <p style={styles.subtexto}>
            Você já tem algum conhecimento em {nomeArea[trilhaDefinida]}?
          </p>
          <div style={styles.opcoes}>
            <button
              style={styles.opcaoConhecimento}
              onClick={() => handleConhecimento(false)}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a4d2e'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#1a4d2e' }}
            >
              🆕 Não, estou começando do zero
            </button>
            <button
              style={styles.opcaoConhecimento}
              onClick={() => handleConhecimento(true)}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a4d2e'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#1a4d2e' }}
            >
              ✅ Sim, já sei algumas coisas
            </button>
          </div>
        </div>
      </div>
    )
  }

  // TELA DE MINI-TESTE DE NÍVEL
  if (etapa === 'miniteste') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconeGrande}>📊</div>
          <h2 style={styles.pergunta}>Vamos identificar seu nível!</h2>
          <p style={styles.subtexto}>
            Como você descreveria seu conhecimento atual em {nomeArea[trilhaDefinida]}?
          </p>
          <div style={styles.opcoes}>
            <button
              style={{...styles.opcaoNivel, borderColor: '#2d7a3a'}}
              onClick={() => handleMiniteste('basico')}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2d7a3a'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#1a4d2e' }}
            >
              <span style={styles.nivelIcone}>🌱</span>
              <div>
                <strong>Básico</strong>
                <p style={styles.nivelDesc}>Conheço os conceitos fundamentais mas ainda não desenvolvi projetos reais</p>
              </div>
            </button>
            <button
              style={{...styles.opcaoNivel, borderColor: '#1a4d2e'}}
              onClick={() => handleMiniteste('intermediario')}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a4d2e'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#1a4d2e' }}
            >
              <span style={styles.nivelIcone}>🌿</span>
              <div>
                <strong>Intermediário</strong>
                <p style={styles.nivelDesc}>Já desenvolvi alguns projetos e conheço bem as ferramentas principais</p>
              </div>
            </button>
            <button
              style={{...styles.opcaoNivel, borderColor: '#0d2e1a'}}
              onClick={() => handleMiniteste('avancado')}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0d2e1a'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#1a4d2e' }}
            >
              <span style={styles.nivelIcone}>🌳</span>
              <div>
                <strong>Avançado</strong>
                <p style={styles.nivelDesc}>Tenho experiência sólida e já trabalhei em projetos complexos nessa área</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // TELA DAS PERGUNTAS PRINCIPAIS
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.contador}>Pergunta {perguntaAtual + 1} de {perguntas.length}</p>
        <div style={styles.progressoFundo}>
          <div style={{ ...styles.progressoBarra, width: `${progresso}%` }} />
        </div>
        <h2 style={styles.pergunta}>{pergunta.texto}</h2>
        <div style={styles.opcoes}>
          {pergunta.opcoes.map((opcao, index) => (
            <button
              key={index}
              style={styles.opcao}
              onClick={() => handleResposta(opcao.pontos)}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a4d2e'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#1a4d2e' }}
            >
              {opcao.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#f4f9f4',
    padding: '32px 20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '620px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    borderTop: '4px solid #1a4d2e',
  },
  iconeGrande: {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  destaque: {
    color: '#2d7a3a',
  },
  subtexto: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '28px',
    lineHeight: '1.6',
  },
  contador: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '8px',
    textAlign: 'center',
  },
  progressoFundo: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    marginBottom: '32px',
  },
  progressoBarra: {
    height: '8px',
    backgroundColor: '#2d7a3a',
    borderRadius: '8px',
    transition: 'width 0.3s ease',
  },
  pergunta: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '28px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  opcoes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  opcao: {
    padding: '14px 16px',
    backgroundColor: '#ffffff',
    border: '2px solid #1a4d2e',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1a4d2e',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    lineHeight: '1.4',
  },
  opcaoConhecimento: {
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid #1a4d2e',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#1a4d2e',
    cursor: 'pointer',
    textAlign: 'center',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  opcaoNivel: {
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1a4d2e',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  nivelIcone: {
    fontSize: '28px',
    flexShrink: 0,
  },
  nivelDesc: {
    fontSize: '13px',
    color: '#666',
    margin: '4px 0 0 0',
    fontWeight: 'normal',
    lineHeight: '1.4',
  }
}

export default Questionario