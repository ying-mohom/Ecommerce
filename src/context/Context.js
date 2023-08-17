import { createContext, useReducer, useContext, useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from "./Reducer";





export const Cart = createContext();
faker.seed(99);

function Context({ children }) {
    const [dogImageUrls, setDogImageUrls] = useState([]);
    // const [products, setProducts] = useState([]);

    let products = [...Array(21)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: null,
        inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }));
    let updatedProducts = [];
    let photos = [];

    const ImageUrl = "https://dog.ceo/api/breed/hound/images/random/21";
    const fetchData = () => {
        fetch(ImageUrl)
            .then(response => response.json())
            .then(data => {
                photos = data.message;
                // console.log("photos", photos);
                for (let index = 0; index < 21; index++) {
                    products[index].image = photos[index];
                    console.log(index, photos[index]);
                }
                // updatedProducts = products.reduce((accumulator, product, index) => {
                //     const updatedProduct = {
                //         ...product,
                //         image: photos[index],
                //     };
                //     return [...accumulator, updatedProduct];
                // }, []);
                // console.log("updated", updatedProducts);

                // newProducts = photos.map((photo, j) => {
                //     return;
                // // })
                // console.log("products", products);
                // console.log("newProducts", newProducts);
                setDogImageUrls(data.message);

                // Call function to update products
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
        // console.log("updatedProducts0", updatedProducts);
    }, []);

    // const updateProducts = (imageUrls) => {
    //     const newProducts = imageUrls.map((imageUrl, index) => ({
    //         id: faker.string.uuid(),
    //         name: faker.commerce.productName(),
    //         price: faker.commerce.price(),
    //         image: imageUrl,
    //         inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    //         fastDelivery: faker.datatype.boolean(),
    //         ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    //     }));
    //     setProducts(newProducts);
    // };




    // console.log("products:", products)



    // dogImageUrls.map((dogImage, j) => {
    //     // console.log("faker images ", products[j].image);
    //     products[j].image = dogImage;
    // });


    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        sort: "",
        searchQuery: "",
    });


    return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    )
}

export default Context;

export const CartState = () => {
    return useContext(Cart);
}
