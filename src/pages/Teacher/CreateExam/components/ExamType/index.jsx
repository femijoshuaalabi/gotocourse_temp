import Dropdown from '@components/Dropdown';
import { useFetch } from '@modules/Fetch';

export default function ExamType({ setPage, stateHandler }) {
    const { loading, fetchedData } = useFetch('/api/dashboard/fetch-assessment-type');

    if (loading) {
        return <p>Please Wait...</p>;
    }

    return (
        <div className="flex flex-row items-center justify-start w-full mt-12 ml-8">
            <div className="">
                <Dropdown
                    options={fetchedData}
                    placeholder="Select exam/ assessment"
                    onChange={(e) => stateHandler('examType', e.value)}
                />
            </div>
            <div
                className="flex flex-col items-center justify-center ml-10 cursor-pointer bg-[#0C2191] p-2 pl-4 pr-4"
                onClick={() => setPage(2)}
            >
                <div className="text-white text-[20px] font-[400]">Continue</div>
            </div>
        </div>
    );
}
