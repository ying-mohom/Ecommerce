import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import { Rating } from "./Rating";


export const SingleProduct = ({ prod }) => {
    // const {
    //     state: { cart },
    //     dispatch,
    // } = CartState();
    const { state, dispatch } = CartState();
    const { products, cart } = state
    // console.log("state:", state);
    // console.log("dispatch", dispatch);
    // console.log(cart)
    // console.log(product)
    console.log("prod:", prod)
    return (
        <div className="products">
            <Card>
                <Card.Img variant="top" src={prod.image} alt={prod.name} style={{ height: 230 }} />
                <Card.Body>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span> {prod.price.split(".")[0]} MMK</span>
                        {prod.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 days delivery</div>
                        )}
                        <Rating rating={prod.ratings} />
                    </Card.Subtitle>
                    {/* 
                    <Button variant="danger">Remove from cart</Button>
                    <Button disabled={!prod.inStock}>
                        {!prod.inStock ? "Out of Stock" : "Add to Cart"}

                    </Button> */}

                    {cart.some((p) => p.id === prod.id) ? (
                        <Button
                            variant="danger"
                            onClick={() =>
                                dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: prod,
                                })
                            }
                        >
                            Remove from Cart
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: prod,
                                })
                            }
                            disabled={!prod.inStock}
                        >
                            {!prod.inStock ? "Out of Stock" : "Add to Cart"}
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

