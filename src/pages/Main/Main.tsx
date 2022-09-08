import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import styles from './Main.module.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import {
    Box,
    Button,
    useColorModeValue,
    Text,
    Image,
    Heading,
    Progress,
    Tooltip,
    useMediaQuery

} from '@chakra-ui/react'
import { options } from '../../contexts/APIKey'
import { useNavigate } from "react-router-dom";
import MovieRow from '../../components/MovieRow/MovieRow'

type Category = {
    name: string,
    functionOption: string
}

const categories: Category[] = [{ name: "Action", functionOption: "?info=mini_info&limit=12&page=1&titleType=movie&genre=Action&year=2022" },
{ name: "Comedy", functionOption: "?info=mini_info&limit=12&page=1&titleType=movie&genre=Comedy&year=2022" }
];

const Main = () => {
    const [defaultMovies, setDefaultMovies] = React.useState<any[]>([]);
    const [featuredMovie, setFeaturedMovie] = React.useState<any>([]);
    const [additionalFeatured, setAdditionalFeatured] = React.useState<any[][]>([]);
    const [featuredDesc, setFeaturedDesc] = React.useState<string>("");

    const navigate = useNavigate();
    const toFeatured = (id: number) => { navigate(`/movie/${id}`); }; // solution adapted from https://stackoverflow.com/questions/68911432/
    const [smallScreen] = useMediaQuery('(max-width: 850px)');
    const featuredBg = useColorModeValue('#EDF2F7', 'RGBA(0, 0, 0, 0.64)');

    const setFeaturedText = (id: string) => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=base_info`, options)
            .then(response => response.json())
            .then(response => setFeaturedDesc(response.results.plot.plotText.plainText))
            .catch(err => {
                console.error(err);
                setFeaturedDesc("");
            });
    }

    const setDefault = () => {

        fetch('https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=12&page=1&titleType=movie&list=most_pop_movies', options)
            .then(response => response.json())
            .then(response => {
                setDefaultMovies(response.results)
            })
            .catch(err => {
                console.error(err);
                setDefaultMovies([]);
            });

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
                .catch(err => {
                    console.error(err);
                    setAdditionalFeatured([]);
                });
        }
    }

    React.useEffect(() => {
        fetch('https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=1&page=1&year=2022&list=top_rated_250', options)
            .then(response => response.json())
            .then(response => {
                setFeaturedMovie(response.results[0])
                setFeaturedText(response.results[0].id)
            })
            .catch(err => {
                console.error(err);
                setFeaturedMovie([]);
                setFeaturedDesc("Error");
            });
        getGenreFeatured();
        setDefault();
    }, [])

    if (featuredMovie === []) {
        return (
            <Progress width="80%" isIndeterminate />
        )
    }

    return (
        <>
            <NavBar />
            {additionalFeatured.length > 0 ? <Box
                className={styles.container}
            >
                <div className={styles.featured}>
                    <Box className={styles.leftbox}></Box>
                    {featuredMovie.primaryImage &&
                        <Image
                            src={featuredMovie.primaryImage.url}
                            alt=''
                            maxHeight='35rem'
                            objectFit='cover' />
                    }
                    <Box className={styles.featuredtext}
                    >
                        {featuredMovie.id ?
                            <>
                                <Heading
                                    size={smallScreen ? "2xl" : "3xl"}>
                                    {featuredMovie.titleText.text}
                                </Heading>
                                <Heading size='md'>
                                    Featured
                                </Heading>
                                <Text
                                    fontSize="md"
                                    maxW="800px">
                                    {featuredDesc}
                                </Text>
                                <Tooltip label={`See |${featuredMovie.titleText.text}|'s details`}>
                                    <Button
                                        borderRadius="1px"
                                        size='lg'
                                        variant={smallScreen ? 'outline' : 'darkblue'}
                                        colorScheme={smallScreen ? 'white' : ''}
                                        onClick={() => toFeatured(featuredMovie.id)}>
                                        More
                                    </Button>
                                </Tooltip>
                            </> :
                            <Progress width="80%" isIndeterminate data-testid="loadingbar" />
                        }
                    </Box>
                    <Box className={styles.rightbox} />

                </div >


                <MovieRow children={defaultMovies.map((item, index) => {
                    return item.primaryImage && item.primaryImage.url ?
                        <MovieCard key={item.id} title={item.titleText.text}
                            imgurl={item.primaryImage.url}
                            year={item.releaseYear.year}
                            id={item.id} />
                        : null;
                })}
                    genre={"Currently Popular"}
                />



                {
                    additionalFeatured.length > 0 ? additionalFeatured.map((item, index) => {
                        let currentRow = item.map((genre, index1) => {
                            return genre.primaryImage && genre.primaryImage.url ?
                                <MovieCard
                                    key={genre.id} title={genre.titleText.text}
                                    imgurl={genre.primaryImage.url}
                                    year={genre.releaseYear.year}
                                    id={genre.id} />
                                : null;
                        })

                        return <div key={index}>
                            <MovieRow
                                genre={categories[index].name}
                                children={currentRow} />
                        </div>;
                    }) : <Progress width="50rem" isIndeterminate data-testid="loadingbar" />
                }

            </Box > :
                <Box display="flex"
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                    width="100vw">
                    < Progress width="50rem"
                        isIndeterminate data-testid="loadingbar" />
                </Box>}
        </>)
}

export default Main