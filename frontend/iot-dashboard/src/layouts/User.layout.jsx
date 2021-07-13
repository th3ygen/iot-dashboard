import React from 'react';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <header>
                This is header
            </header>

            <main>
                {children}
            </main>
        </React.Fragment>
    )
};

export default Layout;