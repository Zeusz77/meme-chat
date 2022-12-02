import React from 'react';

export const Footer = () => {
    return (
        <div>
             <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='https://google.com'>
                    meme-chat
                </a>
            </div>
        </div>
    );
};