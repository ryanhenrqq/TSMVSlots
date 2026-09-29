import { useEffect, useState } from 'react'
import './App.css'

import slotsIcon from '/slot.png'
import machinesImage from './assets/machines.jpg'
import rollIcon from './assets/roll.png'

function App() {
  return (
    <>
      <img src={machinesImage} className='background' alt="Maquinas de caça niquel" />
      <MainContainerView />
      <FloatingStats />
    </>
  )
}

function MainContainerView() {
  const [slotOne, setSlotOne] = useState(0)
  const [slotTwo, setSlotTwo] = useState(0)
  const [slotThree, setSlotThree] = useState(0)
  const [finalNumber, setFinalNumber] = useState('')
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const [runningSlot, setRunningSlot] = useState(false)

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
    let timeoutCall: number
    setSecondsRemaining(time)

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
      setSecondsRemaining(time -1)
      time-=1
      if (time<=0) {
        setSecondsRemaining(0)
        clearInterval(counter)
        setRunningSlot(false)
      }
    }, 1000)
  }, [runningSlot])

  useEffect(() => {
    setFinalNumber(`${slotOne}${slotTwo}${slotThree}`)
  }, [slotOne, slotTwo, slotThree])

  return(
    <div className="container">
      <h1>TSMV</h1>
      <div className="flex-hor slot-upp">
        <div>{slotOne}</div>
        <div>{slotTwo}</div>
        <div>{slotThree}</div>
      </div>
      <div className="flex-hor">
        <div className="act-button-border">
          <button className='act-button' onClick={handleRoll} disabled={runningSlot}>
            <img src={rollIcon} alt="Rolar" />
          </button>
        </div>
        <div className="act-button-led-border">
          <div className="act-button-led"
            style={runningSlot?{backgroundColor:'red',boxShadow:'4px 4px 14px red'}:{}}
          ></div>
        </div>
      </div>
      
      <div>{finalNumber} - numero final debug</div>
    </div>
  )
}

function FloatingStats() {
  const [infosView, setInfosView] = useState(false)
  const handleInfosView = () => {
    !infosView?setInfosView(true):setInfosView(false)
  }
  return(
    <>
      <div className="corner-stats flex-hor">
        <div className='stats-buttons'>pontos</div>
        <div className='stats-buttons' onClick={handleInfosView}>creditos</div>
      </div>
      {infosView?
        <div className="infos-about">
          <small><a href="https://www.flaticon.com/free-icons/slot-machine" title="slot machine icons">Slot machine icons created by Magnific - Flaticon</a></small>
          <small><i>Foto de Elizabeth Ferreira: https://www.pexels.com/pt-br/foto/cassino-24643920/</i></small>
          <small><a href="https://www.flaticon.com/free-icons/return" title="return icons">Return icons created by Magnific - Flaticon</a></small>
        </div>:
        null
      }
      
    </>
  )
}

export default App
