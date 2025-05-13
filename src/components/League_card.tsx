import React, { useEffect, useState } from 'react';

type Props = {
  Name: string;
  Shortcut: string;
  Season: string;
  Sport: string;
  onClick?: (type: 'goalgetters' | 'table') => void;
}

export default function League_card({ Name, Shortcut, Season, Sport, onClick }: Props) {
  const [hasGoalGetters, setHasGoalGetters] = useState<boolean | null>(null);

  //fetch goalgetter data
  useEffect(() => {
    fetch(`https://api.openligadb.de/getgoalgetters/${Shortcut}/${Season}`)
      .then(response => response.json())
      .then(data => {
        setHasGoalGetters(Array.isArray(data) && data.length > 0);
      })
      .catch(() => {
        setHasGoalGetters(false);
      });
  }, [Shortcut, Season]);


  //fetch league tbale data
  useEffect(() => {
    fetch(`https://api.openligadb.de/getbltable/${Shortcut}/${Season}`)
      .then(response => response.json())
      .then(data => {
        console.log("League data:", data);
      })
  }, [Shortcut, Season]);



  return (
    <div
      className=' flex flex-col justify-between  rounded-md w-56 h-56 border p-3 m-2 hover:w-55 hover:h-55 transition-all duration-300 ease-in-out'
    >
      <div className="font-bold">{Name}</div>
      <div>Shortcut: {Shortcut}</div>
      <div>Season: {Season}</div>
      <div>Sport: {Sport}</div>

      <div className="mt-auto">
        {hasGoalGetters === null ? (
          "Checking..."
        ) : (
          <div className='flex justify-center mt-2'>
            {hasGoalGetters && (
              <div className='p-2'>
                <button
                  className='border rounded w-25 h-8 hover:w-30 hover:h-10 hover:cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out'
                  onClick={() => onClick && onClick('goalgetters')}                >
                  Goalgetters
                </button>
              </div>
            )}
            <div className='p-2'>
              <button
                className='border rounded w-10 h-8 hover:w-12 hover:h-10 hover:cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out'
                onClick={() => onClick && onClick('table')}>
                table
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
