import React from 'react'
import { Box } from '@chakra-ui/react'
type Props = {
    skill: string;
    description: string;
    icon: any;
}

export default function TechnologyCard({ skill, description}: Props) {
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

                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='2rem'
                textTransform='uppercase'
                ml='2'
            >
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