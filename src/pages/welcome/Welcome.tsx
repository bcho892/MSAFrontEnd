import * as React from 'react';
import NavBar from '../../components/navbar/NavBar'
import styles from './Welcome.module.css'
import TechnologyCard from '../../components/technologycard/TechnologyCard';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Heading, Text } from '@chakra-ui/react'
type Props = {

}

type Tech = {
    name: string;
    description: string;
}

const techUsed: Tech[] = [{ name: "chakraUI", description: "I used this material framwork to make it easier to theme and style this" },
{ name: "API", description: "I used this API alongside the fetch API to retrieve data from this source" },
{ name: "API", description: "I used this API alongside the fetch API to retrieve data from this source" }]



export default function Welcome({ }: Props) {
    const navigate = useNavigate();
    const toMain = React.useCallback(() => navigate('/main', { replace: true }), [navigate]);
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.heading}>
                    <Heading
                        fontSize={{ base: "3.5rem", lg: "6rem"}}
                        maxWidth="800px">
                        Welcome to my MSA project
                    </Heading>
                    <Text
                        fontSize='2xl'
                        maxWidth='500px'
                    >Here I will try to apply the skills that I have learned from the MSA program</Text>
                    <ButtonGroup
                    >
                        <Button size='lg' colorScheme='blue' onClick={toMain}>
                            To App
                        </Button>
                        <Button size='lg'>Github</Button>
                    </ButtonGroup>
                    <Heading
                        marginTop="9rem"
                        marginBottom="2rem">How I met the Requirements</Heading>
                    <div className={styles.skillholder}>
                        {techUsed.map((value, index) => {
                            return <TechnologyCard
                                key={index}
                                skill={value.name}
                                description={value.description}
                                icon='' />
                        })}
                    </div>
                </div>


            </div>
        </div>
    )
}
