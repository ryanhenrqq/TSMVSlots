import { useEffect, useRef, useState } from 'react'
import './App.css'

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
  const slotsCurrentRef = useRef({n1: 0, n2: 0, n3: 0})


  const [finalNumber, setFinalNumber] = useState('')
  const [runningSlot, setRunningSlot] = useState(false)
  const [statusRodada, setStatusRodada] = useState('STATUS VAZIO')

  const handleRoll = () => {
    setRunningSlot(true)
    setSlotOne(Math.floor(Math.random() * 10))
    setSlotTwo(Math.floor(Math.random() * 10))
    setSlotThree(Math.floor(Math.random() * 10))
  }

  useEffect(() => {
    if (!runningSlot) return
    setStatusRodada('')
    let speed: number = 50
    let time: number = 15
    let timeoutCall: number

    const randomizer = () => {
      speed +=20
      let n1 = Math.floor(Math.random() * 10)
      let n2 = Math.floor(Math.random() * 10)
      let n3 = Math.floor(Math.random() * 10)
      slotsCurrentRef.current = {n1,n2,n3}
      setSlotOne(n1)
      setSlotTwo(n2)
      setSlotThree(n3)     
      timeoutCall = setTimeout(randomizer, speed)
    }
    timeoutCall = setTimeout(randomizer, speed)
    const counter = setInterval(() => {
      time-=1
      if (time<=0) {
        const {n1,n2,n3} = slotsCurrentRef.current
        clearInterval(counter)
        setRunningSlot(false)
        setTimeout(() => {
          handleAnalysis(n1, n2, n3)
        }, 500);
      }
    }, 1000)

    return () => {
      clearTimeout(timeoutCall)
    }
  }, [runningSlot])

  const handleAnalysis = (n1: number, n2: number, n3: number) => {
    // jackpot
    if (n1 == n2 && n2 == n3) {
      setStatusRodada('JACKPOT!!')
      return
    } else if (n1+1==n2&&n2+1==n3){
      setStatusRodada('ORDEM DECRESCENTE!!')
      return
    } else if (n1-1==n2&&n2-1==n3){
      setStatusRodada('ORDEM CRESCENTE!!')
      return      
    } else if (n1==n2 || n1==n3 || n2==n3) {
      setStatusRodada('DOIS NUMEROS IGUAIS!!')
      return
    } else {
      setStatusRodada('TENTE NOVAMENTE!')
    }
  }

  useEffect(() => {
    setFinalNumber(`${slotOne}${slotTwo}${slotThree}`)
    console.log(finalNumber)
  }, [slotOne, slotTwo, slotThree])

  return(
    <div className="container">

      <div className="title">
        <h1>TSMV</h1>
        <i>slots</i>
      </div>

      <div className="infos-header-screen">
        {statusRodada!=''?<div>{statusRodada}</div>:<div>GIRANDO...</div>}
      </div>

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
      
      <PointsAdjustments />
    </div>
  )
}

function FloatingStats() {
  const [infosView, setInfosView] = useState(false)
  const [pointView, setPointView] = useState(false)
  const handleView = (act:number) => {
    if (act==0){
      if (pointView) return
      !infosView?setInfosView(true):setInfosView(false)
    } else if (act==1){
      if (infosView) return
      !pointView?setPointView(true):setPointView(false)
    } else {
      console.error('Não há resposta valida pra ação especificada em FloatingStats -> handleView().')
    }
    
  }
  return(
    <>
      <div className="corner-stats flex-hor">
        <div className='stats-buttons' onClick={()=> handleView(1)}>pontos</div>
        <div className='stats-buttons' onClick={()=> handleView(0)}>creditos</div>
      </div>
      {infosView?
        <div className="infos-about">
          <small><a href="https://www.flaticon.com/free-icons/slot-machine" title="slot machine icons">Slot machine icons created by Magnific - Flaticon</a></small>
          <small><i>Foto de Elizabeth Ferreira: https://www.pexels.com/pt-br/foto/cassino-24643920/</i></small>
          <small><a href="https://www.flaticon.com/free-icons/return" title="return icons">Return icons created by Magnific - Flaticon</a></small>
        </div>:
        null
      }
      {pointView?
        <div className="infos-about">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quia totam voluptatum saepe accusantium accusamus rem exercitationem. Alias, quo aperiam aspernatur aut ad architecto, praesentium sunt voluptate adipisci, fugiat nihil!
        </div>:
        null
      }
      
    </>
  )
}

function PointsAdjustments() {
  const [defaultTxt, setDefaultTxt] = useState('Houve um problema com esse script.')
  const [pointsScreenContent, setPointsScreenContent] = useState('')
  const [pointsCount, setPointsCount] = useState(100)
  const [betPoints, setBetPoints] = useState(10)
  const [disabMin, setDisableMin] = useState(true)
  const [disabMax, setDisableMax] = useState(false)

  const handlePointAdj = (act: number) => {
    if (act==0){
      if (betPoints<=10){
        setDisableMin(true)
        console.log(betPoints, pointsCount) //debug
        return
      } else {
        setDisableMin(false)
      }
      console.log(betPoints, pointsCount) //debug
      betPoints>=10?setBetPoints(betPoints-5):console.log('erro')
    } else if (act==1) {
      if (betPoints>=pointsCount){
        setDisableMax(true)
        console.log(betPoints, pointsCount) //debug
        return
      } else {
        setDisableMax(false)
      }
      console.log(betPoints, pointsCount) //debug
      betPoints<=pointsCount?setBetPoints(betPoints+5):console.log('erro')
    }
    setPointsScreenContent(`${betPoints} pontos serão usados.`)
  }

  useEffect(() => {
    if (betPoints>=pointsCount){
      setDisableMax(true)
    } else if (betPoints<=10||betPoints<=pointsCount){
      setDisableMin(true)
    }
    setDefaultTxt(`${betPoints} serão usados.`)
    setPointsScreenContent(`${betPoints} pontos serão usados.`)
  }, [])
  useEffect(()=> {
    if (betPoints>=pointsCount){
      setDisableMax(true)
    } else {
      setDisableMax(false)
    }
    if (betPoints<=10||betPoints>=pointsCount){
      setDisableMin(true)
    } else {
      setDisableMin(false)
    }
    setPointsScreenContent(`${betPoints} pontos serão usados.`)
  }, [betPoints])
  return(
    <div className='flex-hor footer-slot-btns'>
      <button className="points-btn-down" onClick={()=> handlePointAdj(0)} disabled={disabMin}>-</button>
      <div className="points-display-req">
        <span>{pointsScreenContent}</span>
      </div>
      <button className="points-btn-up" onClick={()=> handlePointAdj(1)} disabled={disabMax}>+</button>
    </div>
  )
}

export default App
