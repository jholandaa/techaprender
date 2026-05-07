function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.texto}>© 2026 TechAprender — Desenvolvido por Juliana Holanda</p>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#1a4d2e',
    color: 'white',
    textAlign: 'center',
    padding: '16px',
    marginTop: 'auto',
  },
  texto: {
    margin: 0,
    fontSize: '14px',
  }
}

export default Footer