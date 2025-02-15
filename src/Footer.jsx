import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <span>
        Developed by <a href="https://sabbirmms.github.io/portfolio" target="_blank" rel="noopener noreferrer">@SabbirMMS</a> &copy; {currentYear}
      </span>
    </footer>
  )
}

export default Footer