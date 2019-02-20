import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {

    return(
        <div id="err">
            <h1>Error loading data from server</h1>
            <Link to="/"><h5>Please try again</h5></Link>
        </div>
    )
}

export default Page404;