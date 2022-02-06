import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>$tonk$</span> Tool
      </h1>
      <p className={headerStyles.description}>
        find the infinite money glitch
      </p>
    </div>
  )
}

export default Header
