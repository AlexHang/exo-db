import { useState } from 'react';

export default function ExoplanetForm({ onSubmit, initialValues = {} }) {
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    distance: initialValues.distance || '',
    discoveryYear: initialValues.discoveryYear || '',
    description: initialValues.description || '',
    imageUrl: initialValues.imageUrl || ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.distance) {
      newErrors.distance = 'Distance is required';
    } else if (isNaN(formData.distance) || formData.distance <= 0) {
      newErrors.distance = 'Distance must be a positive number';
    }
    
    if (!formData.discoveryYear) {
      newErrors.discoveryYear = 'Discovery year is required';
    } else if (
      isNaN(formData.discoveryYear) || 
      !Number.isInteger(parseFloat(formData.discoveryYear)) ||
      formData.discoveryYear < 1900 || 
      formData.discoveryYear > new Date().getFullYear()
    ) {
      newErrors.discoveryYear = `Discovery year must be a valid year between 1900 and ${new Date().getFullYear()}`;
    }
    
    if (formData.imageUrl && !/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Image URL must be a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert numeric fields to proper types
      const submissionData = {
        ...formData,
        distance: parseFloat(formData.distance),
        discoveryYear: parseInt(formData.discoveryYear)
      };
      
      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="distance" className="block mb-1 text-sm font-medium text-gray-700">
          Distance from Earth (light-years) *
        </label>
        <input
          type="number"
          id="distance"
          name="distance"
          step="0.01"
          value={formData.distance}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.distance ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.distance && <p className="mt-1 text-sm text-red-500">{errors.distance}</p>}
      </div>
      
      <div>
        <label htmlFor="discoveryYear" className="block mb-1 text-sm font-medium text-gray-700">
          Discovery Year *
        </label>
        <input
          type="number"
          id="discoveryYear"
          name="discoveryYear"
          value={formData.discoveryYear}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.discoveryYear ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.discoveryYear && <p className="mt-1 text-sm text-red-500">{errors.discoveryYear}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="imageUrl" className="block mb-1 text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit Exoplanet
        </button>
      </div>
    </form>
  );
}