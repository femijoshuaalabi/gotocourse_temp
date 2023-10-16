import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Headline() {
    const [page, setPage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const arraySet = location.pathname.split('/');
        setPage(arraySet[2]);
    }, [location]);

    const navigate = useNavigate();

    return (
        <div className="flex flex-row items-center justify-start w-full mt-6 ml-8">
            <div
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => navigate('/teacher/create-exam')}
            >
                <div
                    className={
                        page === 'create-exam'
                            ? 'text-[#0C2191] text-[20px] font-[600]'
                            : 'text-black text-[20px] font-[600]'
                    }
                >
                    Create Exam/ assessment
                </div>
                {page === 'create-exam' ? <div className="bg-[#0C2191] w-full h-[5px] mt-1" /> : <div />}
            </div>

            <div
                className="flex flex-col items-center justify-center ml-16 cursor-pointer"
                onClick={() => navigate('/teacher/questions')}
            >
                <div
                    className={
                        page === 'questions'
                            ? 'text-[#0C2191] text-[20px] font-[600]'
                            : 'text-black text-[20px] font-[600]'
                    }
                >
                    View created Exam/assessment
                </div>
                {page === 'questions' && <div className="bg-[#0C2191] w-full h-[5px] mt-1" />}
            </div>
        </div>
    );
}
