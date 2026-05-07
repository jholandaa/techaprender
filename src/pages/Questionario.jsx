import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../services/firebase'
import { doc, setDoc } from 'firebase/firestore'

const perguntas = [
  {
    id: 1,
    texto: 'O que mais te atrai na área de tecnologia?',
    opcoes: [
      { texto: 'Criar interfaces bonitas e interativas', area: 'frontend' },
      { texto: 'Desenvolver sistemas e lógica de programação', area: 'backend' },
      { texto: 'Analisar dados e extrair informações', area: 'dados' },
    ]
  },
  {
    id: 2,
    texto: 'Qual dessas atividades você mais gostaria de fazer no dia a dia?',
    opcoes: [
      { texto: 'Trabalhar com design, cores e experiência do usuário', area: 'frontend' },
      { texto: 'Criar APIs, banco de dados e regras de negócio', area: 'backend' },
      { texto: 'Criar relatórios, gráficos e análises estatísticas', area: 'dados' },
    ]
  },
  {
    id: 3,
    texto: 'Com qual ferramenta você tem mais curiosidade em aprender?',
    opcoes: [
      { texto: 'React, CSS, Figma', area: 'frontend' },
      { texto: 'Node.js, Python, banco de dados', area: 'backend' },
      { texto: 'Power BI, SQL, Python para análise', area: 'dados' },
    ]
  },
  {
    id: 4,
    texto: 'Como você prefere trabalhar?',
    opcoes: [
      { texto: 'Focado no que o usuário vê e sente', area: 'frontend' },
      { texto: 'Focado na estrutura e funcionamento do sistema', area: 'backend' },
      { texto: 'Focado em números, padrões e insights', area: 'dados' },
    ]
  },
  {
    id: 5,
    texto: 'Qual resultado te daria mais satisfação?',
    opcoes: [
      { texto: 'Ver um site bonito e funcional que desenvolvi', area: 'frontend' },
      { texto: 'Ver um sistema robusto funcionando sem falhas', area: 'backend' },
      { texto: 'Descobrir um padrão importante nos dados que ajudou uma decisão', area: 'dados' },
    ]
  }
]

function Questionario() {
  const [respostas, setRespostas] = useState({})
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const navigate = useNavigate()

  const handleResposta = async (area) => {
    const novasRespostas = { ...respostas, [perguntaAtual]: area }
    setRespostas(novasRespostas)

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1)
    } else {
      const contagem = { frontend: 0, backend: 0, dados: 0 }
      Object.values(novasRespostas).forEach(a => contagem[a]++)
      const trilha = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0][0]

      const user = auth.currentUser
      if (user) {
        try {
          await setDoc(doc(db, 'usuarios', user.uid), {
            trilha: trilha,
            email: user.email
          }, { merge: true })
        } catch (e) {
          console.log('Erro ao salvar trilha:', e)
        }
      }

      navigate(`/trilha?area=${trilha}`)
    }
  }

  const progresso = ((perguntaAtual) / perguntas.length) * 100
  const pergunta = perguntas[perguntaAtual]

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <p style={styles.contador}>Pergunta {perguntaAtual + 1} de {perguntas.length}</p>

        <div style={styles.progressoFundo}>
          <div style={{...styles.progressoBarra, width: `${progresso}%`}} />
        </div>

        <h2 style={styles.pergunta}>{pergunta.texto}</h2>

        <div style={styles.opcoes}>
          {pergunta.opcoes.map((opcao, index) => (
            <button
              key={index}
              style={styles.opcao}
              onClick={() => handleResposta(opcao.area)}
              onMouseEnter={e => e.target.style.backgroundColor = '#1a4d2e'}
              onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
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
    padding: '32px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '580px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    borderTop: '4px solid #1a4d2e',
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
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '28px',
    textAlign: 'center',
    lineHeight: '1.4',
  },
  opcoes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  opcao: {
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid #1a4d2e',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#1a4d2e',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  }
}

export default Questionario