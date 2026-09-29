import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [slotOne, setSlotOne] = useState(0)
  const [slotTwo, setSlotTwo] = useState(0)
  const [slotThree, setSlotThree] = useState(0)
  const [runningSlot, setRunningSlot] = useState(false)

  let timeoutCall: number

  const handleRoll = () => {
    setRunningSlot(true)
    setSlotOne(Math.floor(Math.random() * 10))
    setSlotTwo(Math.floor(Math.random() * 10))
    setSlotThree(Math.floor(Math.random() * 10))
  }

  useEffect(() => {
    if (!runningSlot) return
    let speed: number = 50
    let time: number = 15

    const randomizer = () => {
      speed +=50
      console.log(speed, time)
      setSlotOne(Math.floor(Math.random() * 10))
      setSlotTwo(Math.floor(Math.random() * 10))
      setSlotThree(Math.floor(Math.random() * 10))     
      if (time<=0) {
        return
      }
      timeoutCall = setTimeout(randomizer, speed)
    }
    timeoutCall = setTimeout(randomizer, speed)
    const counter = setInterval(() => {
      time-=1
      if (time<=0) {
        clearInterval(counter)
        setRunningSlot(false)
      }
    }, 1000)
  }, [runningSlot])
  return (
    <>
      <h1>Hello, World!</h1>
      <b>slots machine</b><br />
      <button onClick={handleRoll} disabled={runningSlot}>Girar Roleta</button>
      <div className="flex-hor">
        <div>{slotOne}</div>
        <div>{slotTwo}</div>
        <div>{slotThree}</div>
      </div>
    </>
  )
}

export default App
