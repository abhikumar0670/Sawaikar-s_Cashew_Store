import React from 'react'
import { NavLink } from 'react-router-dom';
import FormatPrice from '../Helpers/FormatPrice';

const Product = (curElem) => {
    const {id, name, image, price, category} = curElem;
    
    // Get the first image if it's an array, otherwise use the image directly
    const displayImage = Array.isArray(image) ? image[0] : image;

  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
          <img src={displayImage} alt={name} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price"><FormatPrice price={price}/></p>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default Product
