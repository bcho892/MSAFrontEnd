import * as React from 'react';
import NavBar from '../../components/navbar/NavBar'
import styles from './Welcome.module.css'
import TechnologyCard from '../../components/technologycard/TechnologyCard';
import { useNavigate } from 'react-router-dom';
import { ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
    Button,
    ButtonGroup,
    Heading,
    Text,
    Divider,
    Box,
    useColorMode
} from '@chakra-ui/react'

type Tech = {
    name: string;
    description: string;
}

const techUsed: Tech[] = [{ name: "chakraUI", description: "I used ChakraUI as my component library. This landing page is also inspired by their website." },
{ name: "MoviesDatabase", description: "I used this API (Courtesy of rapidapi.com & Adriano Massimo) to help retrieve movie data for this web app." },
{ name: "Github", description: "I used GitHub to maintain a backup of my work, as well as being able to keep track of my progress" },
{ name: "TS React", description: "This app was created using React.js, while also taking advantage of TS's static typing" },
{ name: "User Input", description: "Users are able to interact with the Web App by making use of the search feature (top right)" }]

export default function Welcome() {
    const navigate = useNavigate();
    const toMain = React.useCallback(() => navigate('/main', { replace: true }), [navigate]);
    const { colorMode } = useColorMode();
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.heading}>
                    <Heading
                        fontSize={{ base: "3.5rem", lg: "6rem" }}
                        maxWidth="800px">
                        My MSA Assignment
                    </Heading>
                    <Heading
                        size="2xl">
                        FrontEnd
                    </Heading>
                    <Text
                        fontSize='2xl'
                        maxWidth='500px'
                    >Here I will try to apply the skills that I have learned from the MSA program</Text>
                    <ButtonGroup
                    >
                        <Button size='lg' rightIcon={<ArrowForwardIcon />} colorScheme='blue' onClick={toMain}>
                            To App
                        </Button>
                        <Button size='lg' rightIcon={<ExternalLinkIcon />}>Github</Button>
                    </ButtonGroup>

                    <Heading
                        marginTop="9rem"
                    >How I met the Requirements
                    </Heading>
                    <Divider />
                    <Box bg={colorMode === 'light' ? "gray.200" : "blackAlpha.300"} borderRadius="lg"
                        padding="2rem">
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
                    <Divider />
                    <Heading>How my App works </Heading>
                    <Divider />
                    <Text fontSize="xl" maxW="800px">
                        Using the MoviesDatabase API, I have attempted to create a
                        site that resembles that of a streaming site (e.g Netflix).
                        Users are able to both search for as well as explore already popular shows.

                    </Text>
                </div>


            </div>
        </div>
    )
}
