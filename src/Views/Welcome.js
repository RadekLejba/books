import {Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useTransition, animated} from 'react-spring'
import React, {useEffect, useState} from 'react';


function Welcome() {
    const [index, setIndex] = useState(0)
    const [redirect, setRedirect] = useState(false);
    const slides = [
        ({ style }) => <animated.div className="slide" style={{ ...style, background: 'aquamarine' }}>Books</animated.div>,
        ({ style }) => <animated.div className="slide" style={{ ...style, background: 'black' }}>App</animated.div>,
        ({ style }) => <animated.div className="slide" style={{ ...style}}></animated.div>,
    ]
    setTimeout(() => {setRedirect(true)}, 3000);

    const location = {
        pathname: '/home',
        state: { from: "/" }
    }

    const transitions = useTransition(index, p => p, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 500 }
    })

    useEffect(() => void setInterval(() => setIndex(state => (state + 1) % 3), 1000), [])

     let content =
        <Row className="vh-100 align-items-center justify-content-center">
            {transitions.map(({ item, props, key }) => {
                const Page = slides[item];
                return <Page key={key} style={props} />
            })}
        </Row>

    if(redirect){
        content = <Redirect to={location}/>
    }

    return content
}


export default Welcome;