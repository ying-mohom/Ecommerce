import React from 'react';
import { Badge, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';

function Header() {
    const { state: { cart }, } = CartState();
    return (
        <>
            <Navbar bg="dark" variant='dark' style={{ height: 80 }}>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>Shopping Cart</Link>
                    </Navbar.Brand>
                    <Navbar.Text className='search'>
                        <FormControl style={{ width: 500 }} placeholder='Serach a product'
                            className='m-auto'>
                        </FormControl>
                    </Navbar.Text>
                    <Dropdown >
                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color='white' fontSize="25px" />
                            {/* <span style={{ paddingLeft: 10, paddingRight: 4 }}>{cart.length}</span> */}
                            <Badge bg="none" text="light">{cart.length}</Badge>{' '}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            <span style={{ padding: 10 }}>Cart is Empty!</span>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    )
}

export default Header