import { useState } from 'react';

export default function ExoplanetForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    distance: '',
    discoveryYear: '',
    description: '',
    imageUrl: ''
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.distance) {
      newErrors.distance = 'Distance is required';
    } else if (isNaN(formData.distance) || parseFloat(formData.distance) <= 0) {
      newErrors.distance = 'Distance must be a positive number';
    }
    
    if (!formData.discoveryYear) {
      newErrors.discoveryYear = 'Discovery year is required';
    } else if (!/^\d{4}$/.test(formData.discoveryYear) || 
              parseInt(formData.discoveryYear) < 1900 || 
              parseInt(formData.discoveryYear) > new Date().getFullYear()) {
      newErrors.discoveryYear = `Discovery year must be a valid year between 1900 and ${new Date().getFullYear()}`;
    }
    
    if (formData.imageUrl && !/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Image URL must be a valid URL starting with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Convert numeric fields
      const submitData = {
        ...formData,
        distance: parseFloat(formData.distance),
        discoveryYear: parseInt(formData.discoveryYear)
      };
      
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input ${errors.name ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
          Distance (light-years) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="distance"
          name="distance"
          step="0.01"
          min="0"
          value={formData.distance}
          onChange={handleChange}
          className={`input ${errors.distance ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
        />
        {errors.distance && <p className="mt-1 text-sm text-red-500">{errors.distance}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="discoveryYear" className="block text-sm font-medium text-gray-700 mb-1">
          Discovery Year <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="discoveryYear"
          name="discoveryYear"
          value={formData.discoveryYear}
          onChange={handleChange}
          className={`input ${errors.discoveryYear ? 'border-red-500' : ''}`}
          min="1900"
          max={new Date().getFullYear()}
          disabled={isSubmitting}
        />
        {errors.discoveryYear && <p className="mt-1 text-sm text-red-500">{errors.discoveryYear}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="input"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={`input ${errors.imageUrl ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
        />
        {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
      </div>
      
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Exoplanet'}
      </button>
    </form>
  );
}
