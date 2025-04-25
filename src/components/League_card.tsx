import React from 'react'

type Props = {
  Name: string;
  Shortcut: string;
  Season: string;
  Sport: string;
}

export default function League_card({ Name, Shortcut, Season, Sport }: Props) {
  return (
    <div className='rounded-md w-50 h-50 border p-3 m-2 hover:w-55 hover:h-55 hover:cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out'>
      <div className="font-bold">{Name}</div>
      <div>Shortcut: {Shortcut}</div>
      <div>Season: {Season}</div>
      <div>Sport: {Sport}</div>
    </div>
  )
}
