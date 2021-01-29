import React, {useState} from 'react';

import {FaArrowCircleUp} from 'react-icons/fa';


function ScrollArrow(props) {
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };
  
    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
  
    window.addEventListener('scroll', checkScrollTop)

    return (
        <FaArrowCircleUp className="scrollTop my-0" onClick={scrollTop} style={{display: showScroll ? 'flex' : 'none'}}/>
    )
}


export default ScrollArrow;