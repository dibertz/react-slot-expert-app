import React, { useState } from 'react'

export const useMessage = (initialState = <>Presione <svg width='1rem' viewBox="0 0 2200 2200" fill="none"><path d="M1147.24,2029.42c511.7-18.41,911.59-448.15,893.19-959.85a927.2,927.2,0,0,0-281.74-632.86L1612.4,588.2a710.91,710.91,0,0,1,138,185.6c181.9,351.22,44.64,783.41-306.59,965.31a716.32,716.32,0,0,1-287.46,79l6.67-156L789.09,1898.6l352.29,267.75Z" fill="#cfcfcfff" /><path d="M1052.76,170.58C541.06,189,141.17,618.73,159.57,1130.43a927.2,927.2,0,0,0,281.74,632.86L587.64,1611.8a711.13,711.13,0,0,1-138-185.6C267.78,1075,405.05,642.79,756.27,460.89a716.13,716.13,0,0,1,287.42-79l-6.67,156L1410.91,301.4,1058.62,33.65Z" fill="#cfcfcfff" /></svg> para Jugar</>) => {

    const [message, setMessage] = useState(initialState);

    return {
        message,
        setMessage,
        initialState
    };
}
