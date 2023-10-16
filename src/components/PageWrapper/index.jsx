import Sidebar from './Sidebar';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

export default function MainContainer({ children }) {
    const [page, setPage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const arraySet = location.pathname.split('/');
        setPage(arraySet[1]);
    }, [location]);
    return (
        <div className="bg-[#ffffff] flex h-[100vh] w-full">
            <Sidebar />
            <div className="flex-1 pl-[350px] w-full h-[100vh] pb-[15px]">{children}</div>
        </div>
    );
}
