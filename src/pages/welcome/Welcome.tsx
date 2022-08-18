import * as React from 'react';
import NavBar from '../../components/navbar/NavBar'
import styles from './Welcome.module.css'
import TechnologyCard from '../../components/technologycard/TechnologyCard';
import { useNavigate } from 'react-router-dom';
import { ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import detailsEx from './chakmoviesdet.png'
import searchEx from './chakmoviessearch.png'
import mainEx from './chakmoviesmain.png'
import { motion } from 'framer-motion'
import {
    Button,
    ButtonGroup,
    Heading,
    Text,
    Divider,
    Box,
    useColorMode,
    Image,
    Link
} from '@chakra-ui/react'

type Tech = {
    name: string;
    description: string;
}

const techUsed: Tech[] = [{ name: "chakraUI", description: "I used ChakraUI as my component library. This landing page is also inspired by their website." },
{ name: "MoviesDatabase", description: "I used this API (Courtesy of rapidapi.com & Adriano Massimo) to help retrieve movie data for this web app." },
{ name: "Github", description: "I used GitHub to maintain a backup of my work, as well as being able to keep track of my progress" },
{ name: "TS React", description: "This app was created using React.js, while also taking advantage of TS's static typing" },
{ name: "User Input", description: "Users are able to interact with the Web App by making use of the search feature (top right)" },]

const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
}

export default function Welcome() {
    const navigate = useNavigate();
    const toMain = React.useCallback(() => navigate('/main', { replace: true }), [navigate]);
    const toSearchEx = React.useCallback(() => navigate('/search/Steve Jobs/25/Biography', { replace: true }), [navigate])
    const { colorMode } = useColorMode();
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <motion.div
                    initial={{ y: -35, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}>
                    <div className={styles.heading}>
                        <Heading

                            size="4xl"
                            maxWidth="800px">

                            <span className={styles.msa}>MSA</span> Assignment

                        </Heading>
                        <Heading
                            size="xl"
                            color={colorMode === "light" ? "gray.700" : "white"}>
                            Phase 2 Front End
                        </Heading>
                        <Text
                            fontSize='xl'
                            maxWidth='500px'
                            padding="0 1rem"
                        >ChakMovies is a Web App that allows users to search for details about Movies.
                            Made by <Link color='blue.500' onClick={() => openLink("https://github.com/bcho892")}>bcho892</Link>.</Text>
                        <ButtonGroup
                        >
                            <Button size='lg' rightIcon={<ArrowForwardIcon />} colorScheme='blue' onClick={toMain}>
                                To App
                            </Button>
                            <Button size='lg'
                                rightIcon={<ExternalLinkIcon />}
                                onClick={() => openLink("https://github.com/bcho892/MSAFrontEnd")}
                            >Github</Button>
                        </ButtonGroup>

                        <Heading
                            marginTop="9rem"
                        >How I met the Requirements
                        </Heading>
                        <Divider />
                        <Box bg={colorMode === 'light' ? "gray.200" : "blackAlpha.300"} borderRadius="lg"
                            padding="1rem">
                            <div className={styles.skillholder}>
                                {techUsed.map((value, index) => {
                                    return <TechnologyCard
                                        key={index}
                                        skill={value.name}
                                        description={value.description}
                                    />
                                })}
                            </div>

                        </Box>

                        <Heading>How my App works </Heading>
                        <Divider />
                        <Text fontSize="xl" maxWidth="800px"
                            padding="0 1rem"
                        >
                            Using the <Link color='blue.500' onClick={() => openLink("https://rapidapi.com/SAdrian/api/moviesdatabase/")}>MoviesDatabase API</Link>,
                            I have attempted to create a site that resembles that of a streaming site (e.g Netflix).
                            Users are able to both search for as well as explore already popular shows.
                        </Text>
                        <Image src={detailsEx}
                            onClick={toMain} />
                        <Image src={searchEx}
                            onClick={toSearchEx} />
                        <Image src={mainEx}
                            onClick={toMain}
                            marginBottom="2rem" />
                    </div>
                </motion.div>

            </div>
        </div >
    )
}
