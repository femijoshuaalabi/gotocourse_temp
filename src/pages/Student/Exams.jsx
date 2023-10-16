import { useNavigate } from 'react-router';
import { useFetch } from '@modules/Fetch';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '@components/Header';
import { toast } from 'react-toastify';

const optionMaps = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
};

export default function ExamScreen() {
    const navigate = useNavigate();
    const { loading, fetchedData } = useFetch('/api/exam/fetch-exam');
    const [countDown, setCountDown] = useState(0);
    const [runTimer, setRunTimer] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (fetchedData) {
            if (Cookies.get('timer')) {
                setCountDown(Cookies.get('timer'));
            } else {
                const duration = 60 * parseInt(fetchedData[0].duration);
                setCountDown(duration);
            }
        }
    }, [fetchedData]);

    useEffect(() => {
        if (fetchedData) {
            let timerId;
            if (runTimer) {
                timerId = setInterval(() => {
                    setCountDown((countDown) => {
                        Cookies.set('timer', countDown - 1);
                        return countDown - 1;
                    });
                }, 1000);
            } else {
                clearInterval(timerId);
            }
            return () => clearInterval(timerId);
        }
    }, [fetchedData, runTimer]);

    useEffect(() => {
        if (countDown < 0 && runTimer) {
            console.log('expired');
            Cookies.remove('timer');
            //   TODO save to database
            setRunTimer(false);
            setCountDown(0);
        }
    }, [countDown, runTimer]);

    if (loading) {
        return <p>Please Wait...</p>;
    }

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

    const setAnswer = (question, option) => {
        answers[question] = option;
    };

    // TODO Submit functionality
    const submit = () => {
        toast('Submit Functionality not implemented', {
            type: 'error',
            position: 'bottom-center',
        });
    };

    return (
        <>
            <Header noNavigation />
            <div className="w-full mt-20">
                <div className="w-[800px] m-auto">
                    <div className="w-full sticky top-0 bg-white pt-[20px]">
                        <div className="text-black font-[400] text-[30px] mt-4">
                            Question {currentPage + 1} OF {fetchedData.length}
                        </div>
                        <div className="text-black font-[400] text-[16px]">
                            No of questions answered: <span className="font-bold">{currentPage - 1}</span>
                        </div>
                        <div className="text-black font-[400] text-[16px]">
                            No of questions Skipped: <span className="font-bold">0</span>
                        </div>
                        <div className="text-black text-[16px] font-bold mt-4 w-full items-center justify-end flex flex-row">
                            {minutes}:{seconds} minutes
                        </div>
                    </div>
                    <div>
                        {fetchedData.map((exam, index) => {
                            return (
                                <div
                                    className={`mt-4 bg-[#e7ebfd] rounded-[10px] w-full ${
                                        currentPage == index ? 'block' : 'hidden'
                                    }  p-[20px]`}
                                    key={index}
                                >
                                    <div className="text-black font-[700] text-[23px] text-start mt-[10px]">
                                        {index + 1}. {exam.question}
                                    </div>

                                    {exam.image != 'false' && <img src={exam.image} className="mt-6" />}

                                    {exam.options.map((option, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`${
                                                    answers[exam.id] == index - 1
                                                        ? 'bg-[#0C2191] text-white'
                                                        : 'bg-white text-black'
                                                } mt-12 h-[45px] rounded-[8px] pl-6 w-[530px] flex flex-row items-center justify-start cursor-pointer`}
                                                onClick={() => setAnswer(exam.id, index - 1)}
                                            >
                                                <div className="font-[400] text-[15px] text-start">
                                                    {optionMaps[index]}. {option.option}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        <div className="flex flex-row items-start justify-end w-full mt-4 rounded-[10px]">
                            {currentPage != 0 && (
                                <div
                                    className="flex flex-row items-center justify-center cursor-pointer bg-transparent border-[1px] border-[#0C2191] p-[10px] mb-[30px]"
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        setCurrentPage((page) => page - 1);
                                    }}
                                >
                                    <div className="text-[#0C2191] text-[20px] font-[400]">Previous question</div>
                                </div>
                            )}

                            {currentPage != fetchedData.length - 1 ? (
                                <div
                                    className="flex flex-row items-center justify-center cursor-pointer bg-[#0C2191] border-[1px] border-[#0C2191] p-[10px] ml-4 mb-[30px]"
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        setCurrentPage((page) => page + 1);
                                    }}
                                >
                                    <div className="text-white text-[20px] font-[400]">Next question</div>
                                </div>
                            ) : (
                                <div
                                    className="flex flex-row items-center justify-center cursor-pointer bg-[#0C2191] border-[1px] border-[#0C2191] p-[10px] ml-4 mb-[30px]"
                                    onClick={() => {
                                        submit();
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    <div className="text-white text-[20px] font-[400]">Submit</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
