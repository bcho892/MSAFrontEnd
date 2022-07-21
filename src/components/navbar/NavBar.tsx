import * as React from 'react';
import styles from './NavBar.module.css';
import { Heading, IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'

export interface NavBarProps {
}

export default function NavBar({ }: NavBarProps) {
    const navigate = useNavigate();
    const toWelcome = React.useCallback(() => navigate('/', { replace: true }), [navigate]);
    return (
        <div className={styles.container}>
            <Heading
                onClick={toWelcome}
                cursor='pointer'
                color='#2B6CB0'
                fontSize='2rem'
                userSelect='none'>

                ChakMovies
            </Heading>

            <IconButton
                className={styles.button}
                aria-label='black'
                icon={<SettingsIcon />}
            />

        </div>
    );
}

