import React from 'react'
import { NavLink } from 'react-router-dom';
import {Button} from '../styles/Button'
import styled from 'styled-components';
const HeroSection = ({myData}) => {
    // console.log(myData)
    const {name}=myData;
  return (
    <Wrapper>
     <div className='container'>
        <div className="grid grid-two-column">
            <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
                <h1>{name}</h1>
                <p>Experience the finest selection of premium cashews from Goa's heritage farms. 
                From traditional roasted varieties to exotic flavored cashews, we bring you the authentic taste of quality nuts with every bite.</p>
             <NavLink to="/products">
                <Button>Shop Now</Button>
             </NavLink>
            </div>
            <div className="hero-section-image">
         <figure>
            <img src="images/hero.jpg" alt="Premium cashews display" className="img-style"/>
         </figure>
            </div>
        </div>
     </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.bg} 0%, #f8f4e6 100%);
  
  .container {
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .grid {
    display: grid;
    gap: 4rem;
    align-items: center;
  }
  
  .grid-two-column {
    grid-template-columns: 1fr 1fr;
  }
  
  .hero-section-data {
    h1 {
      font-size: 4.5rem;
      font-weight: 700;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.heading};
      margin-bottom: 1.5rem;
      text-transform: capitalize;
    }
    
    .intro-data {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.helper};
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
    }
    
    p {
      font-size: 1.6rem;
      line-height: 1.7;
      color: ${({ theme }) => theme.colors.text};
      margin: 2rem 0 3rem 0;
    }
  }
  
  .hero-section-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  figure {
    position: relative;
    max-width: 45rem;
    
    &::before {
      content: "";
      position: absolute;
      top: -2rem;
      right: -2rem;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.colors.gradient};
      border-radius: 1rem;
      z-index: -1;
    }
  }
  
  .img-style {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  }
  
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .grid-two-column {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-section-data {
      h1 {
        font-size: 3.5rem;
      }
    }
  }
  
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 4rem 0;
    
    .hero-section-data {
      h1 {
        font-size: 2.8rem;
      }
      
      .intro-data {
        font-size: 1.4rem;
      }
      
      p {
        font-size: 1.4rem;
      }
    }
    
    figure {
      max-width: 35rem;
      
      &::before {
        top: -1rem;
        right: -1rem;
      }
    }
  }
`;
export default HeroSection
