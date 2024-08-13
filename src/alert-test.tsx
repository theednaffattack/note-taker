// Adapted from: https://dev.to/tripathics/creating-an-alert-system-with-context-and-hook-in-react-713

import { useContext, useState } from "react";
import { AlertsContext } from "./alerts-context";

export default function AlertTestForm() {
  const initialFormData = { severity: "info", message: "", timeout: 0 };
  const [formData, setFormData] = useState(initialFormData);
  const [alertIds, setAlertIds] = useState([]);
  const { addAlert, dismissAlert } = useContext(AlertsContext);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { severity, message, timeout } = formData;
    console.log("HANDLE SUBMIT", severity, message, timeout);
    // TODO: Add alert
    setFormData(initialFormData);
  };

  return (
    <form className="App-form" onSubmit={handleSubmit}>
      <label
        className="block text-sm font-medium text-gray-900 mt-6"
        htmlFor="severity"
      >
        Alert severity
      </label>
      <select
        className="w-full"
        onChange={handleSelectChange}
        value={formData.severity}
        required
        name="severity"
        id="severity"
      >
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
      </select>

      <label
        className="block text-sm font-medium text-gray-900 mt-6"
        htmlFor="message"
      >
        Alert message
      </label>
      <input
        onChange={handleInputChange}
        value={formData.message}
        className="w-full"
        type="text"
        name="message"
        id="message"
        required
        placeholder="Alert message"
      />

      <label
        className="block text-sm font-medium text-gray-900 mt-6"
        htmlFor="timeout"
      >
        Timeout
      </label>
      <input
        onChange={handleInputChange}
        value={formData.timeout}
        min={0}
        className="w-full"
        type="number"
        required
        name="timeout"
        id="timeout"
        placeholder="Auto dismiss (in seconds)"
      />

      <button
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Show alert
      </button>
    </form>
  );
}
