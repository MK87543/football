import React from 'react'

type Props = {}

export default function example_1({ }: Props) {
    const checks = ['überprüfung_1', 'überprüfung_2', 'überprüfung_3', 'überprüfung_4', 'überprüfung_5']
    return (
        <div>
            <h1 className='broder text-3xl font-bold p-8'>Wartung Teil 1</h1>

            {/* Labels aligned above checkboxes */}
            <div className='pl-59'>
                <div className='flex gap-4 mb-1'>
                    <span className='w-4 text-green-600 text-sm'>OK</span>
                    <span className='w-4 text-orange-500 text-sm'>teil</span>
                    <span className='w-4 text-red-600 text-sm'>defekt</span>
                </div>
            </div>

            <ul className='pl-8'>
                {checks.map((text, i) => (
                    <li key={i} className='flex items-center gap-5 mb-2'>
                        <span className='w-48'>{text}</span>
                        <input type="checkbox" className='accent-green-600' />
                        <input type="checkbox" className='accent-orange-500' />
                        <input type="checkbox" className='accent-red-600' />
                        <input className='ml-8 border rounded-md' type="text" placeholder='Bemerkungen' />
                    </li>
                ))}
            </ul>





        </div>
    )
}
