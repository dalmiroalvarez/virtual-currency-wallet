import { useState, useEffect } from 'react'
import CurrencySelector from '../components/CurrencySelector'
import ErrorMessage from '../components/ErrorMessage'
import { fetchCurrencies } from '../services/api'
import { validateBalance, validateCurrencies, isValidPositiveNumber, clearErrorWithTimeout } from '../utils'

const HomePage = ({ onSubmit, error, setError }) => {
  const [balance, setBalance] = useState('')
  const [availableCurrencies, setAvailableCurrencies] = useState([])
  const [selectedCurrencies, setSelectedCurrencies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const currencies = await fetchCurrencies()
        setAvailableCurrencies(currencies)
      } catch (err) {
        setError('Error al cargar las divisas. Intente nuevamente.')
        clearErrorWithTimeout(setError)
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
    onSubmit(parseFloat(balance), selectedCurrencies)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cartera Virtual de Divisas</h1>
      
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