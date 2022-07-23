import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import styles from './Search.module.css'
import SearchResult from '../../components/SearchResult/SearchResult'
import { useParams } from 'react-router-dom'
import { options } from '../../contexts/APIKey'
import {
    Box,
    Heading,
    Text,
    useColorModeValue,
    Stack,
    Badge
} from '@chakra-ui/react'
function Search() {

    const containerColor = useColorModeValue('gray.100', 'RGBA(255, 255, 255, 0.04)');

    const bgColor = useColorModeValue('white', 'RGBA(255, 255, 255, 0.04)');
    const [searchPage, setSearchPage] = React.useState<any[]>([]);
    let { keyword, limit, year, genre } = useParams();
    let yearBadge;
    let genreBadge;


    const makeSearch = () => {
        let yearParam: string = "";
        let genreParam: string = "";

        if (year && !genre && /^\d+$/.test(year)) {
            yearParam = `&year=${year}`

        } else if (year && !genre) {
            genreParam = `&genre=${year}`

        }
        else if (genre && year) {
            yearParam = `&year=${year}`;
            genreParam = `&genre=${genre}`;

        }


        fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?info=base_info&limit=${limit}&page=1&titleType=movie${yearParam}${genreParam}`, options)
            .then(response => response.json())
            .then(response => {
                setSearchPage(response.results)
                console.log(
                    response.results
                )
            })
            .catch(err => console.error(err));
    }
    React.useEffect(() => {
        makeSearch();
    }, [keyword, limit, year, genre])
    return (
        <Box className={styles.container}
            bg={containerColor}>
            <NavBar />
            <Box
                borderRadius="lg"
                overflow="hidden"
                bg={bgColor}
                textAlign="left"
                width="50rem"
                maxW="50rem"
                display="flex"
                flexDir="column">
                <Box padding="1.5rem">
                    <Heading>
                        Results for: {keyword}
                    </Heading>
                    <Stack direction="row" margin="0.25rem 0">
                        {year && genre && <Badge colorScheme="blue" variant="outline">YEAR: {year}</Badge>}
                        {year && !/^\d+$/.test(year) && !genre &&
                            <Badge colorScheme="blue" variant="outline">GENRE: {year}</Badge>}
                        {year && /^\d+$/.test(year) && !genre &&
                            <Badge colorScheme="blue" variant="outline">YEAR: {year}</Badge>}
                        {genre && <Badge colorScheme="blue" variant="outline">GENRE: {genre}</Badge>}
                    </Stack>

                    <Text>
                        Max {limit} Results ({searchPage.length} found)
                    </Text>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"

                    overflowY="auto">
                    {searchPage.map((item, index) => {
                        return <SearchResult key={item.id}
                            rating={item.ratingsSummary.aggregateRating ? item.ratingsSummary.aggregateRating : "?"}
                            title={item.titleText.text}
                            year={item.releaseYear ? item.releaseYear.year : ""}
                            id={item.id} />;
                    })}
                </Box>
            </Box>


        </Box>
    )
}

export default Search