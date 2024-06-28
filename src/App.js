import { BrowserRouter } from 'react-router-dom';
import { isTouchDevice } from './helpers/Utils';
import ReactGA from 'react-ga4';
import { PixelProvider } from './layouts/PixelProvider';
import AppRouter from "./routes/AppRouter";

const GA_CODE = process.env.REACT_APP_GA_CODE;

ReactGA.initialize(GA_CODE);
window.onerror = function (msg, url, line, col, error) {
  ReactGA.exception({
    description: `message: ${msg}, url: ${url}, line: ${line}, column: ${col}`,
    fatal: true,
  });
};
function App() {
  if (isTouchDevice()) {
    document.body.classList.add('touch');
  } else {
    document.body.classList.add('web');
  }

  return (
    <BrowserRouter>
      <PixelProvider>
        <AppRouter />
      </PixelProvider>
    </BrowserRouter>
  );
}

export default App;
