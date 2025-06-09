import { useState, useEffect } from 'react'
import CurrencySelector from '../components/CurrencySelector'
import ErrorMessage from '../components/ErrorMessage'
import { fetchCurrencies } from '../services/api'
import { validateBalance, validateCurrencies, isValidPositiveNumber, clearErrorWithTimeout } from '../utils'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/Storage'

const HomePage = ({ onSubmit, error, setError }) => {
  const [balance, setBalance] = useState(() => {
    const savedBalance = loadFromLocalStorage('walletBalance')
    return savedBalance || ''
  })
  
  const [availableCurrencies, setAvailableCurrencies] = useState([])
  
  const [selectedCurrencies, setSelectedCurrencies] = useState(() => {
    const savedCurrencies = loadFromLocalStorage('selectedCurrencies')
    return savedCurrencies || []
  })
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (balance !== '') {
      saveToLocalStorage('walletBalance', balance)
    }
  }, [balance])

  useEffect(() => {
    if (selectedCurrencies.length > 0) {
      saveToLocalStorage('selectedCurrencies', selectedCurrencies)
    }
  }, [selectedCurrencies])

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const cachedCurrencies = loadFromLocalStorage('availableCurrencies')
        const cacheTimestamp = loadFromLocalStorage('currenciesCacheTimestamp')
        const now = Date.now()
        const CACHE_DURATION = 5 * 60 * 1000

        if (cachedCurrencies && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
          setAvailableCurrencies(cachedCurrencies)
          setIsLoading(false)
          return
        }

        const currencies = await fetchCurrencies()
        setAvailableCurrencies(currencies)
        
        saveToLocalStorage('availableCurrencies', currencies)
        saveToLocalStorage('currenciesCacheTimestamp', now)
        
      } catch (err) {
        const cachedCurrencies = loadFromLocalStorage('availableCurrencies')
        if (cachedCurrencies) {
          setAvailableCurrencies(cachedCurrencies)
        } else {
          setError('Error al cargar las divisas. Intente nuevamente.')
          clearErrorWithTimeout(setError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadCurrencies()
  }, [setError])

  const handleBalanceChange = (e) => {
    const value = e.target.value
    
    if (isValidPositiveNumber(value)) {
      setBalance(value)
      if (error === 'No se permiten valores negativos') {
        setError('')
      }
    } else {
      setError('No se permiten valores negativos')
      clearErrorWithTimeout(setError)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const balanceError = validateBalance(balance)
    if (balanceError) {
      setError(balanceError)
      clearErrorWithTimeout(setError)
      return
    }
    
    const currencyError = validateCurrencies(selectedCurrencies)
    if (currencyError) {
      setError(currencyError)
      clearErrorWithTimeout(setError)
      return
    }
    
    setError('')
    
    saveToLocalStorage('lastSubmissionData', {
      balance: parseFloat(balance),
      currencies: selectedCurrencies,
      timestamp: Date.now()
    })
    
    onSubmit(parseFloat(balance), selectedCurrencies)
  }

  const clearSavedData = () => {
    setBalance('')
    setSelectedCurrencies([])
    
    saveToLocalStorage('walletBalance', '')
    saveToLocalStorage('selectedCurrencies', [])
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cartera Virtual de Divisas</h1>
        {(balance || selectedCurrencies.length > 0) && (
          <button
            type="button"
            onClick={clearSavedData}
            className="text-sm text-red-600 hover:text-red-800 underline"
            title="Limpiar datos guardados"
          >
            Limpiar
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="balance">
            Saldo inicial en EUR (€)
          </label>
          <input
            id="balance"
            type="number"
            step="0.01"
            min="0"
            value={balance}
            onChange={handleBalanceChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 100.00"
          />
        </div>

        <CurrencySelector
          currencies={availableCurrencies}
          selectedCurrencies={selectedCurrencies}
          setSelectedCurrencies={setSelectedCurrencies}
          isLoading={isLoading}
        />

        {error && <ErrorMessage message={error} />}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-6 py-2 px-4 rounded-md text-white font-medium ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } cursor-pointer`}
        >
          {isLoading ? 'Cargando...' : 'Ver resultados'}
        </button>
      </form>
    </div>
  )
}

export default HomePage