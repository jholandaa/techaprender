import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'
import { useNavigate, Link } from 'react-router-dom'

function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const handleCadastro = async () => {
    setErro('')
    if (!nome || !email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }
    setCarregando(true)
    try {
      const resultado = await createUserWithEmailAndPassword(auth, email, senha)
      await setDoc(doc(db, 'usuarios', resultado.user.uid), {
        nome: nome,
        email: email,
        criadoEm: new Date()
      })
      navigate('/questionario')
    } catch (error) {
      console.log('Erro:', error.code, error.message)
      if (error.code === 'auth/email-already-in-use') {
        setErro('Este e-mail já está cadastrado.')
      } else {
        setErro('Erro ao cadastrar. Tente novamente.')
      }
      setCarregando(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Criar conta</h2>
        <p style={styles.subtitulo}>Comece sua jornada no TechAprender</p>

        {erro && <p style={styles.erro}>{erro}</p>}

        <input
          style={styles.input}
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
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
          placeholder="Crie uma senha (mín. 6 caracteres)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          style={{...styles.botao, opacity: carregando ? 0.7 : 1}}
          onClick={handleCadastro}
          disabled={carregando}
        >
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p style={styles.linkTexto}>
          Já tem conta?{' '}
          <Link to="/login" style={styles.link}>Entrar</Link>
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

export default Cadastro