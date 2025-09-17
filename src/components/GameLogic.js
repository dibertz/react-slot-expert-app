// Copyright (c) 2023 Dibertz Soft contributors (https://dibertz.com.ar) and Conectividad (Bs.As.) Argentina.
// Distributed under the MIT license. See the LICENSE.md file in the project root for more information.
import { useEffect, useRef, useState } from 'react'

import confetti from 'canvas-confetti';

export const GameLogic = ({ symbols, reels, state, isSpinning, balance, setBalance, bet, setMessage, initialState, setWin }) => {

    const sounds = [
        require('../assets/sounds/swgl1149711409.mp3'),
        require('../assets/sounds/swgl1104191902.mp3')
    ];

    const [animatingReels, setAnimatingReels] = useState(reels);
    const [isVictory, setVictory] = useState(false);
    const sndRef = useRef(null);

    useEffect(() => {
        setAnimatingReels(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only runs once when mounting!

    useEffect(() => {
        if (isSpinning) {
            setVictory(false);
            setAnimatingReels(prev => prev.map((reel, index) =>
                <div key={index} className={` ${isSpinning ? 'reel-animate' : ''}`}>
                    {reel}
                </div>
            ));
            setTimeout(() => {
                setAnimatingReels(state);
                checkResult(state);
            }, 500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reels]);

    const checkResult = (reels) => {
        const symbolMatch = reels.every((symb) => {
            return symb === reels[0];
        })

        if (symbolMatch) {

            setVictory(true);
            sndRef.current.play();
            const symbIndex = symbols.indexOf(reels[0]) + 1;
            setBalance(balance + (symbIndex * bet));
            console.log("Match Win! in Line: " + reels[0] + " x" + (3));
            setMessage("Línea abona $" + (symbIndex * bet) + ".00");
            setWin(symbIndex * bet);

            confetti({
                particleCount: 150,
                spread: 60
            })
        }
        else {
            setMessage(initialState);
        }
    }

    return (
        <div className='reels-container'>
            {
                animatingReels.map((reel, index) => (
                    <div key={index} className={isVictory ? 'reel reel-victory-glow' : 'reel'}>
                        {reel}
                    </div>
                ))
            }
            <audio ref={sndRef}>
                <source src={sounds[Math.floor(Math.random() * 2)]} type="audio/mpeg" />
                Your browser does not support the sound element.
            </audio>
        </div>

    )
}


