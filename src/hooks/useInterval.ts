import React from 'react';
export default function useInterval(callback: ()=>void, delay: number) {

        const intervalRef = React.useRef<number | null>(null); 
        const savedCallback = React.useRef(callback);

        React.useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        React.useEffect(() => {
            const tick = () => savedCallback.current();
            if (typeof delay === 'number') {
                intervalRef.current = window.setInterval(tick, delay);
                //@ts-ignore
                return () => window.clearInterval(intervalRef.current);
            }
        }, [delay]);

        return intervalRef;
    }
