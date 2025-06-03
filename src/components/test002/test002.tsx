import { useEffect, useState } from 'react'

type Props = {
    title: String;

}

export default function test002({ title, }: Props) {


    const colorShades = [
        "bg-blue-100",
        "bg-red-100"]


    const [users, setUser] = useState<Array<String>>([]);
    const [visible, setVisible] = useState<Boolean>(true);
    const [color, setColor] = useState(colorShades[0]);




    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUser(data);
                console.log(data);
            });
    }, [0]);



    useEffect(() => {
        console.log("active", visible);
        setColor(colorShades[visible ? 0 : 1]);

    }, [visible]);


    return (

        <div className={color}>
            <h1 className='font-bold'>{title}</h1>
            <div>
                <ul>
                    {users.map((users: any) => (

                        <div className="border mb-4 w-150 rounded-md">
                            <li >
                                {users.name}
                            </li>
                        </div>

                    ))}
                </ul>

                <button className='border hover:cursor-pointer' onClick={() => setVisible(!visible)}>Toggle</button>


            </div>



        </div>
    )
}