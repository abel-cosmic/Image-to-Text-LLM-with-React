import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [resultText, setResultText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const HF_ACCESS_TOKEN = import.meta.VITE_HF_ACCESS_TOKEN;
    const model = "nlpconnect/vit-gpt2-image-captioning";

    try {
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      const inference = new HfInference(HF_ACCESS_TOKEN);
      const result = await inference.imageToText({
        data: imageBlob,
        model: model,
      });

      setResultText(result.generated_text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Image to Text using Transformers</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Extract Text</button>
      </form>
      <h2>Details about the image will be displayed here</h2>
      <div className="result">
        <p className="text">{resultText}</p>
      </div>
    </div>
  );
};

export default App;
