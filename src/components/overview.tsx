import { useEffect, useState } from 'react';
import League_card from './League_card';
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

interface Props {
  darkmode: boolean;
  searchTerm: string;
  searchYear: string;
  setSearchTerm: (term: string) => void;
  setSearchYear: (year: string) => void;
}

export default function Overview({ darkmode, searchTerm, searchYear }: Props) {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [filteredLeaguesYear, setFilteredLeaguesYear] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<{ leagueShortcut: string, leagueSeason: string, viewType: 'goalgetters' | 'table' } | null>(null);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    fetchAllLeagues();
  }, []);

  useEffect(() => {
    filterLeagues(searchTerm);
  }, [searchTerm, leagues]);

  useEffect(() => {
    if (searchYear) {
      filterLeaguesYear(searchYear);
    }
  }, [searchYear, filteredLeagues]);

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
    return <div className={`flex justify-center items-center h-screen ${darkmode ? 'text-white' : 'text-black'}`}>Loading leagues...</div>;
  }

  return (
    <div>
      {viewMode === 'list' ? (
        <div className='flex flex-wrap gap-2 align-center justify-center p-4'>
          {searchYear && filteredLeaguesYear.length > 0
            ? filteredLeaguesYear.map((league) => (
              <League_card
                key={league.leagueId}
                Name={league.leagueName}
                Shortcut={league.leagueShortcut}
                Season={league.leagueSeason}
                Sport={league.sport?.sportName}
                onClick={(viewType) => handleLeagueClick(league.leagueShortcut, league.leagueSeason, viewType)}
                darkmode={darkmode}
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
                darkmode={darkmode}
              />
            ))
          }
        </div>
      ) : (
        <div className="p-4">
          <button
            onClick={handleBackClick}
            className={`mb-6 px-4 py-2 rounded-md hover:cursor-pointer flex items-center transition-colors ${darkmode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
          >
            Back to Leagues
          </button>

          {selectedLeague && (
            <div className={`rounded-lg shadow-md p-6 ${darkmode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <h2 className="text-2xl font-bold mb-4">
                {selectedLeague.viewType === 'goalgetters' ? 'Goal Scorers' : 'League Table'}
              </h2>
              <League_detail
                leagueShortcut={selectedLeague.leagueShortcut}
                leagueSeason={selectedLeague.leagueSeason}
                viewType={selectedLeague.viewType}
                darkmode={darkmode}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
