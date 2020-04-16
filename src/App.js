import React, { useState } from 'react'
import "./App.css"
import Screen from './Components/Screen/Screen'
import KeyBoard from './Components/KeyBoard/KeyBoard'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Char from "./Utils/Char"

function App() {

    const [showStr, setShowStr] = useState('');
    const [isShowingCalcResult, setIsShowingCalcResult] = useState(false);

    function handleInsert(currentInsertChar) {

        if (isShowingCalcResult) {//若当前显示的是计算结果
            constructAfterLastResult(currentInsertChar);
            setIsShowingCalcResult(false);
        } else {//若当前正在构造算式
            constructCurrentFormula(currentInsertChar);
        }

        function constructAfterLastResult(currentInsertChar) {
            const isCurrCharPoint = Char.isPoint(currentInsertChar);
            const isCurrCharZero = Char.isZero(currentInsertChar);
            const isCurrCharOperator = Char.isOperator(currentInsertChar);
            const isCurrCharNoZeroNum = Char.isNoZeroNum(currentInsertChar);

            let newShowStr = '';
            if (isCurrCharPoint) {
                newShowStr = '0.';
            } else if (isCurrCharZero) {
                newShowStr = '0';
            } else if (isCurrCharOperator) {
                newShowStr = Char.addCharToStr(showStr, currentInsertChar);
            } else if (isCurrCharNoZeroNum) {
                newShowStr = currentInsertChar;
            }
            setShowStr(newShowStr);
        }

        function constructCurrentFormula(currentInsertChar) {
            const lastChar = Char.getLastCharFromString(showStr);

            const isCurrCharPoint = Char.isPoint(currentInsertChar);
            const isCurrCharZero = Char.isZero(currentInsertChar);
            const isCurrCharOperator = Char.isOperator(currentInsertChar);
            const isCurrCharNoZeroNum = Char.isNoZeroNum(currentInsertChar);

            if (Char.isUndefind(lastChar)) { //最初状态
                let newShowStr = showStr;
                if (isCurrCharPoint || isCurrCharOperator) {
                    newShowStr = Char.addCharToStr(showStr, 0 + currentInsertChar);
                } else {
                    newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                }
                setShowStr(newShowStr);
            } else if (Char.isPoint(lastChar)) { //上一个字符是 .
                let newShowStr = showStr;
                if (isCurrCharPoint) {
                } else if (isCurrCharZero || isCurrCharOperator || isCurrCharNoZeroNum) {
                    newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                }
                setShowStr(newShowStr);
            } else if (Char.isZero(lastChar)) { // 上一个字符是 0
                let newShowStr = showStr;
                if (isCurrCharPoint) {
                    if (Char.isCurEidtNumInteger(showStr)) { // 只有在当前已经编辑的数字 是整数时， 才可以添加 ‘.’
                        newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                    }
                } else if (isCurrCharZero) {
                    if (!Char.isCurEditNumZero(showStr)) {
                        newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                    }
                } else if (isCurrCharNoZeroNum) {
                    if (!Char.isCurEditNumZero(showStr)) {
                        newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                    } else {
                        newShowStr = Char.replaceLastChar(showStr, currentInsertChar);
                    }
                } else if (isCurrCharOperator) {
                    newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                }
                setShowStr(newShowStr);
            } else if (Char.isOperator(lastChar)) { // 上一个字符是 +-*/其中一个
                let newShowStr = showStr;
                if (isCurrCharPoint) {
                    newShowStr = Char.addCharToStr(showStr, '0.');
                } else if (isCurrCharZero || isCurrCharNoZeroNum) {
                    newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                } else if (isCurrCharOperator) {
                    newShowStr = Char.replaceLastChar(showStr, currentInsertChar);
                }
                setShowStr(newShowStr);
            } else if (Char.isNoZeroNum(lastChar)) { // 上一个字符是非0数字
                let newShowStr = showStr;
                if (isCurrCharPoint) {
                    if (Char.isCurEidtNumInteger(showStr)) {
                        newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                    }
                } else if (isCurrCharZero || isCurrCharNoZeroNum || isCurrCharOperator) {
                    newShowStr = Char.addCharToStr(showStr, currentInsertChar);
                }
                setShowStr(newShowStr);
            }
        }
    }

    function handleClean() {
        setShowStr('');
    }

    function handleBack() {
        if (isShowingCalcResult) {
            setShowStr('');
            setIsShowingCalcResult(false);
        } else {
            const newShowStr = showStr.substring(0, showStr.length - 1);
            setShowStr(newShowStr);
        }
    }

    function handleEqual() {
        if (showStr) {
            const lastChar = Char.getLastCharFromString(showStr);
            let newShowStr = showStr;
            if (Char.isOperator(lastChar)) {
                newShowStr = Char.removeLastChar(showStr);
            }
            const result = String(eval(newShowStr));
            setShowStr(result);
            setIsShowingCalcResult(true);
        }
    }

    return (
        <>
            <ErrorBoundary>
                <Screen showStr={showStr} />
                <KeyBoard
                    handleInsert={handleInsert}
                    handleBack={handleBack}
                    handleClean={handleClean}
                    handleEqual={handleEqual}
                />
            </ErrorBoundary>
        </>
    )
}

export default App;