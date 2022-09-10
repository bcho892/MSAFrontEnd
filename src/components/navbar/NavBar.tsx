import * as React from 'react';
import styles from './NavBar.module.css';
import {
    IconButton,
    useColorMode,
    useColorModeValue,
    Box,
    ButtonGroup,
    Tooltip,
    Button,
    useMediaQuery
} from '@chakra-ui/react'
import { Search2Icon, MoonIcon, SunIcon, CheckIcon } from '@chakra-ui/icons';
import { ReactComponent as Logo } from './logo.svg'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import GameModal from '../GameModal/GameModal';
type modalManagement = {
    search: boolean;
    game: boolean;
}

export default function NavBar() {

    const [modalStates, setModalStates] = React.useState<modalManagement>({ search: false, game: false });
    const [smallScreen] = useMediaQuery('(max-width: 700px)')
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
            bg="rgb(33,33,33)"
            data-testid='navbg'>
            <GameModal closeHandler={onGameClosed} opened={modalStates.game} />
            <SearchBar closeHandler={onSearchClosed} opened={modalStates.search} />
            <Logo className={styles.logo} fill="white" onClick={() => toWelcome()} />
            <ButtonGroup
                marginLeft="auto"
            >
                <Tooltip label="Search Movies">
                    <Button
                        minWidth={!smallScreen ? "4.5rem" : "2rem"}
                        padding={smallScreen ? "0" : ""}
                        data-testid="search"
                        variant="navbutton"
                        onClick={() => handleSearch()}
                        justifySelf='flex-end'
                        aria-label='black'
                        fontWeight='200'
                        display='flex'
                        gap="1rem"
                        _hover={{
                            transform: "scale(1.01)"
                        }}
                        _before={!smallScreen ? {
                            position: "absolute",
                            left: "-5px",
                            content: "''",
                            height: "7rem",
                            width: "3px",
                            bg: "white",
                            transform: "rotate(15deg)"
                        } : {}
                        }
                        rightIcon={<Search2Icon />}
                    >{!smallScreen && "Search Movies"}</Button>
                </Tooltip>
                <Tooltip label="Play a game">
                    <IconButton
                        minWidth={!smallScreen ? "4.5rem" : "2rem"}
                        _before={!smallScreen ? {
                            position: "absolute",
                            left: "-5px",
                            bottom: '-2rem',
                            content: "''",
                            height: "10rem",
                            width: "3px",
                            bg: "white"
                        } : { display: "none" }}
                        data-testid="game"
                        variant="navbutton"
                        onClick={() => handleGame()}
                        aria-label='game'
                        icon={<CheckIcon />}
                    />
                </Tooltip>
                <IconButton
                    minWidth={!smallScreen ? "4.5rem" : "2rem"}

                    _before={!smallScreen ? {
                        position: "absolute",
                        left: "-5px",
                        bottom: '-2rem',
                        content: "''",
                        height: "10rem",
                        width: "3px",
                        bg: "white"
                    } : { display: "none" }}
                    data-testid="colormode"
                    variant="navbutton"
                    onClick={toggleColorMode}
                    className={styles.button}
                    aria-label='black'
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                />
            </ButtonGroup>
        </Box>
    );
}

