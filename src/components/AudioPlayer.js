// Copyright (c) 2023 Dibertz Soft contributors (https://dibertz.com.ar) and Conectividad (Bs.As.) Argentina.
// Distributed under the MIT license. See the LICENSE.md file in the project root for more information.
import React, { useRef, useEffect } from 'react';
import bgm from '../assets/sounds/swgl588554975.mp3'

export const AudioPlayer = ({ isPlaying }) => {

    const bgmRef = useRef(null);
    /* const sndRef = useRef(null); */

    useEffect(() => {

        if (isPlaying) {
            bgmRef.current.play();
        } else {
            bgmRef.current.pause();
        }
    }, [isPlaying]);

    const handleEnded = () => (isPlaying) ? bgmRef.current.play() : null;

/*     useEffect(() => {

        if (isPlaySnd) {
            sndRef.current.play();
        }
    }, [isPlaySnd]); */

    return (
        <div>
            <audio ref={bgmRef} onEnded={handleEnded}>
                <source src={bgm} type="audio/mpeg" />
                Your browser does not support the music element.
            </audio>
        </div>
    );
};