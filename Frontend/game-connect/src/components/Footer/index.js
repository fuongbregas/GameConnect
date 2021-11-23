import React from 'react';
import {useLocation} from 'react-router-dom';
import {
    FaFacebook, 
    FaInstagram, 
    FaYoutube, 
    FaTwitter, 
    FaLinkedin
} from 'react-icons/fa';
import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksContainer, 
    FooterLinksWrapper, 
    FooterLinkItems, 
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
  } from './FooterElements';

const Footer = () => {
    const location = useLocation();
    if(location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/resetpass"
        || location.pathname === "/message") return null;

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us</FooterLinkTitle>
                            <FooterLink to="/purpose">Purpose</FooterLink>
                            <FooterLink to="/developers">Developers</FooterLink>
                            <FooterLink to="/about">Description</FooterLink>
                            <FooterLink to="/privacy">Privacy Policy</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Technologies</FooterLinkTitle>
                            <FooterLink to="/react">React.js</FooterLink>
                            <FooterLink to="/node">Node.js/Express</FooterLink>
                            <FooterLink to="/mongodb">MongoDB</FooterLink>
                            <FooterLink to="/hadoop">Hadoop</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>More Information</FooterLinkTitle>
                            <FooterLink to="/contact">Contact Us</FooterLink>
                            <FooterLink to="/support">Support</FooterLink>
                            <FooterLink to="/news">News</FooterLink>
                            <FooterLink to="/faqs">FAQs</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Resources</FooterLinkTitle>
                            <FooterLink to="/igdb">IGDB</FooterLink>
                            <FooterLink to="/twitch">Twitch</FooterLink>
                            <FooterLink to="/steam">Steam</FooterLink>
                            <FooterLink to="/reddit">Reddit</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                   <SocialMediaWrap>
                        <SocialLogo to="#">
                            GameConnect    
                        </SocialLogo>
                        <WebsiteRights>GameConnect &copy; {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="//www.facebook.com" target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href="//www.instagram.com" target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink> 
                            <SocialIconLink href="//www.youtube.com" target="_blank" aria-label="Youtube">
                                <FaYoutube />
                            </SocialIconLink> 
                            <SocialIconLink href="//www.twitter.com" target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLink> 
                            <SocialIconLink href="//www.linkedin.com" target="_blank" aria-label="Linkedin">
                                <FaLinkedin />
                            </SocialIconLink>    
                        </SocialIcons>  
                    </SocialMediaWrap> 
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer