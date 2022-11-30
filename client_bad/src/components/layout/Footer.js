import React, { Component } from "react";

class footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-1">
                <div className="container">
                    Copyrigth &copy; {new Date().getFullYear()} MemeChat
                </div>
            </footer>
        );
    }
};

export default footer;