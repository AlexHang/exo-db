"use client";
import NavBar from "../lib/components/navBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../services/api";

export default function NewEntry() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        distance: '',
        discoveryYear: '',
        description: '',
        imageUrl: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await apiService.createPlanet(formData);

            if (response.ok) {
                router.push('/');
            } else {
                throw new Error('Failed to create planet');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create planet');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (<>
        <NavBar />
        <div className="min-h-screen bg-gray-900 text-white p-8">

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Add New Planet</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-white" />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-white">Distance (light years)</label>
                                    <input
                                        type="number"
                                        name="distance"
                                        value={formData.distance}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-white" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white">Discovery Year</label>
                                    <input
                                        type="number"
                                        name="discoveryYear"
                                        value={formData.discoveryYear}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-white shadow-sm " />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white">Image URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-white shadow-sm " />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="mt-1 block w-full rounded-md border-white shadow-sm " />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Planet'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div></>
    );
}
