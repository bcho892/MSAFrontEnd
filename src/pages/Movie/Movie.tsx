import React from 'react'
import { useParams } from 'react-router-dom'
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
    Progress
} from '@chakra-ui/react'
import styles from './Movie.module.css'

const formatTime = (seconds: number): string => {
    const output: number[] = [];
    let hours = Math.floor(seconds / 3600);
    output.push(hours);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    output.push(minutes);
    output.push(seconds);
    let formatted: string = "";
    for (let i = 0; i < output.length; ++i) {
        if (output[i] > 0)
            switch (i) {
                case 0:
                    formatted += `${output[i]} H `
                    break;
                case 1:
                    formatted += `${output[i]} M `
                    break;
                case 2:
                    formatted += `${output[i]} S `
                    break;
            };
    }
    return formatted;
}


function Movie() {
    let { id } = useParams()
    const [movieInfo, setMovieInfo] = React.useState<any>({});
    const [director, setDirector] = React.useState<string>("");
    const getMovieInfo = () => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=base_info`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
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

        <div className={styles.container}>
            <NavBar />
            {movieInfo.id ?
                <Box display="flex"
                    borderRadius="lg"
                    borderWidth="1px"
                    overflow="hidden">

                    <Image width="20rem" src={movieInfo.primaryImage ? movieInfo.primaryImage.url :
                        "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"}
                        alt="" />
                    <Box className={styles.info}>

                        <Heading>
                            {movieInfo.titleText.text}
                        </Heading>
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
                                {movieInfo.releaseYear.year}
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
                            textAlign="left">
                            {movieInfo.plot ? movieInfo.plot.plotText.plainText : "None found"}
                        </Text>

                        <StatGroup
                            alignSelf="flex-end"
                            marginTop="auto"
                            whiteSpace="nowrap"

                        >
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
                                    {movieInfo.releaseDate.day}-{movieInfo.releaseDate.month}-{movieInfo.releaseDate.year}
                                </StatNumber>
                                <StatHelpText>
                                    Date released
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                    </Box>
                </Box> : <Progress width="50rem" isIndeterminate />}

        </div>
    )
}

export default Movie