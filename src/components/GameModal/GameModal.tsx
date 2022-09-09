import {
    Modal,
    ModalOverlay,
    ModalContent,
    Input,
    ModalBody,
    ModalCloseButton,
    Box,
    Heading,
    Text,
    Button,
    Grid,
    GridItem,
    Image,
    Link
} from '@chakra-ui/react'
import { extractProbability } from '../../methods/Helper';
import styles from './GameModal.module.css'
import React from 'react'

type Props = {
    opened: boolean;
    closeHandler: () => void;
}

export default function GameModal({ opened, closeHandler }: Props) {
    const [results, setResults] = React.useState<any | undefined>(undefined);
    const [url, setUrl] = React.useState<{ searchUrl: string, successfulUrl: string }>({ searchUrl: "", successfulUrl: "" });
    const handleClose = () => {
        closeHandler();
    }
    const handleSubmit = async () => {
        try {
            if (url.searchUrl === "" || url.searchUrl === url.successfulUrl) return;
            const res = await fetch(`${process.env.REACT_APP_PREDICTION_API_URL}${url.searchUrl}`);
            const data = await res.json();
            if (data && data.success) setUrl({ ...url, successfulUrl: url.searchUrl });
            setResults(data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal isOpen={opened} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <ModalCloseButton data-testid="closebtn" />
                    <Box padding="2rem" display="flex" flexDir="column" gap="1rem">
                        <Heading>
                            Lets Play a Game!
                        </Heading>
                        <Text >
                            Paste a url to an image here, and see if the model thinks its an airplane or not!
                        </Text>
                        <Text fontSize="sm" fontStyle="italic">
                            Note: This model is trained using the data from the CIFAR-10 dataset. You can find out more <Link color="blue.400" href="https://www.cs.toronto.edu/~kriz/cifar.html" target="_blank" rel="noopener noreferrer">here.</Link>
                        </Text>
                        <Box display="flex" flexDir="column" gap="0.6rem">
                            <Input placeholder="Image URL" maxLength={200} onChange={(e) => setUrl({ ...url, searchUrl: e.target.value })} required />
                            <Button onClick={() => handleSubmit()}>Predict!</Button>
                        </Box>
                        <Box display="flex" flexDir="column" alignItems="center" gap="1rem">
                            {results && results.success ?
                                <>
                                    <Box textAlign="center">
                                        <Heading size="lg">This is likely:</Heading>
                                        <Heading size="lg" color="blue.400">{results.classname}</Heading>
                                    </Box>
                                    <Image src={url.successfulUrl} alt="your prediction image" borderRadius="md" />
                                    <Heading size="md">The distribution is:</Heading>
                                    <Grid templateColumns='repeat(2, 1fr)' gap={5}>
                                        {results.probabilities.map((item: any, index: number) => {
                                            let category = extractProbability(item);
                                            return <GridItem key={category.name} className={results.classname === category.name ? `${styles.mostprob}` : ""}>
                                                <Heading size="xs"  >
                                                    {category.name}</Heading>
                                                <Text>{category.probability}</Text>
                                            </GridItem>;

                                        })}
                                    </Grid>
                                </> : <Text color="red.200">Could not load image...</Text>}
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal >

    )
}