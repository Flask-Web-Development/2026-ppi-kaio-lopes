import { useEffect, useState } from "react";

export default function TankModal({
  isOpen,
  tank,
  editable,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (tank) {
      setFormData(tank);
    }
  }, [tank]);

  if (!isOpen || !tank) return null;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-200 rounded-xl p-6 border border-gray-700">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {editable ? "Edit Tank" : "Tank Details"}
          </h1>

          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-700 rounded"
          >
            X
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label>Tank Name</label>
            <input
              name="tankname"
              value={formData.tankname || ""}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              name="tankimg"
              value={formData.tankimg || ""}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>

          <div className="col-span-2">
            <label>Description</label>
            <textarea
              name="tankdescription"
              value={formData.tankdescription || ""}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-2 mt-1 rounded bg-gray-800"
              rows={4}
            />
          </div>

          <div>
            <label>Front Armor</label>
            <input
              type="number"
              name="tankfrontalarmor"
              value={formData.tankfrontalarmor || 0}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>

          <div>
            <label>Side Armor</label>
            <input
              type="number"
              name="tanksidearmor"
              value={formData.tanksidearmor || 0}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>

          <div>
            <label>Cannon</label>
            <input
              type="number"
              name="tankcannon"
              value={formData.tankcannon || 0}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>

          <div>
            <label>Engine</label>
            <input
              type="number"
              name="tankengine"
              value={formData.tankengine || 0}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>

        </div>

        {formData.tankimg && (
          <div className="flex justify-center mt-6">
            <img
              src={formData.tankimg}
              alt={formData.tankname}
              className="h-48 rounded"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Close
          </button>

          {editable && (
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-green-700 rounded"
            >
              Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
}