import Header from '@components/Header';
import { useFetch } from '@modules/Fetch';

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

export default function ListQuestionScreen() {
    const { loading, fetchedData } = useFetch('/api/dashboard/fetch-questions');

    if (loading) {
        return <p>Please Wait...</p>;
    }

    return (
        <>
            <Header />
            <div className="mt-[200px]">
                <div className="text-black font-[400] text-[22px] mt-4 ml-8">
                    Number of questions : {fetchedData.length}
                </div>
                <div className="flex flex-col items-start justify-start w-[800px] mt-4 ml-8 bg-[#e7ebfd] rounded-[10px] mb-[40px]">
                    {fetchedData.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="text-black font-[700] text-[23px] text-start ml-10 mt-10">
                                    {index + 1}. {item.question}
                                </div>
                                {item.image != 'false' && <img src={item.image} className="ml-10 mt-6 w-[80%]" />}

                                {item.options.map((option, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="mt-12 ml-10 border-[1px] bg-white h-[45px] border-white rounded-[8px] pl-6 w-[530px] flex flex-row items-center justify-start"
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
                </div>
            </div>
        </>
    );
}
