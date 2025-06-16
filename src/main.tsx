import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Testing from './components/examples/example_1.tsx';

function Main() {
  return (
    <>

      <Testing />
    </>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>

    <Main />
  </StrictMode>
);










