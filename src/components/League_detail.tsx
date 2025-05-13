import React, { useEffect, useState } from "react";
interface Props {
    leagueShortcut: string;
    leagueSeason: string;
    viewType: 'goalgetters' | 'table';
}

export default function League_detail({ leagueShortcut, leagueSeason, viewType }: Props) {
    const [goalGetters, setGoalGetters] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (viewType === 'goalgetters') {
            fetchGoalGetters();
        } else {
            fetchTableData();
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
        return <div>Loading data...</div>;
    }

    return (
        <div>
            {viewType === 'goalgetters' && (
                <ul>
                    {goalGetters.map((getter: any) => (
                        <li key={getter.goalGetterID}>
                            {getter.goalGetterName} - Goals: {getter.goalCount}
                        </li>
                    ))}
                </ul>
            )}

            {viewType === 'table' && (
                <ul>
                    {tableData.map((team: any) => (
                        <li key={team.teamInfoId || team.teamId}>
                            {team.teamName} - Points: {team.points}, Rank: {team.rank}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
