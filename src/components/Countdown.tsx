import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge, activeChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTimeout(() => {
            setTime(1 * 60);
        }, 500);

    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            startNewChallenge();
            setHasFinished(true);
            setIsActive(false);
        }
    }, [isActive, time])

    useEffect(() => {
        if (activeChallenge === null) {
            setHasFinished(false);
            setIsActive(false);
            setTime(1 * 60);

        }
    }, [activeChallenge])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                    disabled
                    className={styles.CountdownButton}
                >
                    Ciclo encerrado.
                </button>
            ) : (
                    <>
                        {
                            isActive ? (
                                <button
                                    type="button"
                                    className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
                                    onClick={resetCountdown}
                                >
                                    Abandonar ciclo.
                                </button>
                            ) :
                                (
                                    <button
                                        type="button"
                                        className={styles.CountdownButton}
                                        onClick={startCountdown}
                                    >
                                        Iniciar um ciclo.
                                    </button>
                                )
                        }
                    </>
                )
            }
        </div >
    )
}