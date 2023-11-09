"use client";
import { useState } from "react";

type Suggestion = {
  title: string;
  bands: string[];
};

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const input = inputValue.split('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { value } = e.target;
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ query: value }),
      });
      const { results } = await response.json();
      setSuggestions(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-wrap">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleInputChange(e);
          }}
          placeholder="Type to search..."
        />
        <div className="wrap">
          <ul className="list">
            {suggestions.map((suggestion, index) => (
              <li
                className="item"
                key={index}
                onClick={() => setSelected(suggestion)}
              >
                <img
                  src={`http://unsplash.it/100?random=${index}`}
                  alt="Random Picture"
                  className="w-12 h-12 rounded-full"
                />
                
                <p> {suggestion.title}</p>
                <p> {suggestion.bands[0]}</p>
              </li>
            ))}
          </ul>
          <div className="result">
            {selected && (
              <>
                <img
                  src={`http://unsplash.it/100?random=${Math.random()}`}
                  alt="Random Picture"
                  className="w-12 h-12 rounded-full flex"
                />
                <p> {selected.title}</p>
                <div>
                  {" "}
                  {selected.bands.map((band) => (
                    <p>{band}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
