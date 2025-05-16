import React, { useEffect, useState } from 'react'
import League_card from './League_card'
import League_detail from './League_detail';

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

export default function Overview() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [filteredLeaguesYear, setFilteredLeaguesYear] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<{ leagueShortcut: string, leagueSeason: string, viewType: 'goalgetters' | 'table' } | null>(null);
  const [viewMode, setViewMode] = useState('list');
  const viewType: 'goalgetters' | 'table' = 'goalgetters';


  useEffect(() => {
    fetchAllLeagues();
  }, []);

  function fetchAllLeagues() {
    fetch("https://api.openligadb.de/getavailableleagues")
      .then(response => response.json())
      .then(leaguesData => {
        setLeagues(
          leaguesData.sort(
            (a: any, b: any) => parseInt(b.leagueSeason, 10) - parseInt(a.leagueSeason, 10)
          )
        );

        setFilteredLeagues(leaguesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leagues:", error);
        setIsLoading(false);
      });
  }

  function filterLeagues(searchTerm: string) {
    const filteredLeagues = leagues.filter(league =>
      league.leagueName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeagues(filteredLeagues);
    if (searchYear) {
      filterLeaguesYear(searchYear);
    }
  }

  function filterLeaguesYear(searchYear: string) {
    const filteredLeaguesYear = filteredLeagues.filter(league =>
      league.leagueSeason.includes(searchYear)
    );
    setFilteredLeaguesYear(filteredLeaguesYear);
  }



  const handleLeagueClick = (leagueShortcut: string, leagueSeason: string, viewType?: 'goalgetters' | 'table') => {
    setSelectedLeague({ leagueShortcut, leagueSeason, viewType: viewType || 'goalgetters' });
    setViewMode('detail');
  };

  const handleBackClick = () => {
    setViewMode('list');
    setSelectedLeague(null);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading leagues...</div>;
  }

  return (
    <div>
      {viewMode === 'list' ? (
        <>
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
            {searchYear && filteredLeaguesYear.length > 0
              ? filteredLeaguesYear.map((league) => (
                <League_card
                  key={league.leagueId}
                  Name={league.leagueName}
                  Shortcut={league.leagueShortcut}
                  Season={league.leagueSeason}
                  Sport={league.sport?.sportName}
                  onClick={(viewType) => handleLeagueClick(league.leagueShortcut, league.leagueSeason, viewType)}
                />
              ))
              : filteredLeagues.map((league) => (
                <League_card
                  key={league.leagueId}
                  Name={league.leagueName}
                  Shortcut={league.leagueShortcut}
                  Season={league.leagueSeason}
                  Sport={league.sport?.sportName}
                  onClick={(viewType) => handleLeagueClick(league.leagueShortcut, league.leagueSeason, viewType)}
                />
              ))
            }
          </div>
        </>
      ) : (
        <div className="p-4">
          <button
            onClick={handleBackClick}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer flex items-center"
          >
            Back to Leagues
          </button>

          {selectedLeague && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedLeague.viewType === 'goalgetters' ? 'Goal Scorers' : 'League Table'}
              </h2>
              <League_detail
                leagueShortcut={selectedLeague.leagueShortcut}
                leagueSeason={selectedLeague.leagueSeason}
                viewType={selectedLeague.viewType}
              />
            </div>
          )}

        </div>
      )}
    </div>
  );
}
