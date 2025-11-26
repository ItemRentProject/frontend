import facebook from '../temp/facebook.png'
import inst from '../temp/inst.png'
import logo from '../temp/logo.png'
import twitter from '../temp/twitter.png'
import styles from './Footer.module.css'

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.column}>
                        <div className={styles.logo}>
                            <img src={logo} alt='logo'/>
                            <h2 className={styles.logoTitle}>RentHub</h2>
                        </div>
                        <p className={styles.logoText}>Платформа для аренды вещей
                        между людьми</p>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Компания</h3>
                        <ul className={styles.linksList}>
                            <li><a href="/about" className={styles.link}>О нас</a></li>
                            <li><a href="/careers" className={styles.link}>Карьера</a></li>
                            <li><a href="/press" className={styles.link}>Пресс-центр</a></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Поддержка</h3>
                        <ul className={styles.linksList}>
                            <li><a href="/help" className={styles.link}>Помощь</a></li>
                            <li><a href="/safety" className={styles.link}>Безопасность</a></li>
                            <li><a href="/contacts" className={styles.link}>Контакты</a></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Следите за нами</h3>
                        <div className={styles.socialIcons}>
                            <img src={facebook} alt='facebook' />
                            <img src={inst} alt='inst' />
                            <img src={twitter} alt ='twitter' />
                        </div>
                    </div>
                    
                    
                    
                </div>
                    
                <div className={styles.copyright}>
                    <p>© 2024 RentHub. Все права защищены.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer