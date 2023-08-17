import React from 'react';
import { Badge, FormControl, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import "./style.css";

function Header() {
    const { state: { cart }, dispatch, productDispatch } = CartState();
    return (
        <>
            <Navbar bg="dark" variant='dark' style={{ height: 80 }}>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>Ying's Store</Link>
                    </Navbar.Brand>
                    <Navbar.Text className='search'>
                        <FormControl style={{ width: 500 }} placeholder='Search a product'
                            className='m-auto'
                            onChange={(e) => {
                                productDispatch({
                                    type: "FILTER_BY_SEARCH",
                                    payload: e.target.value,
                                });
                            }}>
                        </FormControl>
                    </Navbar.Text>
                    <Dropdown >
                        <Dropdown.Toggle variant="success" style={{ marginRight: 40 }}>
                            <FaShoppingCart color='white' fontSize="25px" />
                            {/* <span style={{ paddingLeft: 10, paddingRight: 4 }}>{cart.length}</span> */}
                            <Badge bg="none" text="light">{cart.length}</Badge>{' '}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }} className="custom-dropdown-menu">
                            {cart.length > 0 ? (
                                <>
                                    {
                                        cart.map((prod) => (
                                            <span className='cartitem' key={prod.id}>
                                                <img
                                                    src={prod.image}
                                                    className='cartItemImg'
                                                    alt={prod.name}
                                                />
                                                <div className='cartItemDetail'>
                                                    <span>{prod.name}</span>
                                                    <span>MMK {prod.price.split(".")[0]}</span>
                                                </div>
                                                <AiFillDelete fontSize="20px" style={{ cursor: "pointer" }}
                                                    onClick={() => dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: prod,
                                                    })
                                                    }
                                                />

                                            </span>
                                        ))
                                    }
                                    <Link to="/cart">
                                        <Button style={{ width: "95%", margin: "0 10px" }}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (<span style={{ padding: 10 }}>Cart is Empty!</span>)}

                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    )
}

export default Header