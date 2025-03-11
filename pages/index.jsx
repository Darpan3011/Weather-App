import { useEffect } from 'react';
import App from './page';

export default function Home() {
  useEffect(() => {
    console.log(document.getElementById('root'));
  }, []);

  return <App/>;
}
