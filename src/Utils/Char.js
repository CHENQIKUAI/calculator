const operatorChars = ['/', '+', '-', '*'];

function isOperator(char) {
    return operatorChars.some(ch => ch === char)
}

function isPoint(char) {
    return char === "."
}

function isUndefind(char) {
    return char === undefined;
}

function isZero(char) {
    return char === '0'
}

function isNoZeroNum(char) {
    const noZeroNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    return noZeroNum.some(n => n === char)
}

function getLastCharFromString(str) {
    return str[str.length - 1];
}

function replaceLastChar(str, char) {
    return str.substring(0, str.length - 1) + char;
}

function addCharToStr(str, char) {
    return str + char;
}

function getCurEditNum(str) {
    let num = '';
    for (let i = str.length - 1; i >= 0; --i) {
        const ch = str[i];
        if (Char.isOperator(ch)) {
            break;
        } else {
            num = ch + num;
        }
    }
    return num;
}

function isCurEditNumZero(str) {
    const num = getCurEditNum(str);
    if (num === '0') {
        return true;
    } else {
        return false;
    }
}

function isCurEidtNumInteger(str) {
    const num = getCurEditNum(str);

    if (num.indexOf('.') !== -1) {
        return false;
    } else {
        return true;
    }
}

function removeLastChar(str) {
    return str.substring(0, str.length - 1);
}

const Char = {
    isOperator,
    isPoint,
    isZero,
    isNoZeroNum,
    isUndefind,

    getLastCharFromString,
    isCurEditNumZero,
    replaceLastChar,
    addCharToStr,
    removeLastChar,
    isCurEidtNumInteger,
}

export default Char;