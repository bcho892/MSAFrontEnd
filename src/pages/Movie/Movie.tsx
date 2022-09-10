import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { options } from '../../contexts/APIKey'
import NavBar from '../../components/navbar/NavBar'
import {
    Heading,
    Text,
    Box,
    Stack,
    Badge,
    Divider,
    Stat,
    StatNumber,
    StatHelpText,
    StatGroup,
    Image,
    Progress,
    IconButton,
    ButtonGroup,
    Tooltip,
    useColorMode
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import HomeIcon from '../../Icons/HomeIcon/HomeIcon'
import styles from './Movie.module.css'
import { formatTime } from '../../methods/Helper'

function Movie() {
    let { id } = useParams()
    const { colorMode } = useColorMode();
    const [movieInfo, setMovieInfo] = React.useState<any>({});
    const [director, setDirector] = React.useState<string>("");
    const navigate = useNavigate();
    const toMain = React.useCallback(() => navigate('/main', { replace: false }), [navigate]);

    const getMovieInfo = () => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=base_info`, options)
            .then(response => response.json())
            .then(response => {
                setMovieInfo(response.results);
            })
            .catch(err => console.error(err));
    }

    const getDirector = () => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=creators_directors_writers`, options)
            .then(response => response.json())
            .then(response => setDirector(response.results.directors[0].credits[0].name.nameText.text))
            .catch(err => console.error(err));
    }

    React.useEffect(() => {
        getMovieInfo();
        getDirector();
    }, [])
    return (

        <Box className={styles.container}
            bg={colorMode === 'light' ? 'var(--grey)' : 'none'}>
            <NavBar />
            <Box className={styles.poly1}></Box>
            <Box className={styles.poly2}></Box>
            {movieInfo.id ?
                <motion.div
                    initial={{ y: -35, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}>
                    <Box display="flex"
                        bg={colorMode === 'light' ? "white" : "none"}
                        borderRadius="1px"
                        borderWidth="1px"
                        overflow="hidden"
                        textAlign="left"
                        className={styles.infoholder}>
                        <Box className={styles.movieimage}>
                            <span>
                                <Image width="20rem"
                                    src={movieInfo.primaryImage ? movieInfo.primaryImage.url :
                                        "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"}
                                    alt="" />
                            </span>
                        </Box>
                        <Box className={styles.info}>

                            <Heading >
                                {movieInfo.titleText.text}
                            </Heading >
                            <Text>
                                {director}
                            </Text>
                            <Stack direction="row" marginTop="0.5rem">
                                {movieInfo.genres.genres.map((item: any, index: number) => {
                                    return <Badge key={item.text}
                                        variant="outline">
                                        {item.text}
                                    </Badge>
                                })}
                                <Badge colorScheme="blue">
                                    {movieInfo.releaseYear ? movieInfo.releaseYear.year : "?"}
                                </Badge>
                                {movieInfo.runtime && <Badge colorScheme="blue" variant="outline">
                                    {formatTime(movieInfo.runtime.seconds)}
                                </Badge>}
                            </Stack>
                            <Divider margin="1rem 0" />
                            <Heading fontSize="2xl"
                                marginBottom="0.5rem">
                                Synopsis
                            </Heading>
                            <Text
                                textAlign="left"
                                maxH="13rem"
                                overflowY="auto">
                                {movieInfo.plot.plotText.plainText ? movieInfo.plot.plotText.plainText : "None found"}
                            </Text>
                            <Divider
                                marginTop="auto"
                                marginBottom="-1rem"
                                className={styles.bottomdivider}
                            />
                            <Box
                                justifySelf="flex-end"
                                display="flex"
                                alignItems="center"
                                width="100%"
                                marginTop="2rem">
                                <ButtonGroup
                                >
                                    <Tooltip label="Go back">
                                        <IconButton
                                            variant="darkblue"
                                            data-testid='homeButton'
                                            aria-label='to main'
                                            icon={<HomeIcon />}
                                            onClick={toMain} />
                                    </Tooltip>
                                </ButtonGroup>
                                <StatGroup
                                    marginLeft="auto"

                                    whiteSpace="nowrap">
                                    <Stat
                                        marginRight="1rem">
                                        <StatNumber>
                                            {movieInfo.ratingsSummary.aggregateRating ?
                                                movieInfo.ratingsSummary.aggregateRating
                                                : "?"}
                                        </StatNumber>
                                        <StatHelpText>
                                            {movieInfo.ratingsSummary.voteCount} Votes
                                        </StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatNumber>
                                            {movieInfo.releaseDate ? `${movieInfo.releaseDate.day}-${movieInfo.releaseDate.month}-${movieInfo.releaseDate.year}` : "?"}
                                        </StatNumber>
                                        <StatHelpText>
                                            Date released
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </Box>
                        </Box>
                    </Box>
                </motion.div>
                : <Progress width="80%" isIndeterminate />}

        </Box>
    )
}

export default Movie