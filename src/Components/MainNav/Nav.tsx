import { Link } from 'react-router-dom';
import './nav.scss';

export const Nav: React.FC = () => (
  <nav className='nav'>
    <Link to="/">
      Home
    </Link>
    <Link to="todos">
      Todos
    </Link>
    <Link to="photos">
      Photos
    </Link>
  </nav>
);