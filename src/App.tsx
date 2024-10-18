import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Form from "./components/Form";
import { mockLoanAPI } from "./services/validationCredit.service";
import ResultPage from "./components/ResultPage";

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    name: string;
    age: number;
    income: number;
    city: string;
  }) => {
    const response = await mockLoanAPI(data.income);
    localStorage.setItem("loanResult", JSON.stringify(response));
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
