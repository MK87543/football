import React, { useEffect, useState } from 'react'
import League_card from './League_card'

type Props = {}

interface League {
  leagueId: number;
  leagueName: string;
  leagueShortcut: string;
  leagueSeason: string;
  sport: {
    sportId: number;
    sportName: string;
  };
}

export default function Overview({}: Props) {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllLeagues();
  }, []);

  function fetchAllLeagues() {
    fetch("https://api.openligadb.de/getavailableleagues")
      .then(response => response.json())
      .then(leaguesData => {
        console.log("Leagues", leaguesData);
        setLeagues(leaguesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leagues:", error);
        setIsLoading(false);
      });
  }

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Overview</h2>
      <div>Hier stehen alle Ligen in Karten form</div>
      <div className='flex flex-wrap gap-2 align-center justify-center'>
          {leagues.map((league) => (
            <League_card 
              Name={league.leagueName}
              Shortcut={league.leagueShortcut}
              Season={league.leagueSeason}
              Sport={league.sport?.sportName}
            />
          ))}
        </div>
    </div>
  )
}
