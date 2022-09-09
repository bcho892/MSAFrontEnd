import React from 'react'
import styles from './MovieCard.module.css'
import { ReactComponent as Info } from './infoicon.svg'
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
    const [smallScreen] = useMediaQuery('(max-width: 700px)');
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
                data-testid="container"
                onClick={toMovie}
                className={styles.container}
                objectFit='cover'
                borderRadius='sm'
                bg={bgclr}
                overflow='hidden'
            >
                {!smallScreen &&
                    <Box className={styles.buttoncontainer}>
                        <Box className={styles.infobutton}>
                            <Info id={styles.infoicon} />
                        </Box>
                    </Box>}
                <Box>
                    <Image
                        className={styles.overlay}
                        src={imgurl}
                        alt={title} />
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