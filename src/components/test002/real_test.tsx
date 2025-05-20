import React, { useEffect, useState } from 'react';

type Props = {

    text: String;
    comments: Array<String>;
    active: Boolean

}



export default function real_test({ }: Props) {
    const colorShades = [
        "bg-green-100",
        "bg-red-100"]

    const [comment, setComment] = useState<Array<String>>([]);
    const [active, setActive] = useState<Boolean>(false);
    const [color, setColor] = useState(colorShades[0]);



    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
            .then(response => response.json())
            .then(data => {
                setComment(data);
                console.log(data);
            });
    }, [0]);


    useEffect(() => {
        console.log("active", active);
        setColor(colorShades[active ? 0 : 1]);


    }, [active]);

    return (
        <div className={color}>
            <h1>Hello</h1>
            <ul>
                {comment.map((getter: any) => (

                    <div className="border mb-4 w-150 rounded-md">
                        <li key={getter.id}>
                            {getter.name}
                        </li>
                    </div>

                ))}
            </ul>
            <button className='hover:cursor-pointer' onClick={() => setActive(!active)}>click me</button>
        </div>




    )
}