import React from 'react'
import "./style.css"
import Button from "../Button/Button"

function KeyBoard(props) {
    const handleInsert = props.handleInsert;
    const handleBack = props.handleBack;
    const handleClean = props.handleClean;
    const handleEqual = props.handleEqual;

    function handleClickInsert(e) {
        const value = e.target.innerText;
        handleInsert(value);
    }

    function handleClickBack() {
        handleBack();
    }

    function handleClickClean() {
        handleClean();
    }

    function handleClickEqual() {
        handleEqual();
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td><Button onClick={handleClickClean}>C</Button></td>
                    <td><Button onClick={handleClickBack}>{'<'}</Button></td>
                    <td><Button onClick={handleClickInsert}>/</Button></td>
                    <td><Button onClick={handleClickInsert}>*</Button></td>
                </tr>
                <tr>
                    <td><Button onClick={handleClickInsert}>7</Button></td>
                    <td><Button onClick={handleClickInsert}>8</Button></td>
                    <td><Button onClick={handleClickInsert}>9</Button></td>
                    <td><Button onClick={handleClickInsert}>-</Button></td>
                </tr>
                <tr>
                    <td><Button onClick={handleClickInsert}>4</Button></td>
                    <td><Button onClick={handleClickInsert}>5</Button></td>
                    <td><Button onClick={handleClickInsert}>6</Button></td>
                    <td><Button onClick={handleClickInsert}>+</Button></td>
                </tr>
                <tr>
                    <td><Button onClick={handleClickInsert}>1</Button></td>
                    <td><Button onClick={handleClickInsert}>2</Button></td>
                    <td><Button onClick={handleClickInsert}>3</Button></td>
                    <td rowSpan="2"><Button style={{ height: 109 }} onClick={handleClickEqual}>=</Button></td>
                </tr>
                <tr>
                    <td colSpan="2"><Button style={{ width: 107 }} onClick={handleClickInsert}>0</Button></td>
                    <td><Button onClick={handleClickInsert}>.</Button></td>
                </tr>
            </tbody>
        </table>
    )
}

export default KeyBoard;