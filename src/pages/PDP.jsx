import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import { getSingleProduct } from '../service/product';
import CircularProgress from '@mui/material/CircularProgress';


export const PDP = () => {
  const [product, setProduct] = useState({})

  const [productLoaded, setProductLoaded] = useState(false)

  const [counter, setCount] = useState(1);
  const [isDisabled, setDisable] = useState(false);
  const { state: { selectedProduct } } = useLocation();


  useEffect(() => {
    getSingleProduct({ productId: selectedProduct })
      .then(res => {
        setProduct(res.data)
        setProductLoaded(true)
      })

    return () => {
      setProduct([])
    }
  }, [selectedProduct])

  const add = () => {
    setCount(counter + 1);
  }

  const sub = () => {
    if (counter !== 1) {
      setCount(counter - 1);
    } else {
      setDisable(true);
    }
  }

  if (!productLoaded) {
    return <div className='loader'><CircularProgress /></div>
  }

  return (
    <main className='pdp_layout__main'>
      <section className='main__sectionLeft'>
        <div className='left__pdImg'>
          <img src={product.image} alt={product.title} />
        </div>
      </section>
      <section className='main__sectionRight'>
        <div>
          <div className='right__title'>
            <h2 className='title__main'>
              {product.title}
            </h2>
            <span className='right__stars'>
              <FontAwesomeIcon icon={faStar} />
              <p>{product.rating.rate} <span>|</span>{product.rating.count} reviews</p>
            </span>
          </div>
          <div className='right__description'>
            <p>
              {product.description}
            </p>
          </div>
          <div className='right__pdPrice'>
            <strong>$ {product.price}</strong>
          </div>
          <div className='right__flexCont'>
            {/* quantity stepper */}
            <div className='flexCont__quantity'>
              <div className='quantity_stepper'>
                <button disabled={isDisabled} onClick={sub} className='sub'>
                  -
                </button>
                <input value={counter} type="number" className='number' readOnly />
                <button onClick={add} className='add'>
                  +
                </button>
              </div>
            </div>
            {/* CTAs */}
            <div className='flexCont__addToCart'>
              <button className='addToCart'>
                <FontAwesomeIcon icon={faCartPlus} />  <p>Add to Cart</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}