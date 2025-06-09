const ResultCard = ({ currency, rate, balance }) => {
  
  const convertedAmount = balance * parseFloat(rate)
  
  const formattedConvertedAmount = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(convertedAmount)

  return (
    <div className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-700">{currency}</p>
          <p className="text-sm text-gray-500">
            Tasa: 1 EUR = {parseFloat(rate).toFixed(6)} {currency}
          </p>
        </div>
        <p className="text-xl font-bold">
          {formattedConvertedAmount} {currency}
        </p>
      </div>
    </div>
  )
}

export default ResultCard