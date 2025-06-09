import { useState, useEffect } from 'react'
import ResultCard from '../components/ResultCard'
import { useNavigate } from 'react-router-dom'
import { fetchExchangeRates } from '../services/api'

const ResultsPage = ({ balance, currencies }) => {
  const [exchangeRates, setExchangeRates] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (currencies.length === 0) {
      navigate('/')
      return
    }

    const loadRates = async () => {
      try {
        const rates = await fetchExchangeRates(currencies)
        setExchangeRates(rates)
      } catch (err) {
        setError('Error al obtener las tasas de cambio. Intente nuevamente.')
      } finally {
        setIsLoading(false)
      }
    }

    loadRates()
  }, [currencies, navigate])

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Cargando tasas de cambio...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Volver
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Resultados</h2>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <p className="font-medium text-gray-700">Saldo en EUR:</p>
        <p className="text-2xl font-bold">€{balance.toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        {currencies.map(currency => (
          <ResultCard 
            key={currency}
            currency={currency}
            rate={exchangeRates[currency]}
            balance={balance}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Volver
      </button>
    </div>
  )
}

export default ResultsPage