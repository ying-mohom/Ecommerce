import React, { useContext, useState, useEffect } from 'react';
import { CartState } from '../context/Context';
import { SingleProduct } from './SingleProduct';
import "./style.css";
import Filters from './Filters';
import ReactPaginate from 'react-paginate';

function Home() {
    const { state: { products, loading }, productState: { sort, byStock, byFastDelivery, byRating, searchQuery } } = CartState();

    console.log("homeproducts:", products)
    console.log("isLoading", loading)


    // const [currentPage, setCurrentPage] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);
    // const itemsPerPage = 6;


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


    // useEffect(() => {
    //     setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    // }, [products, sort, byStock, byFastDelivery, byRating, searchQuery]);


    // const startIndex = currentPage * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const subset = filteredProducts.slice(startIndex, endIndex);

    // const handlePageChange = (selectedPage) => {
    //     console.log('Page changed:', selectedPage.selected);
    //     setCurrentPage(selectedPage.selected);
    // };


    return (
        <>
            <div className="home">
                <Filters />
                <div className="productContainer">
                    {loading ? (
                        <p>Loading...</p>
                    ) : filteredProducts.length === 0 ? (
                        <p className='noData'>
                            Unfortunately, no matching data is available! 😢
                        </p>
                    ) : (
                        filteredProducts.map((prod) => (
                            <SingleProduct prod={prod} key={prod.id} />
                        ))
                    )}
                </div>
            </div>
            {/* <div className="pagination-container">
                <ReactPaginate
                    pageCount={totalPages}
                    onPageChange={handlePageChange}
                    forcePage={currentPage}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'pagination-item'}
                    previousClassName={'pagination-item'}
                    nextClassName={'pagination-item'}
                    pageClassName={'pagination-item'}
                    activeClassName={'active'}
                />
            </div> */}
        </>
    );
}

export default Home