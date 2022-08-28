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
import { Search2Icon, MoonIcon, SunIcon, CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import GameModal from '../GameModal/GameModal';
type modalManagement = {
    search: boolean;
    game: boolean;
}

export default function NavBar() {
    const [modalStates, setModalStates] = React.useState<modalManagement>({ search: false, game: false });

    const handleSearch = () => {
        setModalStates({ ...modalStates, search: true });
    }
    const onSearchClosed = () => {
        setModalStates({ ...modalStates, search: false });
    }

    const handleGame = () => {
        setModalStates({ ...modalStates, game: true });
    }

    const onGameClosed = () => {
        setModalStates({ ...modalStates, game: false })
    }

    const navigate = useNavigate();
    const toWelcome = React.useCallback(() => navigate('/', { replace: true }), [navigate]);
    const { colorMode, toggleColorMode } = useColorMode();
    const navColor = useColorModeValue("white", "#171923")
    const logoColor = useColorModeValue("gray.600", "white")
    return (
        <Box className={styles.container}
            bg={navColor}
            data-testid='navbg'>
            <GameModal closeHandler={onGameClosed} opened={modalStates.game} />
            <SearchBar closeHandler={onSearchClosed} opened={modalStates.search} />
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
                <Tooltip label="Play a game">
                    <IconButton
                        onClick={() => handleGame()}
                        aria-label='game'
                        icon={<CheckIcon />}
                    />
                </Tooltip>
                <IconButton
                    onClick={toggleColorMode}
                    className={styles.button}
                    aria-label='black'
                    data-testid='colormodebtn'
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                />
            </ButtonGroup>
        </Box>
    );
}

