export const fetchCurrencies = async () => {
  const response = await fetch('https://api.coinbase.com/v2/currencies')
      if (!response.ok) 
      throw new Error('Failed to fetch currencies')
  
      const data = await response.json()
      return data.data.filter(c => c.id !== 'EUR')
};

export const fetchExchangeRates = async (currency) => {
  const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=EUR`)
      if (!response.ok) 
      throw new Error('Failed to fetch exchange rates')
      
      const data = await response.json()
      return data.data.rates[currency]
};