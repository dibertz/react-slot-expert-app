import { useState } from 'react'

export const useTotalBet = (initialState = 10) => {

    const [bet, setBet] = useState(initialState);

    const incrementBet = () => {
        setBet(bet >= 100 ? initialState : bet + initialState);
    }

    const decrementBet = () => {
        setBet(bet <= initialState ? 100 : bet - initialState);
    }

    return {
        bet,
        incrementBet,
        decrementBet
    }
}
