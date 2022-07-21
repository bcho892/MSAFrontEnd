import * as React from 'react';
import styles from './NavBar.module.css';
import { Heading, IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons';
export interface NavBarProps {
}

export default function NavBar({ }: NavBarProps) {

    return (
        <div className={styles.container}>
            <Heading
                color='#E53E3E'
                fontSize='2rem'>
                Random
            </Heading>

            <IconButton
                className={styles.button}
                aria-label='black'
                icon={<SettingsIcon />}
            />

        </div>
    );
}

