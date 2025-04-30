import React from 'react';
import '../../pages/FutureCast.css';

const UploadCSV = () => (
  <div className="upload-section">
    <h3>Upload Historical Sales CSV</h3>
    <input type="file" accept=".csv" />
  </div>
);

export default UploadCSV;