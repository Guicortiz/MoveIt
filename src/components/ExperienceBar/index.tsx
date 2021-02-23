import { useEffect, useState } from 'react';
import './style.css'

interface ExperienceBarProps {
    level: number,
    startxp: number,
    endxp: number,
    xp: number,
}

export function ExperienceBar(props: ExperienceBarProps) {
    const [percert, setPercent] = useState(0)

    useEffect(() => { setPercent((props.xp / props.endxp) * 100) }, [])

    return (
        < header className="experiencebar" >
            <span className="current-level">Level {props.level}</span>
            <span>{props.startxp} xp</span>
            <div>
                <div style={{ width: `${percert}%` }} />
                <span className="current-experience" style={{ left: `${percert}%` }}> {props.xp} xp</span>
            </div>
            <span>{props.endxp} xp</span>
        </header >
    );
}