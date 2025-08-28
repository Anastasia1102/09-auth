import Link from "next/link";
import css from "./Footer.module.css"


const Footer = () => {
    return (<footer className={css.footer}>
        <div>
            <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
            <div className={css.wrap}>
                <p>Developer: Anastasia Vereshchaka</p>
                <p>
                    Contact us:{" "}
                    <Link className={ css.footerLink} href="mailto:student@notehub.app">student@notehub.app</Link>
                </p>
            </div>
        </div>
    </footer>);
};
export default Footer;

