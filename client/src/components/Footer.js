import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-light text-center p-3 mt-auto">
            &copy; {new Date().getFullYear()} Copyright:{' '}
            <a className="text-dark" href="https://google.com">
             meme-chat
            </a>
        </footer>
    );
};