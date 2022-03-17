import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false, redirect: false };
  }

  //eslint-disable-next-line
  static getDerivedStateFromError(error) {
    console.log("Derived state from error: ", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("CDC: ", error, info);
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  render() {
    const { hasError, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    } else if (hasError) {
      return (
        <h2>
          Something went Wrong....! <Link to="/">Click here</Link> to go back or
          please wait for 5 seconds{" "}
        </h2>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
