import React, { useState } from "react";
import "./Form.scss";
import type { ValidationErrors } from "../interfaces/ValidationErrors.interface";
import type { FormData } from "../interfaces/FormData.interface";
import CurrencyInput from "react-currency-input-field";
import { Alert, Snackbar } from "@mui/material";


const Form: React.FC<{ onSubmit: (data: FormData) => void }> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: 0,
    income: 0,
    city: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">(
    "error"
  );

  const validate = (): boolean => {
    const currentErrors: ValidationErrors = {};
    if (formData.name.length < 8)
      currentErrors.name = "Nome deve ter mais de 8 caracteres";
    if (formData.age < 18 || formData.age > 65)
      currentErrors.age = "Idade deve estar entre 18 e 65 anos";
    if (formData.income <= 0)
      currentErrors.income = "Renda mensal deve ser maior que 0";
    if (!formData.city) currentErrors.city = "Cidade não pode ser vazia";

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      setSnackbarMessage(Object.values(currentErrors).join(" | "));
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setSnackbarMessage("Formulário enviado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nome Completo:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Idade:</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="form-field">
          <label>Renda Mensal:</label>
          <CurrencyInput
            placeholder="3000,00"
            prefix="R$"
            defaultValue={1000}
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            onValueChange={(value) =>
              setFormData({ ...formData, income: parseFloat(value || "0") })
            }
          />
        </div>
        <div className="form-field">
          <label>Cidade:</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div className="form-btn-send">
          <button type="submit">Enviar</button>
        </div>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
