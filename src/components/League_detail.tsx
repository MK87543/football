import React, { useEffect, useState } from "react";

interface Props {
    leagueShortcut: string;
    leagueSeason: string;
}



export default function League_detail({ leagueShortcut, leagueSeason }: Props) {
    const [goalGetters, setGoalGetters] = useState([]);

    useEffect(() => {
        fetchGoalGetters();
    }, [leagueShortcut, leagueSeason]);

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
            })


    };

    return (
        <div>
            <ul>
                {goalGetters.map((getter: any) => (
                    <li key={getter.goalGetterID}>
                        {getter.goalGetterName} - Goals: {getter.goalCount}
                    </li>
                ))}
            </ul>

        </div>
    );
}
