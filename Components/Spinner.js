import React from 'react'
import loading from './Spinner_image.gif';

const Spinner = () => {

    return (
        <div className="text-center">
            <img src={loading} alt="LOADING!!!" />
        </div>
    )
}

export default Spinner
