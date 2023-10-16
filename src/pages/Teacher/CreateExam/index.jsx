import { useState } from 'react';
import Header from '@components/Header';
import ExamType from './components/ExamType';
import CreateTextInstruction from './components/CreateTextInstruction';
import CreateExam from './components/CreateExam';

export default function Teacher() {
    const [state, setState] = useState({
        examType: '',
        numberOfQuestions: '',
        durationInMinutes: '',
        enrollment: '',
        multipleAttempts: '',
        showScore: '',
        gradeAllocation: '',
        instructions: '',
    });
    const [page, setPage] = useState(1);

    const stateHandler = (key, value) => {
        state[key] = value;
        setState({ ...state });
    };

    return (
        <div className="w-full">
            <Header page={page} />
            <div className="mt-[200px]">
                {page == 1 && <ExamType setPage={setPage} stateHandler={stateHandler} />}
                {page == 2 && <CreateTextInstruction setPage={setPage} stateHandler={stateHandler} state={state} />}
                {page == 3 && <CreateExam stateHandler={stateHandler} />}
            </div>
        </div>
    );
}
