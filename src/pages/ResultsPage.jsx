import { useState, useEffect } from 'react'
import ResultCard from '../components/ResultCard'
import { useNavigate } from 'react-router-dom'
import { fetchExchangeRates } from '../services/api'
import { saveToLocalStorage ,loadFromLocalStorage } from '../utils/Storage'

const ResultsPage = ({ balance, currencies }) => {
  const [exchangeRates, setExchangeRates] = useState(() => {
    const savedRates = loadFromLocalStorage('exchangeRates')
    return savedRates || {}
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [persistedBalance] = useState(() => {
    return balance || loadFromLocalStorage('walletBalance') || 0
  })

  const [persistedCurrencies] = useState(() => {
    return currencies.length > 0 ? currencies : loadFromLocalStorage('selectedCurrencies') || []
  })

  useEffect(() => {
    if (persistedCurrencies.length === 0) {
      navigate('/')
      return
    }

    const loadRates = async () => {
      try {
        const cachedRates = loadFromLocalStorage('exchangeRates')
        const cacheTimestamp = loadFromLocalStorage('exchangeRatesCacheTimestamp')
        const now = Date.now()
        const CACHE_DURATION = 2 * 60 * 1000

        if (cachedRates && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
          const hasAllRates = persistedCurrencies.every(currency => cachedRates[currency])
          if (hasAllRates) {
            setExchangeRates(cachedRates)
            setIsLoading(false)
            return
          }
        }

        const rates = await fetchExchangeRates(persistedCurrencies)
        setExchangeRates(rates)
        
        saveToLocalStorage('exchangeRates', rates)
        saveToLocalStorage('exchangeRatesCacheTimestamp', now)
        
      } catch (err) {
        const cachedRates = loadFromLocalStorage('exchangeRates')
        if (cachedRates) {
          setExchangeRates(cachedRates)
        } else {
          setError('Error al obtener las tasas de cambio. Intente nuevamente.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadRates()
  }, [persistedCurrencies, navigate])

  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      saveToLocalStorage('exchangeRates', exchangeRates)
    }
  }, [exchangeRates])

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
        <p className="text-2xl font-bold">€{parseFloat(persistedBalance).toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        {persistedCurrencies.map(currency => (
          <ResultCard 
            key={currency}
            currency={currency}
            rate={exchangeRates[currency]}
            balance={parseFloat(persistedBalance)}
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