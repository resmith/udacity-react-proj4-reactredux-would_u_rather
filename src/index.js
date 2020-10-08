import React from "react";
import { render } from "react-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, amber, red } from  'material-ui/styles/colors'
import CssBaseline from '@material-ui/core/CssBaseline';

import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";


// A custom theme for this app
const theme = createMuiTheme({
    primary: grey,
    accent: amber,
    error: red,
    type: 'dark'
})


const store = createStore(reducer, middleware);

const Index = ({ children }) => (
  <Provider store={store}>
     <CssBaseline />
    <ThemeProvider theme={theme}> 
      <App />
    </ThemeProvider>
  </Provider>
);

render(<Index />, document.getElementById("root"));
