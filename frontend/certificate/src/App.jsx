import React, { useState } from 'react';
import Navbar from './component/Navbar';
import TemplateSection from './component/TemplateSection';
import DataSection from './component/DataSection';
import CertificateCanvas from './component/CertificateCanvas';

// optional custom styles

const App = () => {
  const [section, setSection] = useState('Template');
  const [recipients, setRecipients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [templateUrl, setTemplateUrl] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 text-gray-800 font-sans">
      <Navbar currentSection={section} setSection={setSection} />
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {section === 'Template' && <TemplateSection onTemplateUpload={setTemplateUrl} />}
        {section === 'Recipients' && <DataSection recipients={recipients} setRecipients={setRecipients} />}
        {section === 'Generate' && (
          <>
            {recipients.length > 0 && (
              <select
                onChange={(e) => setSelected(recipients[e.target.value])}
                className="p-3 rounded-md border shadow w-full max-w-md mb-4"
              >
                <option value="">-- Select Recipient --</option>
                {recipients.map((r, idx) => (
                  <option key={idx} value={idx}>{r.name} - {r.email}</option>
                ))}
              </select>
            )}
            {selected && templateUrl && (
              <CertificateCanvas recipient={selected} templateUrl={templateUrl} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
