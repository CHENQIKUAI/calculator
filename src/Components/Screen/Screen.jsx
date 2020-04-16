import React from 'react'
import "./style.css"

function Screen(props) {
    const showStr = props.showStr;

    return (
        <>
            <input type="text" className="screen" value={showStr} readOnly={true} />
        </>
    )
}

export default Screen;