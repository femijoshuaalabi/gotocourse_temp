import Dropdown from '@components/Dropdown';
import TextInput from '@components/TextInput';
import { useFetch } from '@modules/Fetch';
import { toast } from 'react-toastify';
import FetchBaseInit from '@modules/Fetch';
import FormBox from './FormBox';
import { useNavigate } from 'react-router';

export default function CreateTextInstruction({ setPage, stateHandler, state }) {
    const navigate = useNavigate();
    const { loading: fetchingAllocationOptions, fetchedData: allocationOptions } = useFetch(
        '/api/dashboard/fetch-assessment-type',
    );

    const durationOption = [
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
        { value: '40', label: '40' },
    ];

    const enrollmentOptions = [
        { value: '1', label: 'Team' },
        { value: '2', label: 'Session' },
        { value: '3', label: 'Program' },
    ];

    const multipleOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
    ];

    const scoreOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
    ];

    const createInstructions = async () => {
        stateHandler('loading', true);
        const id = toast.loading('Please wait...', {
            position: 'bottom-center',
        });
        const FetchBase = await FetchBaseInit;
        const getter = await FetchBase.post('/api/dashboard/create-exam-instruction', state);
        getter.on('static', async (data) => {
            stateHandler('loading', false);
            if (data?.statusCode == 403) {
                toast.update(id, {
                    render: data?.response?.message,
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000,
                    position: 'bottom-center',
                });
            } else {
                navigate('/teacher/create-exam');
                toast.dismiss();
            }
        });
    };

    return (
        <div className="w-full h-full">
            <div className="pb-[40px] pt-[3px]">
                <FormBox title="Max number of questions(Max is 60)">
                    <TextInput onChange={(e) => stateHandler('numberOfQuestions', e.target.value)} />
                </FormBox>

                <FormBox title="Duration in minutes">
                    <Dropdown options={durationOption} onChange={(e) => stateHandler('durationInMinutes', e.value)} />
                </FormBox>

                <FormBox title="Enrolment">
                    <Dropdown options={enrollmentOptions} onChange={(e) => stateHandler('enrollment', e.value)} />
                </FormBox>

                <FormBox title="Allow multiple attempts">
                    <Dropdown options={multipleOptions} onChange={(e) => stateHandler('multipleAttempts', e.value)} />
                </FormBox>

                <FormBox title="Show score">
                    <Dropdown options={scoreOptions} onChange={(e) => stateHandler('showScore', e.value)} />
                </FormBox>

                <FormBox title="Grade allocation">
                    {fetchingAllocationOptions ? null : (
                        <Dropdown
                            options={allocationOptions}
                            onChange={(e) => stateHandler('gradeAllocation', e.value)}
                        />
                    )}
                </FormBox>

                <FormBox title="Instruction">
                    <TextInput type="textarea" onChange={(e) => stateHandler('instructions', e.target.value)} />
                </FormBox>

                <div className="flex flex-row items-center justify-start w-full mt-12 ml-8 mb-10">
                    <div className="text-black font-[400] text-[14px] w-[200px]" />
                    <div
                        className={`w-[200px] h-[50px] flex flex-col items-center justify-center ml-10 cursor-pointer ${
                            state.loading ? 'bg-[#f2f2f2]' : 'bg-[#0C2191]'
                        } `}
                        onClick={() => (state.loading ? null : createInstructions())}
                    >
                        <div className={`${state.loading ? 'text-black' : 'text-white'} text-[20px] font-[400]`}>
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
