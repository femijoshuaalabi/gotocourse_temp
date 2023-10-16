import Header from '@components/Header';
import { useNavigate } from 'react-router';
import CoursePlaceHolder from '@components/Assets/Images/CoursePlaceHolder.svg';
import { useFetch } from '@modules/Fetch';

export default function InitialExamScreen() {
    const navigate = useNavigate();
    const { loading, fetchedData } = useFetch('/api/exam/fetch-exam-instruction');

    if (loading) {
        return <p>Please Wait...</p>;
    }

    return (
        <>
            <Header noNavigation />
            <div className="w-full h-full flex justify-center items-center mt-20">
                <div className="flex flex-col items-center justify-center w-[800px] font-semibold h-[500px] mt-4 ml-8 bg-[#e7ebfd] rounded-[10px]">
                    <img src={CoursePlaceHolder} />

                    <div className="text-black text-[16px] mt-4 ml-8">
                        Duration: {fetchedData[0].durationInMinutes} MINUTES
                    </div>

                    <div className="text-black text-[16px] mt-2">
                        Max Attempts:{' '}
                        {fetchedData[0].multipleAttempts == 'Yes'
                            ? 'Multiple Attempts'
                            : fetchedData[0].multipleAttempts}
                    </div>

                    <div className="text-black text-[16px] mt-2">Deadline: Tuesday, June 20, 2025</div>

                    <div className="text-black text-[16px] mt-2">Time: 12:25 AM</div>

                    <div className="flex flex-row items-center justify-start mt-6">
                        <div
                            className="flex flex-row items-center justify-center cursor-pointer bg-[#0C2191] rounded-[10px] border-[1px] border-[#0C2191] p-2 px-12"
                            onClick={() => navigate('/student/exams')}
                        >
                            <div className="text-white text-[20px] font-[400]">Start exam</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
