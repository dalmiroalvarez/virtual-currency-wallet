export const validateBalance = (balance) => {
  if (!balance || balance === '') {
    return 'Por favor ingrese un saldo'
  }
  
  const numericBalance = parseFloat(balance)
  
  if (numericBalance < 0) {
    return 'El saldo no puede ser negativo'
  }
  
  if (numericBalance <= 0) {
    return 'El saldo debe ser mayor a 0'
  }
  
  return null
}

export const validateCurrencies = (selectedCurrencies) => {
  if (selectedCurrencies.length === 0) {
    return 'Seleccione al menos una divisa'
  }
  
  return null
}

export const isValidPositiveNumber = (value) => {
  if (value === '') return true
  const numericValue = parseFloat(value)
  return numericValue >= 0
}

export const clearErrorWithTimeout = (setError, timeout = 3000) => {
  setTimeout(() => {
    setError('')
  }, timeout)
}