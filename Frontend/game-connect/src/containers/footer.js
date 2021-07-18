import React from 'react';
import Footer from '../components/footer';
import {InternalItems, ExternalItems} from '../components/footer/FooterItems';
import './links.css';

export function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    {InternalItems.map((item,index) => {
                        return(
                          <>
                            <Footer.Column key={index}>
                            <Footer.Title key={index}>{item.title}</Footer.Title>
                            {item.links.map((link,key) => {
                                return (
                                    <Footer.Links key={key} href={link.url}>{link.name}</Footer.Links>   
                                )
                            })}
                            </Footer.Column>
                          </>  
                        )
                    })}
                    {ExternalItems.map((item,index) => {
                        return(
                          <>
                            <Footer.Column>
                            <Footer.Title key={index}>{item.title}</Footer.Title>
                            {item.links.map((link,key) => {
                                return (
                                    <a href={link.url} key={key} target="_blank" rel="noreferrer" className="exlinks">{link.name}</a>  
                                )
                            })}
                            </Footer.Column>
                          </>  
                        )
                    })}
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