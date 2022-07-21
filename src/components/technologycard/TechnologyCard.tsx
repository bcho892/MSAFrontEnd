import React from 'react'
import { Box } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
type Props = {
    skill: string;
    description: string;
    icon: any;
}

export default function TechnologyCard({ skill, description }: Props) {
    return (
        <Box display='flex'
            width='20rem'
            flexDirection='column'
            alignContent='center'
            justifyContent='center'
            height='15rem'
            borderWidth='1px'
            borderRadius='lg'
            gap='1rem'>


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
                color='gray.500'
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