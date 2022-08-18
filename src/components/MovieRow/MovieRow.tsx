import React from 'react'
import { Box, Stack, Badge, Heading, useColorModeValue } from '@chakra-ui/react'
import styles from './MovieRow.module.css'
type Props = {
    genre: string
    children: any
}

export default function MovieRow({ genre, children }: Props) {
    const bgclr = useColorModeValue("gray.100", "gray.700");

    return (
        <>
            <Stack direction="row"
                margin="2rem 0">
                <Badge
                    colorScheme="blue"
                    width="4rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"></Badge>
                <Heading
                >{genre}
                </Heading>
            </Stack>
            <Box bg={bgclr}
            >
                <Box className={styles.movierow}>{children}</Box>
            </Box>
        </>
    )
}