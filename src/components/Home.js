import React, { useContext } from 'react';
import { CartState } from '../context/Context';
import { SingleProduct } from './SingleProduct';
import "./style.css";
import Filters from './Filters';

function Home() {
    const { state } = CartState();
    console.log(state);
    const { products, cart } = state;
    return (
        <div className="home">
            <Filters />
            <div className="productContainer">
                {products.map((prod) => (
                    <SingleProduct prod={prod} key={prod.id} />
                    // <span>{prod.name}</span>
                ))}
            </div>
        </div>
    );
}

export default Home