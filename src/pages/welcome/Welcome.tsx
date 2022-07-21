import * as React from 'react';
import NavBar from '../../components/navbar/NavBar'
import styles from './Welcome.module.css'
import TechnologyCard from '../../components/technologycard/TechnologyCard';
import { Button, ButtonGroup } from '@chakra-ui/react'
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
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1>Welcome to my MSA Front End project</h1>
                    <p>Here I will try to apply the skills that I have learned from the MSA program</p>
                    <ButtonGroup>
                        <Button size='lg' colorScheme='red'>To App</Button>
                        <Button size='lg'>Github</Button>
                    </ButtonGroup>

                </div>
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
    )
}
