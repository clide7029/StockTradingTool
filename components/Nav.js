import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import { useSession, signOut } from 'next-auth/client';


const Nav = () => {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/stonks'>Stonks</Link>
        </li>
      
        <li>
          <Link href='/about'>About</Link>
        </li>
        
        {!session && !loading && (
            <li>
              <Link href='/login'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
            
          )}
       
          



      </ul>
    </nav>
  )
}

export default Nav
