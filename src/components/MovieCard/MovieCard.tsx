import React from 'react'
import styles from './MovieCard.module.css'
import { Box, Image, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

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
        <Box
            onClick={toMovie}
            className={styles.container}
            display='flex'
            justifyContent='center'
            alignItems='center'
            minWidth='13rem'
            objectFit='cover'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'>

            <Heading className={styles.extrainfo}
                fontSize="1.5rem"
                color='white' >
                {title} <br />
                ({year})
            </Heading>

            <Image
                className={styles.overlay}
                height='20rem'
                objectFit='cover'
                src={imgurl}
                alt='img' />
        </Box >
    )
}

export default MovieCard