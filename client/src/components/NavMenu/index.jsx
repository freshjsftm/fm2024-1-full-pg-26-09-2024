import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return <nav>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
    </ul>
  </nav>;
};

export default NavMenu;
