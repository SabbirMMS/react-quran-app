import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./SurahDetail.css";
import Footer from "./Footer";

function SurahDetail() {
  const { number } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/surah/${number}`)
      .then((response) => {
        setSurah(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [number]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [currentAyahIndex]);

  useEffect(() => {
    if (currentAyahIndex !== null && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentAyahIndex]);

  const handleAudioEnded = () => {
    if (
      currentAyahIndex !== null &&
      currentAyahIndex < surah.ayahs.length - 1
    ) {
      setCurrentAyahIndex(currentAyahIndex + 1);
    }
  };

  const handlePlayAyah = (index) => {
    setCurrentAyahIndex(index);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="SurahDetail">
      <Link to="/" className="home-button">
        Back to Home
      </Link>
      <h2>
        {surah.englishName} ({surah.englishNameTranslation})
      </h2>
      <p>{surah.revelationType}</p>
      {currentAyahIndex !== null && (
        <audio ref={audioRef} controls autoPlay>
          <source
            src={`${import.meta.env.VITE_API_AUDIO_URL}/${
              surah.ayahs[currentAyahIndex].number
            }`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      )}
      <ul>
        {surah.ayahs.map((ayah, index) => (
          <li
            key={ayah.numberInSurah}
            className={`ayah ${index === currentAyahIndex ? "active" : ""}`}
          >
            <span className="ayah-number">{ayah.numberInSurah}</span>
            <span className="ayah-text">{ayah.text}</span>
            {ayah.translation && (
              <span className="ayah-translation">{ayah.translation}</span>
            )}
            <button onClick={() => handlePlayAyah(index)}>Play</button>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}

export default SurahDetail;
