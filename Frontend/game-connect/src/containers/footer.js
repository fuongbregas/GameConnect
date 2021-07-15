import React from 'react';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

export function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                <Footer.Column>
                    <Footer.Title>Links</Footer.Title>
                    <Footer.Link href="#">Team Members</Footer.Link>
                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                    <Footer.Link href="#">Terms of Use</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>Related Sites</Footer.Title>
                    <Footer.Link href="#">IGDB</Footer.Link>
                    <Footer.Link href="#">Twitch</Footer.Link>
                    <Footer.Link href="#">Steam</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>GameConnect</Footer.Title>
                    <Footer.Link href="#">Community</Footer.Link>
                    <Footer.Link href="#">About Us</Footer.Link>
                    <Footer.Link href="#">Support</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>Social</Footer.Title>
                    <Footer.Link href="#">Facebook</Footer.Link>
                    <Footer.Link href="#">Instagram</Footer.Link>
                    <Footer.Link href="#">Youtube</Footer.Link>
                </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
            <h5 style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: 0 }}>
                @2021 GameConnect, All Rights Reserved
            </h5>
        </Footer>
    )
}