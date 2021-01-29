import React, {useState, useEffect}from 'react'
import {Row, Col} from 'react-bootstrap';

import ReactHtmlParser from 'react-html-parser';
import placeholder from '../Assets/placeholder.jpeg'


function ItemDetails({match}) {
    const url = "https://www.googleapis.com/books/v1/volumes";
    const [item, setItem] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchItem() {
            await fetch(
                `${url}/${match.params.id}`
            )
            .then(response => {
                if (response.status !== 200){
                    setMessage("Error while downloading details form server");
                    return ""
                } else {
                    return response.json()
                } 
            })
            .then(response => setItem(response))
        }
        fetchItem();
    }, [match.params.id]);

    if(item){
        const title = item.volumeInfo.title ? item.volumeInfo.title : "Unknown";
        const image_link = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : placeholder;
        const author = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown";
        const publisher = item.volumeInfo.publisher ? item.volumeInfo.publisher : "Unknown";

        return (
            <div>
                <Row>
                    <Col>
                        <h1>{title}</h1><br/><br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src={image_link} alt="Img from google"/><br/><br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2><b>Author(s):</b> {author}</h2><br/><br/>
                        <h2><b>Publisher</b> {publisher}</h2><br/><br/>
                    </Col>
                </Row>
                <Row>
                    <Col>{ReactHtmlParser(item.volumeInfo.description)}</Col>
                </Row>
            </div>
        )
    } else {
        return <Row>{message}</Row>
    }
}


export default ItemDetails;