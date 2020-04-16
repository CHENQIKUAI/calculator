import React, { Component } from 'react'
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        if (error) {
            return {
                hasError: true
            }
        } else {
            return null;
        }
    }

    render() {
        const { hasError } = this.state;
        return (
            <>
                {hasError ? "出错啦~" : this.props.children}
            </>
        )
    }
}

export default ErrorBoundary;