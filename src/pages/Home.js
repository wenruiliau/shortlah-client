import { useState, React } from 'react';
import {
  Box,
  VStack,
  FormControl,
  Grid,
  Input,
  Button,
  FormLabel,
  InputGroup,
  Heading,
  Code,
  Link,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [urlToShorten, setUrlToShorten] = useState('');
  const [alias, setAlias] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || '';

  const [slug, setSlug] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUrlChange = event => {
    setUrlToShorten(event.target.value);
  };

  const handleAliasChange = event => {
    setAlias(event.target.value);
  };

  // TODO: Handle the error
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

      fetch(`${backendUrl}/api/create`, requestOptions)
        .then(res => {
          if (res.status === 409) {
            setErrorMessage('In Use');
            setSlug('');
            setIsLoading(false);
            throw new Error('HTTP status ' + res.status);
          }
          return res.json();
        })
        .then(data => {
          setErrorMessage('');
          setSlug(data.slug);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log('error', error);
      setSlug('');
      setIsLoading(false);
    }
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Box
            maxW="lg"
            minW={'40%'}
            overflow="hidden"
            borderWidth="1px"
            p={8}
            borderRadius={8}
          >
            <Box textAlign="center">
              <Heading>Short Lah</Heading>
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

                <Button width="full" mt={4} type="submit" isLoading={isLoading}>
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

          {errorMessage && (
            <Box>Oops, URL alias is in use. Please try again!</Box>
          )}
        </VStack>
      </Grid>
    </Box>
  );
}

export default Home;
