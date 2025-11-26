import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import styles from './Layout.module.css'
const Layout = ({children}) => {
    return(
        <div className={styles.layout}>
            <Header/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;