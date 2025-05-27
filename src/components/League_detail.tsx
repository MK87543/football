import { useEffect, useState } from "react";

interface Props {
    leagueShortcut: string;
    leagueSeason: string;
    viewType: 'goalgetters' | 'table';
    darkmode: boolean;
}

export default function League_detail({ leagueShortcut, leagueSeason, viewType, darkmode }: Props) {
    const [goalGetters, setGoalGetters] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [ClubImage, setClubImage] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (viewType === 'goalgetters') {
            fetchGoalGetters();
        } else {
            fetchTableData();
            fetchClubImages();
        }
    }, [leagueShortcut, leagueSeason, viewType]);

    const fetchGoalGetters = () => {
        fetch(`https://api.openligadb.de/getgoalgetters/${leagueShortcut}/${leagueSeason}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Goalgetters data:", data);
                setGoalGetters(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching goal getters:", error);
                setLoading(false);
            });
    };

    const fetchClubImages = () => {
        fetch(`https://api.openligadb.de/getavailableteams/${leagueShortcut}/${leagueSeason}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("League table data:", data);
                setClubImage(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching table data:", error);
                setLoading(false);
            });

    }

    const fetchTableData = () => {
        fetch(`https://api.openligadb.de/getbltable/${leagueShortcut}/${leagueSeason}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("League table data:", data);
                setTableData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching table data:", error);
                setLoading(false);
            });
    };

    if (loading) {
        return <div className={`${darkmode ? 'text-white' : 'text-black'}`}>Loading data...</div>;
    }

    return (
        <div>
            {viewType === 'goalgetters' && (
                <ul>
                    {goalGetters.map((getter: any) => (
                        <div className={`border mb-4 w-150 rounded-md ${darkmode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'}`}>
                            <li key={getter.goalGetterID} className="p-3">
                                {getter.goalGetterName} - Goals: {getter.goalCount}
                            </li>
                        </div>
                    ))}
                </ul>
            )}

            {viewType === 'table' && (
                <ul>
                    {tableData.map((team: any) => (
                        <div className={`border mb-4 w-150 rounded-md ${darkmode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'}`}>
                            <li key={team.teamInfoId || team.teamId} className="p-3 flex items-center">
                                <img src={ClubImage.find((club: any) => club.teamId === team.teamInfoId)?.teamIconUrl}
                                    alt={team.teamName}
                                    className="w-10 h-10 object-contain mr-3" />
                                {team.teamName} - Points: {team.points}
                            </li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
