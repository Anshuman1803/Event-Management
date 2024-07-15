import React from 'react'
import loaderStyle from "./lazyloader.module.css"
function LazyLoader() {
    return (
        <div className={loaderStyle.__loaderContainer}>
            <span className={loaderStyle.loader}></span>
        </div>
    )
}

export default LazyLoader