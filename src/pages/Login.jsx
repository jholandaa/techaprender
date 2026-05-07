import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setErro('')
    if (!email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }
    setCarregando(true)
    try {
      await signInWithEmailAndPassword(auth, email, senha)
      navigate('/dashboard')
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setErro('E-mail ou senha incorretos.')
      } else {
        setErro('Erro ao entrar. Tente novamente.')
      }
      setCarregando(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Entrar</h2>
        <p style={styles.subtitulo}>Bem-vinda de volta ao TechAprender</p>

        {erro && <p style={styles.erro}>{erro}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          style={{...styles.botao, opacity: carregando ? 0.7 : 1}}
          onClick={handleLogin}
          disabled={carregando}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

        <p style={styles.linkTexto}>
          Não tem conta?{' '}
          <Link to="/cadastro" style={styles.link}>Cadastrar</Link>
        </p>
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
    maxWidth: '420px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    borderTop: '4px solid #1a4d2e',
  },
  titulo: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#1a4d2e',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: '15px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '28px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  botao: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a4d2e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  erro: {
    color: '#c0392b',
    backgroundColor: '#fdecea',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    textAlign: 'center',
  },
  linkTexto: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#1a4d2e',
    fontWeight: 'bold',
    textDecoration: 'none',
  }
}

export default Login