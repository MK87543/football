import React, { useEffect, useState } from 'react';

type Props = { Name: String }


const greenShades = [
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
];


export default function Counter({ Name }: Props) {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState(greenShades[0]);

    useEffect(() => {
        console.log('count', count);
        setColor(greenShades[count])

    }, [count]);

    return (
        <div className={`border w-100 h-100 rounded-xl m-4 ${color}`}>counter
            <button className={"border w-30 h-30 m-4"} onClick={() => setCount(count + 1)}>{Name}</button>
            <button className='border w-30 h-30 m-4' onClick={() => setCount(count - 1)}>decrease</button>
            <div className='border m-4 content-center'>{count}</div>
        </div>
    )
}
