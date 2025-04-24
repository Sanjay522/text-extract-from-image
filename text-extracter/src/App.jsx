import { useState } from 'react';
import './App.css';
import UploadUI from './component/UploadUI';

function App() {
  const [upload, setUpload] = useState(null);

  const handleUpload = (file) => {
    setUpload(file); 
  };

  return (
    <>
      <h1 className='text-5xl'>Text Extractor</h1>
      <UploadUI onUpload={handleUpload} /> 
      {upload && <p className='mt-5'>File is ready to extract</p>}
    </>
  );
}

export default App;
