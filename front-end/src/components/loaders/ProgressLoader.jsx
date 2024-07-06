import React from 'react'
import {ProgressBar} from 'react-loader-spinner'

const ProgressLoader = () => {
    return (
        <>
            <ProgressBar
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
            />
        </>
    )
}

export default ProgressLoader