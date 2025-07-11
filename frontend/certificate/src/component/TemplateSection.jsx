import React, { useState } from 'react';
import api from '../api/api';

const TemplateSection = ({ onTemplateUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await api.post('/template/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const fullUrl = 'http://localhost:8080' + res.data;
      onTemplateUpload(fullUrl);
      alert('Upload successful!');
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }
  };

  return (
    <section className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl shadow-lg p-6 space-y-6 transition-all">
      <h2 className="text-3xl font-bold text-purple-700">📄 Upload Template</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-purple-100 file:text-purple-700
          hover:file:bg-purple-200"
      />

      {preview && (
        <div className="w-full max-w-md mx-auto">
          <img src={preview} alt="Preview" className="rounded-lg shadow-md" />
        </div>
      )}

      <div className="text-right">
        <button
          onClick={handleUpload}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-md shadow hover:shadow-lg hover:scale-105 transition-transform"
        >
          🚀 Upload Template
        </button>
      </div>
    </section>
  );
};

export default TemplateSection;
