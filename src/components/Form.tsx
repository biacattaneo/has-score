import React, { useState } from "react";
import type { FormData } from "../interfaces/FormData.interface";
import type { ValidationErrors } from "../interfaces/ValidationErrors.interface";

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
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Idade:</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: parseInt(e.target.value) })
          }
        />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div>
        <label>Renda Mensal:</label>
        <input
          type="number"
          value={formData.income}
          onChange={(e) =>
            setFormData({ ...formData, income: parseFloat(e.target.value) })
          }
        />
        {errors.income && <p>{errors.income}</p>}
      </div>
      <div>
        <label>Cidade:</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        {errors.city && <p>{errors.city}</p>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
