import React from 'react'
import { Box, Stack, Badge, Heading, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styles from './MovieRow.module.css'
type Props = {
    genre: string
    children: any
}

export default function MovieRow({ genre, children }: Props) {
    const bgclr = useColorModeValue("gray.100", "gray.700");

    return (
        <Box padding="0 2rem">
            <Stack direction="row"
                margin="2rem 0">
                <motion.div
                    initial={{ y: -35, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}>
                    <Heading
                        fontWeight="500"
                    >{genre}
                    </Heading>
                </ motion.div>
            </Stack>
            <Box
            >
                <Box className={styles.movierow}>{children}</Box>
            </Box>
        </Box >
    )
}