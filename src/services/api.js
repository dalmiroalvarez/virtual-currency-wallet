export const fetchCurrencies = async () => {
  try {
    const response = await fetch('https://api.coinbase.com/v2/currencies')
    
    if (!response.ok) {
      throw new Error('Error al obtener divisas disponibles')
    }
    
    const data = await response.json()    
    return data.data.filter(currency => currency.id !== 'EUR')
  } catch (error) {
    console.error('Error en fetchAvailableCurrencies:', error)
    throw error
  }
}

export const fetchExchangeRates = async (currencies) => {
  try {
    const rates = {}
    const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=EUR`)
    
    if (!response.ok) {
      throw new Error('Error al obtener tasas de cambio')
    }
    
    const data = await response.json()
    const allRates = data.data.rates
    
    for (const currency of currencies) {
      if (allRates[currency]) {
        rates[currency] = allRates[currency]
      }
    }
    
    return rates
  } catch (error) {
    console.error('Error en fetchExchangeRates:', error)
    throw error
  }
}