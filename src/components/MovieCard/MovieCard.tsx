import React from 'react'
import { Box, Image } from '@chakra-ui/react'
type Props = {
    title: string;
    imgurl: string;
    year: string;
}

function MovieCard({ imgurl }: Props) {
    return (
        <Box
        minWidth='13rem'
            objectFit='cover'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'>
            <Image
                height='20rem'
                
                objectFit='cover'
                src={imgurl}
                alt='img'></Image>
        </Box>
    )
}

export default MovieCard