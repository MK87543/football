import React, { useEffect, useState } from 'react';

type Props = {
  Name: string;
  Shortcut: string;
  Season: string;
  Sport: string;
  onClick?: () => void;
}

export default function League_card({ Name, Shortcut, Season, Sport, onClick }: Props) {
  const [hasGoalGetters, setHasGoalGetters] = useState<boolean | null>(null);

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

  return (
    <div
      className='rounded-md w-50 h-50 border p-3 m-2 hover:w-55 hover:h-55 hover:cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out'
      onClick={onClick}
    >
      <div className="font-bold">{Name}</div>
      <div>Shortcut: {Shortcut}</div>
      <div>Season: {Season}</div>
      <div>Sport: {Sport}</div>

      { }
      <div className="mt-2">
        {hasGoalGetters === null ? (
          "Checking..."
        ) : hasGoalGetters ? (
          <span style={{ color: 'green' }}>✓ Has goalgetters</span>
        ) : (
          <span style={{ color: 'red' }}>✗ No goalgetters</span>
        )}
      </div>
    </div>
  )
}
