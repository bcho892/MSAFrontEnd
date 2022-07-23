import React from 'react'
import {
    Box,
    useColorMode
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
type Props = {
    skill: string;
    description: string;

}

export default function TechnologyCard({ skill, description }: Props) {
    const { colorMode } = useColorMode();
    return (
        <Box display='flex'
            maxWidth='20rem'
            flexDirection='column'
            alignContent='center'
            justifyContent='center'
            height='15rem'
            borderWidth='1px'
            borderRadius='lg'
            gap='1rem'
            padding="0 1rem"
            bg={colorMode === 'light' ? 'white' : 'whiteAlpha.50'}>


            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='2rem'
                textTransform='uppercase'
                ml='2'
            >
                <CheckCircleIcon />
                {skill}


            </Box>
            <Box
                color={colorMode === 'light' ? 'gray.500' : 'white'}
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='xs'
                textTransform='uppercase'
                ml='2'
            >
                {description}
            </Box>
        </Box>

    )
}