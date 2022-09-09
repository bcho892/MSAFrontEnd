import React from 'react'
import styles from './LoadingScreen.module.css'
import { ReactComponent as Logo } from './logo.svg'
import { Box } from '@chakra-ui/react'

const maxPhases: number = 5
export default function LoadingScreen() {
    const [phase, setPhase] = React.useState<number>(0);
    const animateSquares = (box: number) => ((box === 1) ? `${styles.box1} ` : `${styles.box2} `) + (phase === 1 ? `${styles.out}` : phase === 2 ? `${styles.on}` : phase === 3 ? '' : `${styles.out} `)
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    React.useEffect(() => {

        if (isPlaying || phase > maxPhases) return;
        console.log(phase);
        setIsPlaying(true);
        setTimeout(() => {
            setIsPlaying(false);
        }, 1000);
        setPhase(phase + 1);
    }, [phase, isPlaying])
    return (
        <Box data-testid="container" className={`${styles.loading} ` + (phase >= maxPhases && `${styles.out}`)} >
            <Box
                className={`${styles.logowrapper} ` + (phase >= maxPhases - 1 && `${styles.on}`)} >
                <Logo

                    fill='white'
                    width='80vw' />
            </Box>
            <Box className={animateSquares(1)}></Box>
            <Box data-testid="box2" className={animateSquares(2)}
                display={phase >= 5 ? 'none' : 'block'}></Box>
        </ Box >
    )
}