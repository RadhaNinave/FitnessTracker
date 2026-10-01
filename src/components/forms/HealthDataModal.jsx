import { useEffect, useState } from "react";
import { validateHealthForm } from "../../utils/validation";

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  calorieIntake: "",
  calorieBurned: "",
  description: "",
};

function HealthDataModal({ isOpen, onClose, onSubmit, editingRecord }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (editingRecord) {
      setForm({
        date: editingRecord.date,
        calorieIntake: String(editingRecord.calorieIntake),
        calorieBurned: String(editingRecord.calorieBurned),
        description: editingRecord.description || "",
      });
    } else {
      setForm({
        ...emptyForm,
        date: new Date().toISOString().slice(0, 10),
      });
    }

    setErrors({});
  }, [isOpen, editingRecord]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateHealthForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...form,
      calorieIntake: Number(form.calorieIntake),
      calorieBurned: Number(form.calorieBurned),
    });
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="health-modal"
        role="dialog"
        aria-modal="true"
      >
        <h2>
          {editingRecord
            ? "Let's see what you want to change!"
            : "From Much Nutrition of your data Today"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Date */}
          <label>
            Date

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />

            {errors.date && (
              <span>{errors.date}</span>
            )}
          </label>


          {/* Calorie Intake */}
          <label>
            Calorie Intake

            <input
              type="number"
              name="calorieIntake"
              value={form.calorieIntake}
              placeholder="Enter Today's Calorie Intake"
              onChange={handleChange}
            />

            {errors.calorieIntake && (
              <span>{errors.calorieIntake}</span>
            )}
          </label>


          {/* Calorie Burned */}
          <label>
            Calorie Burned

            <input
              type="number"
              name="calorieBurned"
              value={form.calorieBurned}
              placeholder="Enter Today's Calorie Burned"
              onChange={handleChange}
            />

            {errors.calorieBurned && (
              <span>{errors.calorieBurned}</span>
            )}
          </label>


          {/* Description */}
          <label>
            Description

            <input
              type="text"
              name="description"
              value={form.description}
              placeholder="Enter a short description"
              onChange={handleChange}
            />

            {errors.description && (
              <span>{errors.description}</span>
            )}
          </label>


          {/* Buttons */}
          <div className="modal-actions">

            <button
              type="submit"
              className="submit-button"
            >
              Submit
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default HealthDataModal;