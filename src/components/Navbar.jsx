import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { signOut } from 'firebase/auth'

function Navbar() {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuarioLogado(user)
    })
    return () => unsubscribe()
  }, [])

  const handleSair = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>TechAprender</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Início</Link>

        {usuarioLogado ? (
          <>
            <Link to="/dashboard" style={styles.link}>Meu Painel</Link>
            <button style={styles.botaoSair} onClick={handleSair}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Entrar</Link>
            <Link to="/cadastro" style={styles.botaoCadastrar}>Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#1a4d2e',
    color: 'white',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '1px',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  },
  botaoCadastrar: {
    backgroundColor: '#ffffff',
    color: '#1a4d2e',
    padding: '8px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  botaoSair: {
    backgroundColor: 'transparent',
    border: '2px solid #ffffff',
    color: '#ffffff',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
}

export default Navbar