import { React } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import RedirectedPage from './pages/RedirectedPage';

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route path="/:slug" component={RedirectedPage}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
