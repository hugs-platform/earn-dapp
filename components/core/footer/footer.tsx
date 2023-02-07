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
                <Nav.Item>Cookies Policy</Nav.Item>
            </Nav.Item>
            <Nav.Item className={styles.footerNavBarItem}>
                <Nav.Item>Privacy Policy</Nav.Item>
            </Nav.Item>
            <Nav.Item className={styles.footerNavBarItem}>
                <Nav.Item>Disclaimer</Nav.Item>
            </Nav.Item>
            <Nav.Item className={styles.footerNavBarItem}>
                <Nav.Item>Terms of Use</Nav.Item>
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