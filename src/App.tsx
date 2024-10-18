import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Form from "./components/Form";
import { mockLoanAPI } from "./services/validationCredit.service";
import ResultPage from "./components/ResultPage";
import { LoanResult } from "./interfaces/LoanResult.interface";
import { useRecoilState } from "recoil";
import { formState } from "./state/formState";



const App: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useRecoilState<LoanResult>(formState);

  useEffect(() => {
    const data = localStorage.getItem("loanResult");
    

    if (data) {
      const obj: LoanResult = JSON.parse(data);
      const date = new Date(obj.date);
      const currentDate = new Date();
      const diffInMilliseconds = Math.abs(
        currentDate.getTime() - date.getTime()
      );
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

      if (diffInMinutes < 15) {
        navigate("/result");
      }
    }
  }, []);

  const handleSubmit = async (data: {
    name: string;
    age: number;
    income: number;
    city: string;
  }) => {
    const response = await mockLoanAPI(data.income);
    localStorage.setItem("loanResult", JSON.stringify(response));
    setFormData(response);
    navigate("/result");
  };

  return (
    <div className="app-container">
      <h1>Empréstimo</h1>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/result" element={<ResultPage />} />
  </Routes>
);

export default AppWrapper;
