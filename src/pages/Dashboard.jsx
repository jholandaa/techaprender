import { useEffect, useState } from 'react'
import { auth, db } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const nomeTrilha = {
  frontend: '🎨 Frontend',
  backend: '⚙️ Backend',
  dados: '📊 Dados'
}

function Dashboard() {
  const [usuario, setUsuario] = useState(null)
  const [trilha, setTrilha] = useState(null)
  const [primeiroNome, setPrimeiroNome] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUsuario(user)
        try {
          const docRef = doc(db, 'usuarios', user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const dados = docSnap.data()
            if (dados.trilha) setTrilha(dados.trilha)
            if (dados.nome) {
              const primeiro = dados.nome.trim().split(' ')[0]
              setPrimeiroNome(primeiro)
            }
          }
        } catch (e) {
          console.log('Erro ao buscar dados:', e)
        }
      } else {
        navigate('/login')
      }
    })
    return () => unsubscribe()
  }, [])

  const handleSair = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (!usuario) return null

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div>
          <h1 style={styles.titulo}>
            Olá, {primeiroNome || usuario.email}! 👋
          </h1>
          <p style={styles.subtitulo}>Bem-vinda ao seu painel de aprendizagem</p>
        </div>
        <button style={styles.botaoSair} onClick={handleSair}>Sair</button>
      </div>

      <div style={styles.cards}>

        <div style={styles.card}>
          <div style={styles.cardIcone}>🎯</div>
          <h3 style={styles.cardTitulo}>Sua Trilha</h3>
          {trilha ? (
            <>
              <p style={styles.cardTexto}>
                Sua trilha recomendada é <strong>{nomeTrilha[trilha]}</strong>!
              </p>
              <button style={styles.botao} onClick={() => navigate(`/trilha?area=${trilha}`)}>
                Acessar minha trilha
              </button>
              <button style={styles.botaoSecundario} onClick={() => navigate('/questionario')}>
                Refazer questionário
              </button>
            </>
          ) : (
            <>
              <p style={styles.cardTexto}>Você ainda não fez o questionário de perfil.</p>
              <button style={styles.botao} onClick={() => navigate('/questionario')}>
                Descobrir minha trilha
              </button>
            </>
          )}
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcone}>📚</div>
          <h3 style={styles.cardTitulo}>Trilhas Disponíveis</h3>
          <p style={styles.cardTexto}>Explore todas as áreas disponíveis na plataforma.</p>
          <div style={styles.trilhasLista}>
            <button style={styles.botaoTrilha} onClick={() => navigate('/trilha?area=frontend')}>
              🎨 Frontend
            </button>
            <button style={styles.botaoTrilha} onClick={() => navigate('/trilha?area=backend')}>
              ⚙️ Backend
            </button>
            <button style={styles.botaoTrilha} onClick={() => navigate('/trilha?area=dados')}>
              📊 Dados
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcone}>📝</div>
          <h3 style={styles.cardTitulo}>Questionário</h3>
          <p style={styles.cardTexto}>
            {trilha
              ? 'Refaça o questionário a qualquer momento para atualizar sua trilha.'
              : 'Responda o questionário para receber uma trilha personalizada.'}
          </p>
          <button style={styles.botao} onClick={() => navigate('/questionario')}>
            {trilha ? 'Refazer questionário' : 'Fazer questionário'}
          </button>
        </div>

      </div>

    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '48px 32px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  titulo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '4px',
  },
  subtitulo: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  botaoSair: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    border: '2px solid #c0392b',
    borderRadius: '8px',
    color: '#c0392b',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cards: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '28px',
    flex: '1',
    minWidth: '240px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
    borderTop: '4px solid #2d7a3a',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardIcone: {
    fontSize: '36px',
  },
  cardTitulo: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    margin: 0,
  },
  cardTexto: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    margin: 0,
    flex: 1,
  },
  botao: {
    padding: '12px',
    backgroundColor: '#1a4d2e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  botaoSecundario: {
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#1a4d2e',
    border: '2px solid #1a4d2e',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  trilhasLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  botaoTrilha: {
    padding: '10px',
    backgroundColor: '#f4f9f4',
    border: '1px solid #2d7a3a',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1a4d2e',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'left',
  }
}

export default Dashboard