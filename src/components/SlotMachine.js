// Copyright (c) 2023 Dibertz Soft contributors (https://dibertz.com.ar) and Conectividad (Bs.As.) Argentina.
// Distributed under the MIT license. See the LICENSE.md file in the project root for more information.
import { useState } from 'react'
import { GameLogic } from './GameLogic'
import { useGetSymbol } from '../hooks/useGetSymbol'
import { useTotalBet } from '../hooks/useTotalBet';
import { useMessage } from '../hooks/useMessage';

import { AudioPlayer } from './AudioPlayer';
import { VolumeOff, Volume2 } from "lucide-react"


export const SlotMachine = () => {

  const symbols = ['🍒', '🍋', '🍊', '🍇', '💎'];

  const [balance, setBalance] = useState(1000)
  const [enabledButton, setEnableButton] = useState(false)
  const [reels, setReels] = useState(Array(3).fill(null));
  const state = useGetSymbol({ reels, symbols })

  const { message, setMessage, initialState } = useMessage()
  const { bet, incrementBet, decrementBet } = useTotalBet()
  const [ win, setWin ] = useState(0);

  const [enabledMusic, setEnableMusic] = useState(false)
  const [isSpinning, setSpinning] = useState(false)

  const handleSpin = () => {
    setWin(0);
    if (balance < bet) {

      setMessage("¡Fondos insuficientes!");
      return
    }
    setSpinning(true);
    setReels(state)
    setEnableButton(true)
    setMessage("¡Buena suerte!");
    setBalance(balance - bet)

    // Reset the button animation after it completes
    setTimeout(() => {
      setEnableButton(false)
    }, 700) // Match this with your CSS animation duration
  }

  const onToggleMusic = () => {
    setEnableMusic(enabledMusic ? false : true)
  }


  return (
    <>
      <h2 className='main-title'>PaChi Slot Expert App</h2> {/* ʕ•́ᴥ•̀ʔっ♡ React Games */}
      <h4 className='main-subtitle'>React Game v0.2a Demo</h4>
      <div>< GameLogic symbols={symbols} reels={reels} state={state} isSpinning={isSpinning} balance={balance} setBalance={setBalance} bet={bet} setMessage={setMessage} initialState={initialState} setWin={setWin}/></div>

      <div className='notification-panel'>
        <div className='control-status'>{message}</div>
      </div>

      <div className='control-panel'>

        <div className='control-ui'>
          <span className='control-label'>Balance</span>
          <div className='input-value'>${balance}</div>
        </div>

        <div>
          <span className='control-label'>Apuesta Total</span>
          <div className='bet-controls'>
            <button className='bet-button bet-button-decrease' onClick={decrementBet} disabled={enabledButton}> - </button>
            <div className='input-value'>${bet}</div>
            <button className=' bet-button bet-button-increase' onClick={incrementBet} disabled={enabledButton}> + </button>
          </div>
        </div>

        <div className='spin-container'>
          <button className='spin-button' onClick={handleSpin} disabled={enabledButton}>
            <svg viewBox="0 0 2200 2200" fill="none" className='spin-icon'><path d="M1147.24,2029.42c511.7-18.41,911.59-448.15,893.19-959.85a927.2,927.2,0,0,0-281.74-632.86L1612.4,588.2a710.91,710.91,0,0,1,138,185.6c181.9,351.22,44.64,783.41-306.59,965.31a716.32,716.32,0,0,1-287.46,79l6.67-156L789.09,1898.6l352.29,267.75Z" fill="#654321" /><path d="M1052.76,170.58C541.06,189,141.17,618.73,159.57,1130.43a927.2,927.2,0,0,0,281.74,632.86L587.64,1611.8a711.13,711.13,0,0,1-138-185.6C267.78,1075,405.05,642.79,756.27,460.89a716.13,716.13,0,0,1,287.42-79l-6.67,156L1410.91,301.4,1058.62,33.65Z" fill="#654321" /></svg>
          </button>
        </div>

        <div className='control-win'>
          <span className="control-label">Ganancia</span>
          <div className='input-value'>${win}</div>
        </div>

        <div className='vr'></div>
        <div>
          <button onClick={onToggleMusic} className={enabledMusic ? "music-toggle-button" : "music-toggle-button music-disabled"}>
            {enabledMusic ? <Volume2 /> : <VolumeOff />}
            <span className="music-text">{enabledMusic ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>
      <footer>
        Powered by:&nbsp;
        <a className="footer-link" href="https://github.com/dibertz">
          <div>Dibertz Soft</div>
          <svg className="external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" />
            <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" />
          </svg>
        </a>
      </footer>

      < AudioPlayer isPlaying={enabledMusic}/>
    </>
  )
}
