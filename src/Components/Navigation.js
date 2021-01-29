import {FaSearchPlus} from 'react-icons/fa'
import {Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import {IoIosBook} from 'react-icons/io';
import {Link, useLocation} from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import React, {useEffect, useState} from 'react';

import AdvancedForm from "./AdvancedForm"

function Navigation(props) {
    const [advancedFormVisible, setAdvancedFormVisible] = useState(false);
    const location = useLocation();
    const [loadNavAnimation, setLoadNavAnimation] = useState(false);

    const fromWelcome = location.state ? location.state.from === "/" : null;
    let timer = null;

    const styleProps = useSpring({
        opacity: loadNavAnimation ? 1 : 0,
    })

    useEffect(() => {
        if(fromWelcome) setLoadNavAnimation(true);
    }, [fromWelcome]);

    const handleChange = (event) => {
        if(timer) clearTimeout(timer);

        const edited_value = event.target.value ? event.target.value.replace(" ", "+") : "react";

        timer = setTimeout(() => props.setQuery(edited_value), 250);
    }

    let content = 
        <div className="p-0 my-0">
            <Navbar bg="dark" variant="dark">
                <Link to={"/home"}>
                    <Navbar.Brand><IoIosBook/></Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    <Form inline onSubmit={e => e.preventDefault() }>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleChange}/>
                    </Form>
                </Nav>
                <Nav>
                    <Nav.Item onClick={() => setAdvancedFormVisible(!advancedFormVisible)}>
                        <FaSearchPlus className="searchPlus"/>
                    </Nav.Item>
                </Nav>
            </Navbar>
            <AdvancedForm advancedFormVisible={advancedFormVisible} setAdvancedQuery={props.setAdvancedQuery}/>
        </div>

    if(location.pathname === "/"){
        content = null;
    }

    return (
        <animated.div style={fromWelcome ? styleProps : {}}>
            {content}
        </animated.div>
    )
}


export default Navigation;