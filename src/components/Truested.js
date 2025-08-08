import React from 'react'
import styled from "styled-components";
const Truested = () => {
  return (
    <Wrapper className="brand-section">
    <div className="container">
      <h3>Trusted By 1000+ Companies</h3>
      <div className="brand-section-slider">
        {/* my 1st img  */}
      

<div className="slide">
  <img
    src="https://raw.githubusercontent.com/abhikumar0670/trusted-brand-logos/main/t1.png"
    alt="FSSAI Certified"
  />
</div>
<div className="slide">
  <img
    src="https://raw.githubusercontent.com/abhikumar0670/trusted-brand-logos/main/t2.png"
    alt="USDA Organic"
  />
</div>
<div className="slide">
  <img
    src="https://raw.githubusercontent.com/abhikumar0670/trusted-brand-logos/main/t3.png"
    alt="ISO Certified"
  />
</div>
<div className="slide">
  <img
    src="https://raw.githubusercontent.com/abhikumar0670/trusted-brand-logos/main/t4.png"
    alt="GMP Certified"
  />
</div>
<div className="slide">
  <img
    src="https://raw.githubusercontent.com/abhikumar0670/trusted-brand-logos/main/t5.png"
    alt="Nutco Premium Nuts"
  />
</div>



      </div>
    </div>
  </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};
  .brand-section {
    padding: 12rem 0 0 0;
  }
  h3 {
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    font-weight: bold;
  }
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .brand-section-slider {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .brand-section-slider {
      margin-top: 3.2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* background-color: red; */
      text-align: center;
    }
  }
`;
export default Truested
