import { createContext, useReducer, useContext, useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from "./Reducer";



// const ImageUrl = "https://dog.ceo/api/breeds/image/random/21"

export const Cart = createContext();
faker.seed(99);

function Context({ children }) {
    const [Images, setImages] = useState([]);
    let products = [...Array(21)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: null,
        inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }));
    let photos = [];

    const apiKey = '38729788-97e0cf53ae4b8e9a1083cf93d';
    const searchQuery = 'flowers'; // Replace with the product you're searching for
    const perPage = 21;
    const minImageWidth = 3840; // Minimum width for 4K resolution
    const minImageHeight = 2160; // Minimum height for 4K resolution

    // Set the orientation based on your preference (horizontal or vertical)
    const orientation = 'horizontal'; // 'horizontal' or 'vertical'

    const imageUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
        searchQuery
    )}&per_page=${perPage}&image_type=photo&orientation=${orientation}&min_width=${minImageWidth}&min_height=${minImageHeight}`;

    const fetchData = () => {
        fetch(imageUrl)
            .then(response => response.json())
            .then(data => {
                photos = data.hits;
                for (let index = 0; index < 21; index++) {
                    products[index].image = photos[index].previewURL;
                    console.log(index, photos[index].previewURL);
                }
                setImages(data.hits);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();

    }, []);


    console.log("Products detail:", products)
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
