import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BigC from "./components/bigC/BigC";
import styles from './Root.module.scss';

import { useModal } from "./context/ModalContext";
import TextModal from "./components/modals/TextModal";
import InfoModal from "./components/modals/InfoModal";

function Root() {
    const { modal, closeModal } = useModal();

    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    const [seenBigC, setSeenBigC] = useState(() => {
        return sessionStorage.getItem('bigC') === 'seen';
    });

    useEffect(() => {
        if (seenBigC) return;

        const intro = setTimeout(() => {
            setSeenBigC(true);
            sessionStorage.setItem('bigC', 'seen');
        }, 1900);

        return () => {
            clearTimeout(intro);
        }
    }, [setSeenBigC]);

    useEffect(() => {
        if (seenBigC) {
            const spacerHeight = () => {
                const header = document.getElementById('header');
                const spacer = document.getElementById('spacer');

                if (header && spacer) {
                    spacer.style.height = `${header.offsetHeight}px`
                }
            };

            window.addEventListener('resize', spacerHeight);
            requestAnimationFrame(spacerHeight);

            return () => {
                window.removeEventListener('resize', spacerHeight);
            }
        }
    }, [seenBigC, path]);

    return (
        <>
            {
                !seenBigC
                    ? <BigC />
                    : <div className={styles.Root}>

                        {modal.type === 'text' && <TextModal modalData={modal.data} onClose={closeModal} />}
                        {modal.type === 'info' && <InfoModal modalData={modal.data} onClose={closeModal} />}

                        <Header className={`${styles.header} ${isAccountPath ? styles.accHeader : ''}`} />

                        <div id='spacer'></div>

                        <div className={`${styles.outlet} ${isAccountPath ? styles.outletAccount : ''}`}>
                            <Outlet />
                        </div>

                        <Footer />

                    </div >
            }
        </>
    )
};

export default Root;
