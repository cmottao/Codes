import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Submit from "./pages/Submit";
import Problems from "./pages/Problems";
import Submissions from "./pages/Submissions";
import SubmissionDetail from "./pages/SubmissionDetail";
import Friends from "./pages/Friends";
import Problemsetter from "./pages/Problemsetter";
import Problem from "./pages/Problem";
import { AuthProvider } from "./context/AuthContext";

// Markdown rendering
import 'katex/dist/katex.min.css';
import ProtectedRoute from "./components/ProtectedRoute";
import Editorial from "./pages/Editorial";
import NotFound from "./pages/NotFound";
import CustomTest from "./pages/Customtest";
import Home from "./pages/Home";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/customtest" element={<CustomTest />} />

          <Route element={<ProtectedRoute requiredRole="contestant" />}>
            <Route path="/users/:handle" element={<Profile />} />
            <Route path="/users/:handle/submissions" element={<Submissions />} />
            <Route path="/submissions/:id" element={<SubmissionDetail />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<Problem />} />
            <Route path="/problems/:id/submit" element={<Submit />} />
            <Route path="/problems/:id/editorial" element={<Editorial/>} />

            <Route element={<ProtectedRoute requiredRole="problem_setter" />}>
              <Route path="/problemsetter/:handle" element={<Problemsetter />} />
            </Route>
            
            <Route path="/friends" element={<Friends />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
