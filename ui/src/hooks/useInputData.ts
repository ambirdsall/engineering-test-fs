import { useState, useCallback, ChangeEvent } from "react"

const useInputData: (a: number) => [number, (e: ChangeEvent) => void] = (
  initialData: number
) => {
  const [inputData, setInputData] = useState(initialData);
  const onInputDataChanged = useCallback(e => setInputData(+e.target.value), [
    setInputData
  ]);

  return [inputData, onInputDataChanged];
};

export default useInputData;
