import styles from './TechnologyCard.module.css'
import {
    Box,
    useColorMode
} from '@chakra-ui/react'
import { CheckCircleIcon, QuestionIcon } from '@chakra-ui/icons'

type Props = {
    skill: string;
    description: string;
    unsure: boolean;
}

export default function TechnologyCard({ skill, description, unsure }: Props) {
    const { colorMode } = useColorMode();
    return (
        <Box display='flex'
            flexDirection='column'
            alignContent='center'
            justifyContent='center'
            minH='20rem'
            borderWidth='1px'
            borderRadius='1px'
            gap='1rem'
            padding="0 1rem"
            bg={colorMode === 'light' ? 'white' : 'whiteAlpha.50'}
            className={styles.container}>
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
                {unsure ? <QuestionIcon /> : <CheckCircleIcon />}
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