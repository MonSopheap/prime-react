import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        console.error(error)
        console.log(info)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
}

export default ErrorBoundary;