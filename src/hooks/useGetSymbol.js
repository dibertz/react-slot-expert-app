export const useGetSymbol = ({ reels, symbols }) => {

    const newReels = reels.map(() => symbols[Math.floor((Math.random() * symbols.length))])

    return newReels;
};