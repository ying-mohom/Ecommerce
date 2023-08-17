import React, { useContext } from 'react';
import { CartState } from '../context/Context';
import { SingleProduct } from './SingleProduct';
import "./style.css";
import Filters from './Filters';

function Home() {
    const { state: { products }, productState: { sort, byStock, byFastDelivery, byRating, searchQuery } } = CartState();

    console.log("homeproducts:", products)

    const transformProducts = () => {
        let sortedProducts = products;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }

        if (!byStock) {
            sortedProducts = sortedProducts.filter((prod) => prod.inStock);
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter(
                (prod) => prod.ratings >= byRating  //checks if the ratings property of each product is greater than or equal to the provided byRating value.
            );
        }

        if (searchQuery) { //no empty string or undefined
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            sortedProducts = sortedProducts.filter((prod) =>
                prod.name.toLowerCase().includes(lowerCaseSearchQuery)
            );
        }
        return sortedProducts;
    };



    const filteredProducts = transformProducts();


    return (
        <div className="home">
            <Filters />
            <div className="productContainer">

                {filteredProducts.length === 0 ? (
                    <p className='noData'>Unfortunately, no matching data is available! &#128577; </p>
                ) : (
                    filteredProducts.map((prod) => (
                        <SingleProduct prod={prod} key={prod.id} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home