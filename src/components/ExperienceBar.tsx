import { useEffect, useState } from 'react';
import styles from '../styles/components/ExperienceBar.module.css'

interface ExperienceBarProps {
    startxp: number,
    endxp: number,
    xp: number,
}

export function ExperienceBar(props: ExperienceBarProps) {
    const [percert, setPercent] = useState(0)

    useEffect(() => { setPercent((props.xp / props.endxp) * 100) }, [props.xp])

    return (
        < header className={styles.experienceBar} >
            <span>{props.startxp} xp</span>
            <div>
                <div style={{ width: `${percert}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percert}%` }}> {props.xp} xp</span>
            </div>
            <span>{props.endxp} xp</span>
        </header >
    );
}