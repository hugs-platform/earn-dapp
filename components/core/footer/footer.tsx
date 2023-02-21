import React from "react";
import Nav from 'react-bootstrap/Nav';

// styles
import styles from "../footer/footer.module.css";

/**
 * @class
 * @ignore
 */
function App() {
  return (
    <>
      <section className={styles.footer}>
        <Nav className={styles.footerNavBar}>
            <Nav.Item className={styles.footerNavBarItem}>
                <Nav.Item><a>Cookies Policy</a></Nav.Item>
            </Nav.Item>
            <Nav.Item className={styles.footerNavBarItem}>
                <Nav.Item><a>Privacy Policy</a></Nav.Item>
            </Nav.Item>
            <Nav.Item className={styles.footerNavBarItem}>
                <Nav.Item><a>Disclaimer</a></Nav.Item>
            </Nav.Item>
            <Nav.Item className={styles.footerNavBarItem}>
                <Nav.Item><a>Terms of Use</a></Nav.Item>
            </Nav.Item>
        </Nav>
        <Nav className={styles.footerNavBar}>
            <Nav.Item className={styles.footerNavBarItemCreatedBy}>
                <Nav.Item>Created by:</Nav.Item>
            </Nav.Item>
            <Nav.Item className={styles.footerNavBarItemCreatedBy}>
                <Nav.Item><img src="/static/src/hugs-footer-logo.png"></img></Nav.Item>
            </Nav.Item>
        </Nav>
      </section>
    </>
  );
}

export default App;