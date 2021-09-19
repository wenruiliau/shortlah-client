import { useState, useEffect, React } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  FormControl,
  Grid,
  Input,
  Button,
  FormLabel,
  InputGroup,
  Heading,
  theme,
  Code,
  Link,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [urlToShorten, setUrlToShorten] = useState('');
  const [alias, setAlias] = useState('');

  const [slug, setSlug] = useState('');

  useEffect(() => {
    // fetch('/base')
    //   .then(res => res.json())
    //   .then(response => {
    //     setMessage(response.message);
    //   })
    //   .catch(error => console.log(error));
  });

  const handleUrlChange = event => {
    setUrlToShorten(event.target.value);
  };

  const handleAliasChange = event => {
    setAlias(event.target.value);
  };

  // TODO: Abstract API call to parent container
  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              url: urlToShorten,
              alias: alias,
            },
          ],
        }),
      };

      fetch('/create', requestOptions)
        .then(res => res.json())
        .then(data => setSlug(data.slug))
        .catch(error => console.log(error));

      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Box
              maxW="lg"
              overflow="hidden"
              borderWidth="1px"
              p={8}
              borderRadius={8}
            >
              <Box textAlign="center">
                <Heading>Shorten It</Heading>
              </Box>

              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl id="url" mt={6} isRequired>
                    <FormLabel>URL to shorten</FormLabel>
                    <InputGroup size="md">
                      <Input placeholder="URL" onChange={handleUrlChange} />
                    </InputGroup>
                  </FormControl>

                  <FormControl id="alias" mt={6}>
                    <FormLabel>Alias for URL</FormLabel>
                    <InputGroup size="md">
                      <Input
                        placeholder="Optional"
                        onChange={handleAliasChange}
                      />
                    </InputGroup>
                  </FormControl>

                  {/* TODO: set isLoading state */}
                  <Button
                    width="full"
                    mt={4}
                    type="submit"
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
            {slug && (
              <Box>
                Shortened URL is{' '}
                <Code>
                  <Link href={window.location.href + slug} isExternal>
                    {window.location.href}
                    {slug}
                  </Link>
                </Code>
                .
              </Box>
            )}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
