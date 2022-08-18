import React from 'react'
import styles from './MovieCard.module.css'
import { Box, Image, Heading, useMediaQuery } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
type Props = {
    title: string,
    imgurl: string;
    year: string;
    id: string;
}

function MovieCard({ id, title, imgurl, year }: Props) {
    const navigate = useNavigate();
    const toMovie = React.useCallback(() => navigate(`/movie/${id}`, { replace: false }), [navigate]);
    return (
        <motion.div
            className={styles.md}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <Box
                onClick={toMovie}
                className={styles.container}
                display='flex'
                justifyContent='center'
                alignItems='center'
                objectFit='cover'
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'>

                <Image
                    className={styles.overlay}
                    objectFit='cover'
                    src={imgurl}
                    alt='img' />
                <Heading className={styles.extrainfo}
                    fontSize="1.5rem"
                    color='white' >
                    {title} <br />
                    ({year})
                </Heading>

            </Box >
        </motion.div>
    )
}

export default MovieCard