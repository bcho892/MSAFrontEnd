import React from 'react'
import { Box, Stack, Badge, Heading, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styles from './MovieRow.module.css'
type Props = {
    genre: string
    children: any
}

export default function MovieRow({ genre, children }: Props) {
    const bgclr = useColorModeValue("white", "gray.700");
    const lineclr = useColorModeValue("#63B3ED", "gray.700");
    return (
        <Box padding="1rem 2rem"
            position="relative"
            _after={{
                content: "''",
                height: '80%',
                width: '80%',
                bgGradient: 'linear(to-r, #BEE3F8, #2C5282)',
                position: 'absolute',
                right: 0,
                bottom: 0,
                zIndex: -1,
                borderRadius: "sm",
            }}
            _before={{
                content: "''",
                height: '80%',
                width: '70%',
                bgGradient: 'linear(to-l, white, #EBF8FF)',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: -1,
                borderRadius: "sm",

            }}
            margin="2rem 0"
        >
            <Stack direction="row"
                margin="2rem 0">
                <motion.div
                    initial={{ y: -35, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}>

                    <Heading
                        position="relative"
                        _after={{
                            height: "3px",
                            width: "80%",
                            background: lineclr,
                            content: "''",
                            position: "absolute",
                            bottom: "-8px",
                            left: 0,
                        }}
                        fontWeight="500"
                    >{genre}
                    </Heading>
                </ motion.div>
            </Stack>
            <Box
            >
                <Box className={styles.movierow}
                >{children}</Box>
            </Box>
        </Box >
    )
}