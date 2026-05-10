import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Questionario from '../pages/Questionario'
import Dashboard from '../pages/Dashboard'
import Trilha from '../pages/Trilha'
import Sobre from '../pages/Sobre'

function RotaProtegida({ children }) {
  const [verificando, setVerificando] = useState(true)
  const [logado, setLogado] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLogado(!!user)
      setVerificando(false)
    })
    return () => unsubscribe()
  }, [])

  if (verificando) return null
  return logado ? children : <Navigate to="/login" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/questionario" element={
        <RotaProtegida><Questionario /></RotaProtegida>
      } />
      <Route path="/dashboard" element={
        <RotaProtegida><Dashboard /></RotaProtegida>
      } />
      <Route path="/trilha" element={
        <RotaProtegida><Trilha /></RotaProtegida>
      } />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  )
}

export default AppRoutes