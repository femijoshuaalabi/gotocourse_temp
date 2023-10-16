import { useNavigate } from 'react-router';
import FormField from './FormField';
import { useRef, useState } from 'react';
import FetchBaseInit from '@modules/Fetch';
import { toast } from 'react-toastify';

export default function CreateExam() {
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const [state, setState] = useState({
        uploadingImage: false,
        image: false,
        question: '',
        options: [],
        correctOption: null,
    });

    const stateHandler = (key, value) => {
        state[key] = value;
        setState({ ...state });
    };

    const [optionComponents, setOptionComponents] = useState([FormField, FormField, FormField, FormField]);

    const addToOption = () => {
        optionComponents.push(FormField);
        setOptionComponents([...optionComponents]);
    };

    const handleAnswersState = (value, index) => {
        state.options[index] = {
            option: value,
            correct: false,
        };
        setState({ ...state });
    };

    const selectCorrectOption = (index) => {
        // state.options.map((option) => (option.correct = false));
        if (state.options[index]) {
            // state.options[index].correct = true;
            state.correctOption = index;
        } else {
            toast('Type something inside the form input before selecting', {
                type: 'error',
                position: 'bottom-center',
            });
        }
        setState({ ...state });
    };

    const onFileChange = async (event) => {
        stateHandler('uploadingImage', true);
        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append('file', event.target.files[0]);

        const FetchBase = await FetchBaseInit;
        const getter = await FetchBase.post('/api/dashboard/upload-image', formData, true);

        getter.on('static', async (data) => {
            stateHandler('uploadingImage', false);
            if (data.statusCode == 200) {
                stateHandler('image', data.response.data.url);
            } else {
                toast(data.response.message, {
                    type: 'error',
                });
            }
        });
    };

    const createExam = async (save) => {
        stateHandler('loading', true);
        const id = toast.loading('Please wait...', {
            position: 'bottom-center',
        });
        const FetchBase = await FetchBaseInit;
        const getter = await FetchBase.post('/api/dashboard/create-exam', state);
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
                toast.update(id, {
                    render: save ? 'Question Created.' : 'Question Created. Please Wait...',
                    type: 'success',
                    isLoading: false,
                    autoClose: 5000,
                    position: 'bottom-center',
                });
                if (save) {
                    navigate('/teacher/questions');
                } else {
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }
            }
        });
    };

    return (
        <div className="w-full h-full mt-[20px]">
            <div className="w-[800px]">
                <div className="flex flex-col items-start justify-start mt-4 ml-8 bg-[#e7ebfd] rounded-[10px] pt-[20px] pb-[20px] shadow-md">
                    <div className="flex flex-row items-center justify-start w-full ml-10">
                        <div className="flex flex-col items-start justify-center">
                            <div className=" text-[16px]">Write your question.</div>
                            <div className="mt-2">
                                <input
                                    className=" border-[1px] border-white rounded-[8px] shadow-sm py-4 px-2 w-[500px] text-start"
                                    type="text"
                                    onChange={(e) => stateHandler('question', e.target.value)}
                                />
                            </div>
                        </div>
                        {state.image ? (
                            <img src={state.image} className="h-[70px] w-[70px] ml-[10px] mt-[20px]" />
                        ) : (
                            <div className="flex flex-col items-center justify-center ml-10 mt-8 cursor-pointer bg-transparent border-[1px] border-[#0C2191] p-2 pl-4 pr-4 shadow-sm">
                                <input ref={fileInputRef} className="hidden" type="file" onChange={onFileChange} />
                                {state.uploadingImage ? (
                                    <div>Uploading...</div>
                                ) : (
                                    <div
                                        className="text-[#0C2191] text-[20px] font-[400]"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        Add Image
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-flow-row-dense grid-cols-2">
                        {optionComponents.map((OptionComponent, index) => {
                            return (
                                <OptionComponent
                                    key={index}
                                    index={index}
                                    onChange={handleAnswersState}
                                    selectCorrectOption={selectCorrectOption}
                                    correctOption={state.correctOption}
                                />
                            );
                        })}
                    </div>
                    <div className="ml-20 mt-10">
                        <div
                            className="flex flex-row items-center justify-center cursor-pointer bg-transparent border-[1px] border-[#0C2191] p-2 px-28 rounded-md shadow-sm"
                            onClick={() => addToOption()}
                        >
                            <div className="text-[#0C2191] text-[20px] font-[400]">+ Add</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-start justify-end mt-6 ml-8 rounded-[10px]">
                    <div
                        onClick={() => (state.loading ? null : createExam('save'))}
                        className="flex flex-row items-center justify-center cursor-pointer bg-transparent border-[1px] border-[#0C2191] p-2 px-16 mb-[40px]"
                    >
                        <div className="text-[#0C2191] text-[20px] font-[400]">
                            {state.loading ? 'Please wait' : 'Save'}
                        </div>
                    </div>
                    <div
                        onClick={() => (state.loading ? null : createExam())}
                        className="flex flex-row items-center justify-center cursor-pointer bg-[#0C2191] border-[1px] border-[#0C2191] p-2 px-[18px] ml-4 shadow-md mb-[40px]"
                    >
                        <div className="text-white text-[20px] font-[400]">
                            {state.loading ? 'Please Wait' : 'Add new question'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
