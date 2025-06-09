const CurrencySelector = ({ currencies, selectedCurrencies, setSelectedCurrencies, isLoading }) => {
  const handleCurrencyChange = (currency) => {
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies(selectedCurrencies.filter(c => c !== currency))
    } else {
      if (selectedCurrencies.length < 3) {
        setSelectedCurrencies([...selectedCurrencies, currency])
      }
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">
        Seleccione divisas (máx. 3)
      </label>
      
      {isLoading ? (
        <p className="text-gray-500">Cargando divisas disponibles...</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-md">
          {currencies.map(currency => (
            <div key={currency.id} className="flex items-center">
              <input
                id={`currency-${currency.id}`}
                type="checkbox"
                checked={selectedCurrencies.includes(currency.id)}
                onChange={() => handleCurrencyChange(currency.id)}
                disabled={selectedCurrencies.length >= 3 && !selectedCurrencies.includes(currency.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`currency-${currency.id}`} className="ml-2 text-gray-700">
                {currency.id} - {currency.name}
              </label>
            </div>
          ))}
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