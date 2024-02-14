



import React, { useState, useEffect, useRef } from 'react';

export default function Dictionary() {

  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [font, setFont] = useState("monospace");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClicked, setIsClicked] = useState(2)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filteredMeanings, setFilteredMeanings] = useState([]);
  const errorDivRef = useRef(null);


  
  useEffect(() => {
    if (isSubmitted) {
      const getData = async () => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const [data] = await response.json();
  
        setWord(data.word);
        setPhonetic(data.phonetics[0].text);
        setMeanings(data.meanings);
        setSynonyms(data.synonyms);
      };
  
      getData();
    }
  }, [word, isSubmitted]);

  function handleInputChange(event) {
    setWord(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  function handleClick(i) {
    setIsClicked(i);
    setIsDarkMode(!isDarkMode);
  }

  function handleChange(event) {
    setFont(event.target.value);
  };
  
  return (
    <div style={{ fontFamily: font,
      margin: '0 auto',
      maxWidth: '1440px' }} className={isDarkMode ? 'dark-mode' : 'light-mode'} >
      
      <header>
        <ul className='header'>

          <img className='book' src="./book.svg" alt="" />

          <select onChange={handleChange}>
            <option value="monospace">Mono</option>
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans Serif</option>
          </select>

          <p></p>

          <img
            className={`thumbnail ${isClicked === 1 ? 'hidden' : ''}`}
            src="./group.svg"
            alt=""
            onClick={() => handleClick(1)}
          />
          <img
            className={`thumbnail ${isClicked === 2 ? 'hidden' : ''}`}
            src="./group2.svg"
            alt=""
            onClick={() => handleClick(2)}
          />

        </ul>
      </header>
      
      <form onSubmit={handleSubmit}>
        <nav className={`nav ${isSubmitted && !word.trim() ? 'errorInput' : ''}`}>  
          <input
            type="text"
            name="word"
            placeholder='Search for any word…'
            value={word}
            onChange={handleInputChange}
          />
          <button type="submit"><img src="./search.svg" alt="" /> </button>
        </nav>
          {isSubmitted && !word.trim() && (
            <p className='active' ref={errorDivRef}>Whoops, can’t be empty…</p>
          )}
      </form>
      
      {isSubmitted && word.trim() !== "" && (
      <main>
        <article>
          <div>
            <h2>{word}</h2>
            <p>{phonetic}</p>      
          </div>
          <img src="./play.svg" alt="" /> 
          
        </article>
        
        <figure>
          <p id="noun" >noun</p>
          <h6 >Meaning</h6>
          <ul>
            {meanings.filter((meaning) => meaning.partOfSpeech === "noun").map((meaning) => (
            <li key={meaning.id}>
              <p>{meaning.definitions[0].definition}</p>
            </li>))}
          </ul>
          
          <div className='mean'>
            <h6>Synonyms</h6>
            <ul>
              {synonyms && synonyms.map((synonym) => (
              <li key={synonym.id}>
                <h5>{synonym.text}</h5>
              </li>))}
            </ul>
          </div>
          
          <p id="noun" >verb</p>
          <h6 >Meaning</h6>
          <ul>
            {meanings.filter((meaning) => meaning.partOfSpeech === "verb").map((meaning) => (
            <li key={meaning.id}>
              <p>{meaning.definitions[0].definition}</p>
            </li>))}
          </ul>

          <p id="title"></p>
        </figure>

      </main>
      )}
      
      {isSubmitted && word.trim() !== "" && (
      
        <footer>
          <h6 >Source</h6>
          <div className='info'>
            
            <a href={`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`}>
              <p>https://api.dictionaryapi.dev/api/v2/entries/en/{word}</p>
              <img src="./link.svg" alt="" />
            </a>
                
          </div>
        </footer>
      )}

    </div>
  );
}
 
 