import tmdbLogo from '../../assets/tmdb-logo2.svg';
import styles from './Footer.module.scss';
import { useLocation } from 'react-router-dom';

function Footer() {
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    return (
        <footer
            id='footer'
            className={`${styles.tmdb} ${isAccountPath ? styles.account : ''}`}
        >
            <div className={styles.logoWrapper}>
                <div>
                    <p>
                        This a hobby project only, and not affiliated with any streaming services.
                    </p>
                    <p>
                        This product uses the TMDB API but is not endorsed or certified by TMDB
                    </p>
                </div>
                <img src={tmdbLogo} alt="" />
            </div>

        </footer>
    );
};

export default Footer;
