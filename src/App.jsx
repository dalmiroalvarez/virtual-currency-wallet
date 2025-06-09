import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import Header from './components/Header'

function App() {
  const [balance, setBalance] = useState(0)
  const [selectedCurrencies, setSelectedCurrencies] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (balance, currencies) => {
    setBalance(balance)
    setSelectedCurrencies(currencies)
    navigate('/results')
  }

  return (
    <div className="min-h-screen bg-gray-500/10">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onSubmit={handleSubmit} error={error} setError={setError} />} 
          />
          <Route 
            path="/results" 
            element={<ResultsPage balance={balance} currencies={selectedCurrencies} />} 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App