const ResultCard = ({ currency, rate, balance }) => {
  const convertedAmount = balance * rate

  return (
    <div className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-700">{currency}</p>
          <p className="text-sm text-gray-500">1 EUR = {rate} {currency}</p>
        </div>
        <p className="text-xl font-bold">
          {convertedAmount.toFixed(2)} {currency}
        </p>
      </div>
    </div>
  )
}

export default ResultCard