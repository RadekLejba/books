import {Form, FormControl} from 'react-bootstrap';
import {useSpring, animated} from 'react-spring'
import React, {useState} from 'react';

import { useMeasure } from "react-use";


function AdvancedForm(props) {
    const setAdvancedQuery = props.setAdvancedQuery;
    const advancedFormVisible = props.advancedFormVisible;
    const [advancedFormData, setAdvancedFormData] = useState({inauthor:null, inpublisher: null, subject: null})
    const [ref, { height }] = useMeasure();

    let timer = null;
    const styleProps = useSpring({
        opacity: advancedFormVisible ? 1 : 0,
        height: advancedFormVisible ? height : 0,
    })

    const handleChange = (event) => {
        let queryString = ""

        setAdvancedFormData((data) => {
            data[event.target.name] = event.target.value.trim().replace(" ", "+");
            return data
        })

        for (const property in advancedFormData) {
            if(advancedFormData[property]) {
                queryString = queryString.concat(`+${property}:${advancedFormData[property]}`)
            }
        }

        if(timer) clearTimeout(timer);

        timer = setTimeout(() => setAdvancedQuery(queryString), 250);
    }

    return(
        <animated.div className="bg-dark p-4 mb-3 advanced-search" style={styleProps}>
            <div ref={ref}>
                <h4 className="text-white">Advanced search</h4>
                    <Form className="pb-4" onSubmit={e => e.preventDefault() }>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <FormControl type="text" placeholder="Author" className="mr-sm-2" name="inauthor" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Publisher</Form.Label>
                            <FormControl type="text" placeholder="Publisher" className="mr-sm-2" name="inpublisher" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <FormControl type="text" placeholder="Subject" className="mr-sm-2" name="subject" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
            </div>
        </animated.div>
    )

}

export default AdvancedForm;