import { useState, useEffect } from 'react'

const arr = [
  { date: '12-02-2002', tempInCel: 30  },
  { date: '12-02-2002', tempInCel: 25  }, 
  { date: '12-02-2002', tempInCel: 14  }, 
  { date: '12-02-2002', tempInCel: 31  }, 
]

const App = () => {
  const [loading, setLoading] = useState(true)
  const [celsius, setCelsius] = useState(true)

  useEffect(() => {
    arr.forEach(item => {
      item.tempInFrh = celToFrh(item.tempInCel)
    })
    console.log(arr)
    setLoading(false)
  }, [])

  const celToFrh = (C) => {
    // (°C * 1.8) + 32 = °F
    const F = (C * 1.8) + 32
    return F.toFixed(2)
  }

  const onChangeValue = (e) => {
    e.target.value === 'Celsius' ? setCelsius(true) : setCelsius(false)
  }

  const getWeatherType = (temperature) => {

    if(temperature <= 15) return 'Cold'
    else if (temperature <= 30) return 'Sunny'
    else return 'Hot'
  }

  return (
    <div className="grid flex-row justify-center p-2 mt-4">
      <div className="text-2xl font-semibold text-indigo-700 mb-6">Weather Report</div>
      <div onChange={onChangeValue} className="text-lg flex items-center gap-3 mb-3">
        <label>
          <input type="radio" value="Celsius" name="temperature" defaultChecked /> Celsius
        </label>
        <label>
          <input type="radio" value="Fahrenheit" name="temperature" /> Fahrenheit
        </label>
      </div>

      <div className="flex gap-8 mb-2 text-lg font-semibold">
        <div>Date</div>
        <div>Temperature</div>
        <div>Type</div>
      </div>

      { !loading && arr.map((item, index) => <div key={index} className="flex gap-8 mb-2 border-b border-indigo-200">
        <div>{item.date}</div>
        { celsius ? <div>{item.tempInCel} °C</div> : <div>{item.tempInFrh} °F</div> }
        <div>{getWeatherType (item.tempInCel)}</div>
      </div>) }
    </div>
  )
}

export default App
