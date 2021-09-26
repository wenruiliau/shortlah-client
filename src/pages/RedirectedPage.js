import { useState, useEffect, React } from 'react';
import { Box, VStack, Grid, Code, Link } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function RedirectedPage(props) {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const slug = props.match.params.slug;

  const backendUrl = process.env.BACKEND_URL || '';

  useEffect(() => {
    fetch(`${backendUrl}/api/${slug}`)
      .then(res => {
        if (!res.ok) {
          setRedirectUrl('');
          setErrorMessage('Not found');
          throw new Error('HTTP status ' + res.status);
        }
        return res.json();
      })
      .then(response => {
        if (response) setRedirectUrl(response.redirectUrl);
      })
      .catch(error => {
        console.log(error);
      });
  });

  return (
    <>
      {redirectUrl && window.location.replace(`${redirectUrl}`)}
      {errorMessage && (
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Box
              textAlign="center"
              fontSize="xl"
              maxW="lg"
              overflow="hidden"
              borderWidth="1px"
              p={8}
              borderRadius={8}
            >
              Oops error encountered. Will you like to go back to{' '}
              <Code>
                <Link href={window.location.origin}>home</Link>
              </Code>{' '}
              instead?
            </Box>
          </VStack>
        </Grid>
      )}
    </>
  );
}

export default RedirectedPage;
