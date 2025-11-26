import logo from '../temp/logo.png';
import headerStyles from './Header.module.css';
const Header = () => {
    return(
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.headerNav}>
                    <div className={headerStyles.logo}>
                        <img src={logo} alt='logo' />
                        <span className={headerStyles.logoText }>RentHub</span>
                        
                    </div>
                    <nav className={headerStyles.nav}>
                        <a href='/home' className={headerStyles.navLink}>Главная</a>
                        <a href='/catalog' className={headerStyles.navLink}>Каталог</a>
                        <a href='/how-it-works' className={headerStyles.navLink}>Как это работает</a>
                    </nav>
                    
                </div>
                <div className={headerStyles.btnContainer}>
                    <button className={headerStyles.rentButton}>Сдать в аренду</button>
                    <button className={headerStyles.ctaButton}>Войти</button>
                </div>
                
            </div>
        </header>
    )
}

export default Header;