import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import SurahDetail from './SurahDetail'
import Footer from './Footer'

function App() {
  const [surahs, setSurahs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/surah`)
      .then(response => {
        setSurahs(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading data: {error.message}</p>

  return (
    <Router>
      <div className="App">
        <h1>Quran Surahs</h1>
        <Routes>
          <Route path="/" element={
            <div className="surah-list">
              {surahs.map(surah => (
                <div key={surah.number} className="surah-item">
                  <Link to={`/surah/${surah.number}`}>
                    <p>{surah.number}. {surah.englishName} ({surah.englishNameTranslation})</p>
                  </Link>
                </div>
              ))}
            </div>
          } />
          <Route path="/surah/:number" element={<SurahDetail />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App