import { Link } from "react-router-dom";

const Navbar = () => {
 

  return (
    <nav>
      <ul>
        <li  style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>SignUp</Link>
        </li>
      </ul>
  
    </nav>
  )
}

export default Navbar