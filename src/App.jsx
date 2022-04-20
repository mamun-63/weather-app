import { useState, useEffect } from 'react'
import './App.css'

const arr = [
  { date: '12-02-2002', tempInCel: 30  },
  { date: '12-02-2002', tempInCel: 25  }, 
  { date: '12-02-2002', tempInCel: 14  }, 
  { date: '12-02-2002', tempInCel: 31  }, 
]

function App() {
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
    <div className="App">
      <h3>Weather Report</h3>
      <div onChange={onChangeValue}>
        <input type="radio" value="Celsius" name="temperature" defaultChecked /> Celsius
        <input type="radio" value="Fahrenheit" name="temperature" /> Fahrenheit
      </div>

      { !loading && arr.map((item, index) => <div key={index}>
        <div>{item.date}</div>
        { celsius ? <div>{item.tempInCel} °C</div> : <div>{item.tempInFrh} °F</div> }
        <div>{getWeatherType (item.tempInCel)}</div>
      </div>) }
    </div>
  )
}

export default App
