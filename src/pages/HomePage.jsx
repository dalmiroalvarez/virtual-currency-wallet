import { useState, useEffect } from 'react'
import CurrencySelector from '../components/CurrencySelector'
import ErrorMessage from '../components/ErrorMessage'

const HomePage = ({ onSubmit, error, setError }) => {
  const [balance, setBalance] = useState('')
  const [availableCurrencies, setAvailableCurrencies] = useState([])
  const [selectedCurrencies, setSelectedCurrencies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.coinbase.com/v2/currencies')
        const data = await response.json()
        setAvailableCurrencies(data.data.filter(c => c.id !== 'EUR'))
        setIsLoading(false)
      } catch (err) {
        setError('Error al cargar las divisas. Intente nuevamente.')
        setIsLoading(false)
      }
    }

    fetchCurrencies()
  }, [setError])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (balance <= 0) {
      setError('El saldo debe ser mayor a 0')
      return
    }
    if (selectedCurrencies.length === 0) {
      setError('Seleccione al menos una divisa')
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
            min="0.01"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
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
          className={`w-full mt-6 py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Cargando...' : 'Ver resultados'}
        </button>
      </form>
    </div>
  )
}

export default HomePage