import { useEffect, useState } from 'react';

const CountDown = (props) => {
    const [count, setCount] = useState(10);

    useEffect(() => {
        if (count === 0) {
            props.onTimeUp();
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [count]);

    return <div className="countdown-container">{count}</div>;
};

export default CountDown;
