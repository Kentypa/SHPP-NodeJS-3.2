import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import { FormObject } from "../types/form-object";

export function useForm(
  initialState: FormObject,
  onSubmit?: (formState: FormObject) => void
) {
  const [formState, setFormState] = useState(initialState);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(formState);
    },
    [formState, onSubmit]
  );

  const handleChangeByValue = useCallback(
    (name: string, value: string | number | File) => {
      setFormState((prevState) => {
        if (prevState[name] !== value) {
          return { ...prevState, [name]: value };
        }
        return prevState;
      });
    },
    []
  );

  return { formState, handleChange, handleChangeByValue, handleSubmit };
}
