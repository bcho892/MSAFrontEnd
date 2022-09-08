import React from 'react'
import { Box, Stack, Badge, Heading, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styles from './MovieRow.module.css'
type Props = {
    genre: string
    children: any
}

const scrollDistance: number = 400;

export default function MovieRow({ genre, children }: Props) {
    const [currentScroll, setCurrentScroll] = React.useState<number>(0);

    const ref: any = React.useRef(null)
    const atLeft = (): boolean => {
        return currentScroll === 0;
    }

    const atRight = (): boolean => {
        if (!ref.current) return false;
        return currentScroll === ref.current.scrollWidth - ref.current.clientWidth;
    }
    const scroll = (amount: number) => {
        if (!ref) return;
        ref.current.scrollLeft += amount;
        setCurrentScroll(ref.current.scrollLeft);
        console.log(currentScroll);
    }


    return (
        <Box padding="1rem 2rem"
            position="relative"
            margin="2rem 0"
        >
            <Stack direction="row"
                justifyContent="center"
                margin="2rem 0">
                <motion.div
                    initial={{ y: -35, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}>
                    <Heading
                        position="relative"
                        fontWeight="900"
                    >{genre}
                    </Heading>
                </ motion.div>
            </Stack>
            <Box
                className={styles.moviewrapper}
            >
                <Box
                    onClick={() => scroll(-scrollDistance)}
                    className={`${styles.scrollbutton} ${styles.left} ` + (atLeft() && `${styles.off}`)}>
                </Box>
                <Box
                    ref={ref}
                    onScroll={() => setCurrentScroll(ref.current.scrollLeft)}
                    className={styles.movierow}
                    sx={
                        {
                            '::-webkit-scrollbar': { display: 'none' }
                        }}>
                    {children}
                </Box>
                <Box
                    onClick={() => scroll(scrollDistance)}
                    className={`${styles.scrollbutton} ${styles.right} ` + (atRight() && `${styles.off}`)}>
                </Box>
            </Box>
        </Box >
    )
}