import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GotoLogo from '@components/Assets/Logo/CourseLogo.svg';
import Play from '@components/Assets/Images/CourseCBT.svg';
import Plus from '@components/Assets/Images/CoursePlus.svg';
import CourseQ from '@components/Assets/Images/CourseQ.svg';
import CourseMenu from '@components/Assets/Images/CourseMenu.svg';
import Cookies from 'js-cookie';

const Wrapper = styled.div`
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export default function Sidebar() {
    const location = useLocation();
    const naviagate = useNavigate();
    const [page, setPage] = useState('dashboard');

    useEffect(() => {
        const arraySet = location.pathname.split('/');
        setPage(arraySet[1]);
    }, [location]);

    const logout = () => {
        Cookies.remove('gotocourseUTFToken');
        naviagate('/');
        window.location.reload();
    };

    return (
        <div className="shadow-md fixed w-[350px] bg-[#0f2491] h-[100%]">
            <div className="border-b-2 border-[#0f2491] h-[70px] pt-[10px]">
                <div className="ml-[30px]">
                    <img src={GotoLogo} className="mt-8" />
                </div>
            </div>
            <Wrapper
                className="flex-1 pt-[15px]"
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    height: 'calc(100vh - 70px)',
                }}
            >
                <div className="flex flex-col items-center justify-between h-full p-4 w-full">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div
                            className="bg-[#004cb7] rounded-[8px]  mt-4 w-full cursor-pointer"
                            onClick={() => logout()}
                        >
                            <div className="text-white text-center font-[400] text-[14px] p-2">Logout</div>
                        </div>
                        <div className="bg-[#004cb7] rounded-[8px]  mt-4 w-full cursor-pointer">
                            <div className="text-white text-center font-[400] text-[14px] p-2">
                                Get help from G- mind AI
                            </div>
                        </div>
                        <div className="rounded-[8px] w-full mt-8">
                            <div className="text-white text-start font-[400] text-[20px]">Course content</div>
                        </div>

                        <div
                            className="bg-[#004cb7] rounded-[8px] w-full mt-4 h-[63px] flex flex-row items-center justify-between pl-4 pr-4 cursor-pointer"
                            onClick={() => naviagate('/initial')}
                        >
                            <img src={Play} />
                            <div className="text-white text-center font-[400] text-[20px]">EXCEL BASICS</div>
                            <img src={CourseMenu} />
                        </div>
                        {page !== 'initial' &&
                            (page !== 'exam' ? (
                                <div className="bg-[#004cb7] rounded-[8px] w-full mt-12 h-[63px] flex flex-row items-center justify-start pl-4 pr-4 cursor-pointer">
                                    <img src={CourseQ} />
                                    <div className="text-white text-center font-[400] text-[20px] ml-14">EXCEL CBT</div>
                                </div>
                            ) : (
                                <div />
                            ))}
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        {page !== 'initial' &&
                            (page !== 'exam' ? (
                                <div className="bg-white rounded-[8px] w-full mt-20 h-[63px] flex flex-row items-center justify-between pl-4 pr-4 cursor-pointer">
                                    <img src={Plus} />
                                    <div className="text-[#004cb7] text-center font-[700] text-[20px]">New content</div>
                                    <img src={CourseMenu} />
                                </div>
                            ) : (
                                <div />
                            ))}
                        <div className="bg-[#004cb7] rounded-[8px] w-full mt-8 h-[63px] flex flex-row items-center justify-start pl-4 pr-4 cursor-pointer">
                            <img src={CourseQ} />
                            <div className="text-white text-center font-[400] text-[20px] ml-14">CBT</div>
                        </div>
                        <div className="bg-[#ee5b4c] rounded-[8px] w-full mt-12 h-[63px] flex flex-row items-center justify-center pl-4 pr-4 cursor-pointer mb-[40px]">
                            <div className="text-white text-center font-[700] text-[20px]">
                                {page === 'initial' || page === 'exam' ? 'Back to Console' : 'Go back to dashboard'}
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
