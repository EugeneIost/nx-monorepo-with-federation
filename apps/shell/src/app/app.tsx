import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import { SafeRemoteApp } from '../components/SafeRemoteApp';

// const Remote1 = React.lazy(() => import('remote1/Module'));
// const Remote2 = React.lazy(() => import('remote2/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/remote1">Remote1</Link>
        </li>
        <li>
          <Link to="/remote2">Remote2</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/remote1" element={<SafeRemoteApp module='Module' remote='remote1'/>} />
        <Route path="/remote2" element={<SafeRemoteApp module='Module' remote='remote2'/>} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
