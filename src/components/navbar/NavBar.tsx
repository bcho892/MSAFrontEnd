import * as React from 'react';
import styles from './NavBar.module.css';
import { Heading, IconButton, useColorMode, useColorModeValue, Box } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'

export interface NavBarProps {
}

export default function NavBar({ }: NavBarProps) {
    const navigate = useNavigate();
    const toWelcome = React.useCallback(() => navigate('/', { replace: true }), [navigate]);
    const { colorMode, toggleColorMode } = useColorMode();
    const navColor = useColorModeValue("white", "#171923")
    const logoColor = useColorModeValue("#2B6CB0", "white")
    return (
        <Box className={styles.container}
            backgroundColor={navColor}>
            <Heading
                onClick={toWelcome}
                cursor='pointer'
                color={logoColor}
                fontSize='2rem'
                userSelect='none'>

                ChakMovies
            </Heading>

            <IconButton
                onClick={toggleColorMode}
                className={styles.button}
                aria-label='black'
                icon={<SettingsIcon />}
            />

        </Box>
    );
}

