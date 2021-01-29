import React, {useCallback, useState, useEffect, useRef} from 'react';
import {CardDeck} from 'react-bootstrap';

import Item from "../Components/Item";


function Home(props) {
    const [books, setBooks] = useState([]);
    const [hasResults, setHasResults] = useState(false)
    const [loading, setLoading] = useState(true);
    const [startIndex, setStartIndex] = useState(0);

    const observer = useRef();

    const advancedQuery = props.advancedQuery;
    const query = props.query;
    const url = "https://www.googleapis.com/books/v1/volumes";

    let booksContent = null;

    useEffect(() => {
        setBooks([]);
    }, [advancedQuery, query]);

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            await fetch(
                `${url}?q=${query}${advancedQuery}&startIndex=${startIndex}&maxResults=12`
            )
            .then(response => response.json())
            .then(response => {
                setLoading(false);

                if(response.items) {
                    setHasResults(true);
                    setBooks(books => {
                        return [...books, ...response.items]
                    })
                } else {
                    setHasResults(false);
                }

            })
            .catch(setHasResults(false));
        }

        fetchBooks();
    }, [advancedQuery, query, startIndex]);

    const lastBookElementRef = useCallback(node => {
        if(loading || !hasResults) return;

        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setStartIndex( index => {
                    return index + 16
                })
            }
        })

        if(node) observer.current.observe(node);
    }, [hasResults, loading]); 

    if(books) {
        booksContent = books.map(
            (item, index) => {
                if(books.length === index + 1) {
                    return <Item innerRef={lastBookElementRef} key={index} item={item}/>
                } else {
                    return <Item key={index} item={item}/>
                }
            }
        )
    }

    return <CardDeck>{booksContent}</CardDeck>
}


export default Home;