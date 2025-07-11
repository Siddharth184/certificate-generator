import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

const DataSection = ({ recipients, setRecipients }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    date: '',
    score: '',
  });

  const fetchRecipients = async () => {
    try {
      const res = await api.get('/recipients');
      setRecipients(res.data);
    } catch (err) {
      console.error('Failed to fetch recipients:', err);
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    if (!formData.name || !formData.email) {
      return alert('Name and Email are required');
    }
    await api.post('/recipients', formData);
    setFormData({ name: '', email: '', course: '', date: '', score: '' });
    fetchRecipients();
  };

  const handleDeleteAll = async () => {
    await api.delete('/recipients/deleteAll');
    setRecipients([]);
  };

  return (
    <section className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl shadow-lg p-6 space-y-6 transition-all">
      <h2 className="text-3xl font-bold text-rose-700">👥 Manage Recipients</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['name', 'email', 'course', 'date', 'score'].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="p-3 rounded-md border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none bg-white shadow-sm"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow inline-flex items-center gap-2"
        >
          <FaPlusCircle /> Add Recipient
        </button>

        <button
          onClick={handleDeleteAll}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow inline-flex items-center gap-2"
        >
          <FaTrashAlt /> Delete All
        </button>
      </div>

      <ul className="mt-4 space-y-2 text-gray-800">
        {recipients.length === 0 && (
          <p className="text-gray-500">No recipients added yet.</p>
        )}
        {recipients.map((r, i) => (
          <li
            key={i}
            className="bg-white/70 p-3 rounded-md shadow-sm border border-gray-200"
          >
            <strong>{r.name}</strong> — {r.email} | {r.course} | {r.date} | Score: {r.score}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DataSection;
