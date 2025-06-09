import { useState } from 'react'

const CurrencySelector = ({ 
  currencies, 
  selectedCurrencies, 
  setSelectedCurrencies, 
  isLoading 
  }) => {
    
  const [searchTerm, setSearchTerm] = useState('')

  const handleCurrencyChange = (currency) => {
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies(selectedCurrencies.filter(c => c !== currency))
    } else {
      if (selectedCurrencies.length < 3) {
        setSelectedCurrencies([...selectedCurrencies, currency])
      }
    }
  }

  const filteredCurrencies = currencies.filter(currency => 
    currency.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">
        Seleccione divisas (máx. 3)
      </label>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar divisa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {isLoading ? (
        <p className="text-gray-500">Cargando divisas disponibles...</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-md">
          {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map(currency => (
              <div key={currency.id} className="flex items-center cursor-pointer">
                <input
                  id={`currency-${currency.id}`}
                  type="checkbox"
                  checked={selectedCurrencies.includes(currency.id)}
                  onChange={() => handleCurrencyChange(currency.id)}
                  disabled={selectedCurrencies.length >= 3 && !selectedCurrencies.includes(currency.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor={`currency-${currency.id}`} className="ml-2 text-gray-700 cursor-pointer">
                  {currency.id} - {currency.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-2">No se encontraron divisas</p>
          )}
        </div>
      )}
      
      {selectedCurrencies.length > 0 && (
        <p className="mt-2 text-sm text-gray-500">
          Seleccionadas: {selectedCurrencies.join(', ')}
        </p>
      )}
    </div>
  )
}

export default CurrencySelector