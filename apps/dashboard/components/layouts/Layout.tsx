import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <Sidebar />
            <section id="content">
                <Navbar />
                {children}
            </section>
        </div>
    );
};

export default Layout;
