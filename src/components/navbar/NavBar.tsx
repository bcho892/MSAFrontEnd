import * as React from 'react';
import styles from './NavBar.module.css';
import {
    Heading,
    IconButton,
    useColorMode,
    useColorModeValue,
    Box,
    ButtonGroup,
    Tooltip
} from '@chakra-ui/react'
import { Search2Icon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

export interface NavBarProps {
}

export default function NavBar({ }: NavBarProps) {
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    const handleSearch = () => {
        setIsSearch(true);
    }
    const onModalClosed = () => {
        setIsSearch(false);
    }

    const navigate = useNavigate();
    const toWelcome = React.useCallback(() => navigate('/', { replace: true }), [navigate]);
    const { colorMode, toggleColorMode } = useColorMode();
    const navColor = useColorModeValue("white", "#171923")
    const logoColor = useColorModeValue("gray.600", "white")
    return (
        <Box className={styles.container}
            bg={navColor}>
            <SearchBar closeHandler={onModalClosed} opened={isSearch} />
            <Heading
                onClick={toWelcome}
                cursor='pointer'
                color={logoColor}
                fontSize='2rem'
                userSelect='none'>

                ChakMovies
            </Heading>

            <ButtonGroup
                marginLeft="auto"
            >
                <Tooltip label="Search Movies">
                    <IconButton
                        onClick={() => handleSearch()}
                        justifySelf='flex-end'
                        aria-label='black'
                        icon={<Search2Icon />}
                    />
                </Tooltip>
                <IconButton
                    onClick={toggleColorMode}
                    className={styles.button}
                    aria-label='black'
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                />
            </ButtonGroup>
        </Box>
    );
}

