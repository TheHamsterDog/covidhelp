import React from 'react';

import LinkedIn from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import CopyrightIcon from '@material-ui/icons/Copyright';
import GitHubIcon from '@material-ui/icons/GitHub';
class Footer extends React.Component<any, any>{
    links = []
    render() {
        return (<div className="footer">
            <div className="footer-links">
                <a className="footer-links-each" href="https://www.linkedin.com/in/shreshth-verma-17ab39213/">
                    <LinkedIn className="footer-links-each-icon" />
                </a>
                <a className="footer-links-each" href="https://www.shreshthverma.me">
                    <LanguageIcon className="footer-links-each-icon" />
                </a>
                <a className="footer-links-each" href="https://github.com/TheHamsterDog/">
                    <GitHubIcon className="footer-links-each-icon" />
                </a>
            </div>
            <div className="footer-copyright">
                <CopyrightIcon className="footer-copyright-icon" /> <div className="footer-copyright-text">Shreshth Verma 2022</div>
            </div>
        </div>)
    }
}

export default Footer;