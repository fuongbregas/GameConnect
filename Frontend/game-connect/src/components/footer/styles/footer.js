import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
    padding: 10px 60px;
    background: radial-gradient(circle, rgba(92,39,251,1) 0%, rgba(112,71,247,1) 100%);
    position:absolute;
    bottom: 0;
    width: 100%;

    @media (max-width: 1200px) {
        padding: 5px 30px;
        display: none;
    }
`

export const Wrapper = styled.div`
    display: grid;
    flex-direction: column;
    max-width: 1000px;
    margin: 0 auto;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 60px;
`

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(230px, 1fr));
    grid-gap: 20px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
    }
`

export const Links = styled(NavLink)`
    color: #fff;
    margin-bottom: 20px;
    font-size: 18px;
    text-decoration: none;

    &:hover {
        color: #ff9c00;
        transition: 200ms ease-in;
        cursor: pointer;
    }
`

export const Title = styled.div`
    font-size: 24px;
    color: #ffff;
    margin-bottom: 40px;
    font-weight: bold;
`