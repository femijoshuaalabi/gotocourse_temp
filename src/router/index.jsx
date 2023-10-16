import { Routes, Route } from 'react-router-dom';
import PageWrapper from '@components/PageWrapper';
import Login from '../pages/Login';
import CreateExam from '../pages/Teacher/CreateExam';
import CreateExamInstructions from '../pages/Teacher/CreateExamInstructions';
import Questions from '../pages/Teacher/Questions';
import StartExam from '../pages/Student';
import Exams from '../pages/Student/Exams';
import Cookies from 'js-cookie';

export default function PageRoutes() {
    const userToken = Cookies.get('gotocourseUTFToken');
    return (
        <>
            {userToken ? (
                <PageWrapper>
                    <Routes>
                        <Route path="/">
                            <Route path="/" element={<CreateExamInstructions />} />
                            <Route path="/teacher/create-exam-instructions" element={<CreateExamInstructions />} />
                            <Route path="/teacher/create-exam" element={<CreateExam />} />
                            <Route path="/teacher/questions" element={<Questions />} />
                            <Route path="/student/start-exam" element={<StartExam />} />
                            <Route path="/student/exams" element={<Exams />} />
                        </Route>
                    </Routes>
                </PageWrapper>
            ) : (
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<Login />} />
                    </Route>
                </Routes>
            )}
        </>
    );
}
