import React, { useEffect, useState } from 'react'
import League_card from './League_card'
import search from './search';

type Props = {}

let text = "";

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

export default function Overview({ }: Props) {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [filteredLeaguesYear, setFilteredLeaguesYear] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYear, setSearchYear] = useState("");

  useEffect(() => {
    fetchAllLeagues();
  }, []);

  function fetchAllLeagues() {
    fetch("https://api.openligadb.de/getavailableleagues")
      .then(response => response.json())
      .then(leaguesData => {
        console.log("Leagues", leaguesData);
        setLeagues(leaguesData);
        setFilteredLeagues(leaguesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leagues:", error);
        setIsLoading(false);
      });
  }

  function filterLeagues(searchTerm: string) {
    const filteredLeagues = leagues.filter(league => league.leagueName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredLeagues(filteredLeagues);
    if (searchYear) {
      filterLeaguesYear(searchYear);
    }
  }

  function filterLeaguesYear(searYear: string) {
    const filteredLeaguesYear = filteredLeagues.filter(league => league.leagueSeason.includes(searYear));
    setFilteredLeaguesYear(filteredLeaguesYear);
  }

  return (
    <div>
      <div className='flex justify-center items-center'>
        <input
          type="text"
          value={searchTerm}
          onChange={(el) => {
            setSearchTerm(el.target.value);
            filterLeagues(el.target.value);
          }}
          placeholder="search by name"
          className="flex justify-center items-center border h-10 px-2 m-4 rounded-md"
        />

        {searchTerm.length > 0 && (
          <input
            type="text"
            value={searchYear}
            onChange={(el) => {
              setSearchYear(el.target.value);
              filterLeaguesYear(el.target.value);
            }}
            placeholder="search by year"
            className="flex justify-center items-center border h-10 px-2 m-4 rounded-md"
          />
        )}
      </div>

      <div className='flex flex-wrap gap-2 align-center justify-center'>
        {searchYear && filteredLeaguesYear.length > 0 ? filteredLeaguesYear.map((league) => (
          <League_card
            Name={league.leagueName}
            Shortcut={league.leagueShortcut}
            Season={league.leagueSeason}
            Sport={league.sport?.sportName}
          />
        )) : filteredLeagues.map((league) => (
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
