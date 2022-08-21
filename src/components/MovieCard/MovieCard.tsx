import React from 'react'
import styles from './MovieCard.module.css'
import { Box, Image, Heading, useMediaQuery, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
type Props = {
    title: string,
    imgurl: string;
    year: string;
    id: string;
}

function MovieCard({ id, title, imgurl, year }: Props) {
    const [smallScreen] = useMediaQuery('(max-width: 600px)');
    const bgclr = useColorModeValue("white", "gray.700")
    const navigate = useNavigate();
    const toMovie = React.useCallback(() => navigate(`/movie/${id}`, { replace: false }), [navigate]);
    return (
        <motion.div
            className={styles.md}
            initial={{ x: -35, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
        >
            <Box
                onClick={toMovie}
                className={styles.container}
                display='flex'
                alignItems='center'
                objectFit='cover'
                borderRadius='lg'
                bg={bgclr}
                overflow='hidden'
            >
                <Box>
                    <Image
                        className={styles.overlay}
                        src={imgurl}
                        alt='img' />
                </Box>
                <Box
                    alignItems={smallScreen ? "center" : ""}
                    display={smallScreen ? "flex" : "none"}
                    height="100%"
                >
                    <Heading className={styles.extrainfo}
                        fontSize="1.5rem"
                    >
                        {title} <br />
                        ({year})
                    </Heading>
                </Box>
            </Box >
        </motion.div>
    )
}

export default MovieCard