import React from 'react'
import {
    Box,
    Heading,
    Text,
    useColorModeValue,
    Badge
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@chakra-ui/icons'
type Props = {
    title: string;
    year: string;
    rating: string;
    id: string;
}
function SearchResult({ title, year, rating, id }: Props) {
    const bgColor = useColorModeValue('gray.200', 'RGBA(255, 255, 255, 0.24)')
    const navigate = useNavigate();
    const toMovie = React.useCallback(() => navigate(`/movie/${id}`, { replace: false }), [navigate]);
    return (

        <Box
            _hover={{ backgroundColor: '#2B6CB0', color: 'white', cursor: 'pointer' }}
            bg={bgColor}
            borderRadius="lg"
            padding='1rem 2rem'
            margin='0.5rem 1rem'
            display='flex'
            alignItems='center'
            onClick={toMovie}>
            <Box >
                <Badge variant="outline"
                    display="flex"
                    justifyContent="center"
                    minWidth="4rem"
                    borderRadius="lg">
                    <Heading>
                        {rating}
                    </Heading>
                </Badge>
            </Box>
            <Box marginLeft='1rem'>
                <Text>
                    {year}
                </Text>
                <Heading size="md"
                >
                    {title}
                </Heading>
            </Box>
            <ArrowRightIcon w={5} h={5}
                marginLeft="auto" />
        </Box>
    )
}

export default SearchResult