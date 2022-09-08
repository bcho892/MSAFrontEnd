import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Select,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,

} from '@chakra-ui/react'
import { genres } from '../../contexts/genres'
import { Search2Icon } from '@chakra-ui/icons'
import React from 'react'
import { useNavigate, Router } from 'react-router-dom'

type Props = {
    opened: boolean;
    closeHandler: () => void;
}

type SearchOptions = {
    genre: string;
    year: string;
    limit: string;
    keyword: string;
}



function SearchBar({ opened, closeHandler }: Props) {

    const [searchOptions, setSearchOptions] = React.useState<SearchOptions>({ keyword: "", genre: "Default", year: "", limit: "25" });
    const navigate = useNavigate();

    const clearSearch = () => {
        setSearchOptions({ keyword: "", genre: "Default", year: "", limit: "25" });

    }
    const handleClose = () => {
        closeHandler();
        clearSearch();
    }

    const makeSearch = () => {
        if (searchOptions.keyword === "") return;
        let genreParam = "";
        if (searchOptions.genre !== "Default") genreParam = `${searchOptions.genre}/`;
        let yearParam = "";
        if (searchOptions.year !== "") yearParam = `${searchOptions.year}/`;
        clearSearch();
        closeHandler();
        navigate(`/search/${searchOptions.keyword}/${searchOptions.limit}/${genreParam}${yearParam}`)
    }

    const handleSearchChange = (text: string) => {
        setSearchOptions({ ...searchOptions, keyword: text });
    }
    const limitChange = (newLimit: string) => {
        setSearchOptions({ ...searchOptions, limit: newLimit });
    }

    const genreChange = (newGenre: string) => {
        setSearchOptions({ ...searchOptions, genre: newGenre });

    }
    const yearChange = (newYear: string) => {
        setSearchOptions({ ...searchOptions, year: newYear });

    }

    return (
        <>
            <Modal isOpen={opened} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Make a Search</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup size='lg'>
                            <Input
                                data-testid="searchfield"
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder='Search Movies'
                            />
                            <InputLeftElement>
                                <Search2Icon />
                            </InputLeftElement>
                        </InputGroup>
                        <Accordion
                            marginTop="1rem"

                            defaultIndex={[0]}
                            allowMultiple>
                            <AccordionItem>

                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Text>
                                            Options
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}
                                >
                                    <Box padding="0 1rem">
                                        <Text>Genre</Text>
                                        <Select
                                            onChange={(e) => genreChange(e.target.value)}
                                            placeholder='Default'
                                            variant="filled"
                                            marginBottom='1rem'>
                                            {genres.map((item, index) => {
                                                return <option key={item} value={item}>{item}</option>
                                            })}
                                        </Select>
                                        <Text>Year</Text>
                                        <NumberInput min={1850} max={2030}
                                            variant="filled"

                                            onChange={(e) => yearChange(e)}
                                            marginBottom='1rem'>
                                            <NumberInputField
                                                data-testid="yearinput" />
                                        </NumberInput>
                                        <Text># of Results</Text>
                                        <NumberInput defaultValue={25} min={1} max={50}
                                            onChange={(e) => limitChange(e)}
                                        >
                                            <NumberInputField
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="darkblue" data-testid='searchbtn' mr={3} onClick={() => makeSearch()} >
                            Search
                        </Button>
                        <Button data-testid='closebtn' variant='ghost' onClick={() => handleClose()}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SearchBar