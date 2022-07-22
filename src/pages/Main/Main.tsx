import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import styles from './Main.module.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import { CircularProgress, CircularProgressLabel, Box, Button, useColorModeValue, Text, Stack, Badge, Image, Heading } from '@chakra-ui/react'
type Props = {}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4f7cae7f7fmsh719be4d5125f452p10def8jsnd0e1b8655d1d',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
};

type Category = {
    name: string,
    functionOption: string
}

const categories: Category[] = [{ name: "Upcoming", functionOption: "/x/upcoming?info=mini_info&limit=10&page=1&titleType=movie&year=2022" },
{ name: "Action", functionOption: "?info=mini_info&limit=10&page=1&titleType=movie&genre=Action&year=2022" },
{ name: "Comedy", functionOption: "?titleType=movie&info=mini_info&year=2022&genre=Crime&page=2&limit=10" }];

const Main = (props: Props) => {
    const [defaultMovies, setDefaultMovies] = React.useState<any[]>([]);
    const [featuredMovie, setFeaturedMovie] = React.useState<any>([]);
    const [additionalFeatured, setAdditionalFeatured] = React.useState<any[][]>([]);
    const [featuredDesc, setFeaturedDesc] = React.useState<string>("");

    const featuredBg = useColorModeValue('#EDF2F7', 'RGBA(0, 0, 0, 0.64)');

    const setFeatured = () => {
        fetch('https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=1&page=1&year=2022&list=top_rated_250', options)
            .then(response => response.json())
            .then(response => {
                setFeaturedMovie(response.results[0])
                setFeaturedText(response.results[0].id)
            })
            .catch(err => console.error(err));
    }

    const setFeaturedText = (id: string) => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=base_info`, options)
            .then(response => response.json())
            .then(response => setFeaturedDesc(response.results.plot.plotText.plainText))
            .catch(err => console.error(err));
    }

    const setDefault = () => {

        fetch('https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=10&page=1&titleType=movie&list=most_pop_movies', options)
            .then(response => response.json())
            .then(response => {
                console.log(response.results)
                setDefaultMovies(response.results)
            })
            .catch(err => console.error(err));

    }

    const getGenreFeatured = () => {
        let temp: any[][] = []
        for (let i = 0; i < categories.length; ++i) {
            fetch(`https://moviesdatabase.p.rapidapi.com/titles${categories[i].functionOption}`, options)
                .then(response => response.json())
                .then(response => {
                    temp.push(response.results);
                    if (i === categories.length - 1) setAdditionalFeatured(temp);
                })
                .catch(err => console.error(err));
        }
    }

    React.useEffect(() => {
        getGenreFeatured();
        setFeatured();
        setDefault();

    }, [])
    React.useEffect(() => {

    }, [additionalFeatured])
    return (
        <div className={styles.container}
        >
            <NavBar />
            <div className={styles.featured}>
                {featuredMovie.primaryImage &&
                    <Image
                        src={featuredMovie.primaryImage.url}
                        alt=''
                        maxWidth='50vw'
                        minWidth='40rem'
                        opacity='0.9'
                        objectFit='cover' />
                }
                <Box className={styles.featuredtext}
                    backgroundColor={featuredBg}
                >

                    {featuredMovie.titleText &&
                        <Heading
                            colorScheme="blue"
                            fontSize="3.5rem">
                            {featuredMovie.titleText.text}
                        </Heading>
                    }
                    <Heading>
                        Featured
                    </Heading>
                    <Text
                        maxW="800px">
                        {featuredDesc}
                    </Text>

                    <Button size='lg' colorScheme='blue'>
                        More
                    </Button>
                </Box>

            </div>
            <Stack direction="row"
                marginBottom='2rem'>
                <Badge
                    colorScheme="blue"
                    width="4rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"></Badge>

                <Heading
                >Currently Popular
                </Heading>
            </Stack>
            <Box className={styles.movierow}
                backgroundColor={featuredBg}
            >

                {defaultMovies.map((item, index) => {
                    return item.primaryImage && item.primaryImage.url ?
                        <MovieCard key={item.id} title={item.titleText.text}
                            imgurl={item.primaryImage.url}
                            year={item.releaseYear.year}
                            id={item.id} />
                        : null;
                })}
            </Box>

            {additionalFeatured.map((item, index) => {

                let currentRow = item.map((genre, index1) => {
                    return genre.primaryImage && genre.primaryImage.url ?
                        <MovieCard key={genre.id} title={genre.titleText.text}
                            imgurl={genre.primaryImage.url}
                            year={genre.releaseYear.year}
                            id={genre.id} />
                        : null;
                })

                return <div key={index}>
                    <Stack direction="row"
                        marginBottom='2rem'>
                        <Badge
                            colorScheme="blue"
                            width="4rem"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"></Badge>

                        <Heading
                        >{categories[index].name}
                        </Heading>
                    </Stack>
                    <Box className={styles.movierow}
                        backgroundColor={featuredBg}>
                        {currentRow}
                    </Box>
                </div>;
            })}



        </div >
    )
}

export default Main