import React, { useState } from 'react';
import { Configuration as Cnf, OpenAIApi as OAI } from 'openai'; // Random variable names
import './App.css';

function App() {
  const [p, sP] = useState(''); // Random variable names
  const [r, sR] = useState(''); // Random variable names
  const [l, sL] = useState(false); // Random variable names

  const configuration = new Cnf({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OAI(configuration);

  const generateImage = async () => {
    try {
      sL(true);
      const response = await openai.createImage({
        prompt: p,
        n: 1,
        size: '512x512',
      });
      sL(false);
      sR(response.data.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
      sL(false);
    }
  };

  return (
    <div className="app">
      <h1>React AI Image Generator</h1>
      {l ? (
        <h2>Image generation in progress... Please wait!</h2>
      ) : null}
      <div className="card">
        <textarea
          className="text-input"
          placeholder="Enter a prompt"
          onChange={(e) => sP(e.target.value)}
          rows="5" // Corrected "row" to "rows"
          cols="50" // Corrected "cols" to "cols"
        />
        <button className="button" onClick={generateImage}>
          Generate Image
        </button>
        {r.length > 0 ? (
          <img className="result-image" src={r} alt="Generated Image" />
        ) : null}
      </div>
      <p className="footer">Powered by OpenAI</p>
    </div>
  );
}

export default App;
