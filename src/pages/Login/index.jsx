import FetchBaseInit from '@modules/Fetch';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export default function Login() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const stateHandler = (key, value) => {
        state[key] = value;
        setState({ ...state });
    };

    const login = async () => {
        if (state.email === '' || state.password === '') {
            toast('email and password are required', {
                type: 'error',
                position: 'bottom-center',
            });
            return;
        }
        stateHandler('loading', true);
        const id = toast.loading('Please wait...', {
            position: 'bottom-center',
        });
        const FetchBase = await FetchBaseInit;
        const getter = await FetchBase.post('/api/login', state);
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
                toast.dismiss();
                Cookies.set('gotocourseUTFToken', data.response.token);
                if (data?.response?.role == 'teacher') {
                    window.location.replace('/teacher/create-exam');
                } else {
                    navigate('/student/start-exam');
                    window.location.reload();
                }
            }
        });
    };

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="">
                <div className="flex flex-col items-start justify-start mt-4 ml-8 bg-[#e7ebfd] rounded-[10px] p-[15px] shadow-md">
                    <div className="flex flex-row items-center justify-start w-full">
                        <div className="flex flex-col items-start justify-center">
                            <div className=" text-[24px] text-center w-full font-bold mt-[10px]">Login</div>
                            <div className="mt-[30px]">
                                <input
                                    className=" border-[1px] border-white rounded-[8px] shadow-sm py-4 px-2 w-[500px] text-start"
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => stateHandler('email', e.target.value)}
                                />
                            </div>
                            <div className="mt-[30px]">
                                <input
                                    className=" border-[1px] border-white rounded-[8px] shadow-sm py-4 px-2 w-[500px] text-start"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => stateHandler('password', e.target.value)}
                                />
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    onClick={() => (state.loading ? null : login())}
                                    className={`mt-[30px] mb-[10px] flex flex-row items-center justify-center cursor-pointer ${
                                        state.loading ? 'bg-[#f2f2f2]' : 'bg-[#0C2191]'
                                    }  p-2 px-16`}
                                >
                                    <div className={`${state.loading ? '#000' : 'text-white'} `}>
                                        {state.loading ? 'Please Wait...' : 'Login'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
