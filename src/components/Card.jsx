import React from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export const Card = (props) => {

    // for navigating
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate("/product", { state: { selectedProduct: props.product.id } })
    }

    return (
        <>
            <li id={props.product.id} className='productCard__container' onClick={handleCardClick}>
                <div className='container__wrapper'>
                    <div className='wrapper__img'>
                        <img src={props.product.image} alt={props.product.title} />
                    </div>
                    <div className='wrapper__title'>
                        <h2 className='title__main'>
                            {props.product.title}
                        </h2>
                        <span className='titleProduct__rating'>
                            <FontAwesomeIcon icon={faStar} />
                            <p>{props.product.rating.rate}</p>
                        </span>
                    </div>
                    <div className='wrapper__desc'>
                        <p>
                            {props.product.description}
                        </p>
                    </div>
                    <div className='wrapper__price'>
                        <strong>{props.product.price}</strong>
                    </div>
                    <div className='wrapper__ctas'>
                        <button className='cta__buyNow'>
                            Buy Now
                        </button>
                    </div>
                </div>
            </li>
        </>
    )
}
