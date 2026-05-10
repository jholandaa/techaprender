import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { signOut } from 'firebase/auth'

function Navbar() {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuarioLogado(user)
    })
    return () => unsubscribe()
  }, [])

  const handleSair = async () => {
    await signOut(auth)
    setMenuAberto(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">TechAprender</Link>

      <button
        className="navbar-hamburguer"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        {menuAberto ? '✕' : '☰'}
      </button>

      <div className={`navbar-links ${menuAberto ? 'aberto' : ''}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuAberto(false)}>
          Início
        </Link>
  <Link to="/sobre" className="navbar-link" onClick={() => setMenuAberto(false)}>
  Sobre
</Link>
        {usuarioLogado ? (
          <>
            <Link to="/dashboard" className="navbar-link" onClick={() => setMenuAberto(false)}>
              Meu Painel
            </Link>
            <button className="navbar-botao-sair" onClick={handleSair}>
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link" onClick={() => setMenuAberto(false)}>
              Entrar
            </Link>
            <Link to="/cadastro" className="navbar-botao-cadastrar" onClick={() => setMenuAberto(false)}>
              Cadastrar
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar