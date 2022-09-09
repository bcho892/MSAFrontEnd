import * as React from 'react';
import NavBar from '../../components/navbar/NavBar'
import styles from './Welcome.module.css'
import TechnologyCard from '../../components/technologycard/TechnologyCard';
import { useNavigate } from 'react-router-dom';
import { ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import {
    Button,
    ButtonGroup,
    Heading,
    Text,
    Divider,
    Box,
    useColorMode,
    Link
} from '@chakra-ui/react'

type Tech = {
    name: string;
    description: string;
    unsure: boolean;
}

const techUsed: Tech[] = [{ name: "chakraUI", description: "I used ChakraUI as my component library. This landing page is also inspired by their website.", unsure: false },
{ name: "MoviesDatabase", description: "I used this API (Courtesy of rapidapi.com & Adriano Massimo) to help retrieve movie data for this web app.", unsure: false },
{ name: "Github", description: "I used GitHub to maintain a backup of my work, as well as being able to keep track of my progress", unsure: false },
{ name: "TS React", description: "This app was created using React.js, while also taking advantage of TS's static typing", unsure: false },
{ name: "User Input", description: "Users are able to interact with the Web App by making use of the search feature (top right)", unsure: false },]

const advancedFeatures: Tech[] = [{ name: "Mobile First Development", description: "Using media breakpoints and having and awareness of how smaller screens interact with content, I have made sure my app is fully responsive to this.", unsure: false },
{ name: "UI Scaliability", description: "Similarly to mobile first development, different screen sizes warrant different experiences, and I have accounted for such also using media queries and conditionals", unsure: false },
{ name: "Fluid Transition", description: "Throughout the site, I have implemented a bunch of transitions/animations which make use of both Framer Motion as well as pure CSS", unsure: false },
{ name: "(Own) API connection", description: "I have included a Flask REST API from my Data Science project as a small mini-feature, which is cloud hosted on GCP", unsure: false },
{ name: "Unit Testing", description: "Using the Jest Testing Library, I have included unit tests to make sure my componenents and logic are working as intended without worrying about implementation details, resulting in more robust development", unsure: false },
{ name: "Complex FE Logic", description: "This app includes aspects which I would consider to be 'complex' such as: routing, params as props, props being passed down multiple components", unsure: true }]

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
            <LoadingScreen />
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
                            Phase 3 Front End
                        </Heading>
                        <Text
                            fontSize='xl'
                            maxWidth='500px'
                            padding="0 1rem"
                        >ChakMovies is a Web App that allows users to search for details about Movies.
                            Made by <Link color='blue.500' onClick={() => openLink("https://github.com/bcho892")}>bcho892</Link>.</Text>
                        <ButtonGroup
                        >
                            <Button size='lg' rightIcon={<ArrowForwardIcon />} variant='darkblue' onClick={toMain}>
                                To App
                            </Button>
                            <Button size='lg'
                                rightIcon={<ExternalLinkIcon />}
                                onClick={() => openLink("https://github.com/bcho892/MSAFrontEnd")}
                            >Github</Button>
                        </ButtonGroup>

                        <Heading marginTop="9rem">How my App works </Heading>
                        <Divider />
                        <Text fontSize="xl" maxWidth="800px"
                            padding="0 1rem"
                        >
                            Using the <Link color='blue.500' onClick={() => openLink("https://rapidapi.com/SAdrian/api/moviesdatabase/")}>MoviesDatabase API</Link>,
                            I have attempted to create a site that resembles that of a streaming site (e.g Netflix).
                            Users are able to both search for as well as explore already popular shows.
                        </Text>
                        <Heading
                        >How I met the Requirements (Basic)
                        </Heading>
                        <Divider />
                        <Box padding="1rem"
                            maxW="1100px">
                            <div className={styles.skillholder}>
                                {techUsed.map((value, index) => {
                                    return <TechnologyCard
                                        key={index}
                                        skill={value.name}
                                        unsure={value.unsure}
                                        description={value.description}
                                    />
                                })}
                            </div>
                        </Box>
                        <Heading>What about advanced?</Heading>
                        <Divider />
                        <Box padding="1rem"
                            maxW="1100px">
                            <div className={styles.skillholder}>
                                {advancedFeatures.map((value, index) => {
                                    return <TechnologyCard
                                        key={index}
                                        skill={value.name}
                                        unsure={value.unsure}
                                        description={value.description}
                                    />
                                })}
                            </div>
                        </Box>

                    </div>
                </motion.div>

            </div>
        </div >
    )
}
