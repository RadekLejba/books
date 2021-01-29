import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import React, {useState} from 'react';

import placeholder from '../Assets/placeholder.jpeg'

function Navigation(props) {
    const truncate = (item, length) => {
        let text = "";

        try {
            text = item.join(", ");
        } catch(error) {
            text = item;
        }

        return text.length > length ? text.substring(0, length).concat("...") : text
    }

    const [display, setDisplay] = useState(false);

    const item = props.item;

    const title =  item.volumeInfo.title ? truncate(item.volumeInfo.title, 40) : "Unknown";
    const image_link = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : placeholder;
    const author = item.volumeInfo.authors ? truncate(item.volumeInfo.authors, 40) : "Unknown";
    const publisher = item.volumeInfo.publisher ? item.volumeInfo.publisher : "Unknown";

    const styleProps = useSpring({
        opacity: display ? 1 : 0,
        config: {delay:250}
    })

    return (
        <animated.div style={styleProps}>
            <Card className="my-5 p-2" ref={props.innerRef}>
                <Link to={`volume/${item.id}`}>
                    <Card.Img variant="top" src={image_link} onLoad={() => setDisplay(true)}/>
                </Link>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <small className="text-muted"><b>Author(s):</b> {author}</small> <br/>
                        <small className="text-muted"><b>Publisher:</b> {publisher}</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        </animated.div>
    )
}


export default Navigation;