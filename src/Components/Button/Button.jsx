import React from 'react'
import "./style.css"

export default function Button(props) {
    const { children, ...restProps } = props;
    return (
        <button
            className="btn-keyboard"
            {...restProps}
        >{children}</button>
    )

}