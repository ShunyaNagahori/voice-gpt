'use client'
import React, { useState } from 'react'


const TextBox = () => {
  const [audioText, setAudioText] = useState("");
  const [hearing, setHearing] = useState(false);

  const recOn = () => {
    const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;

    rec.start();
    rec.onstart = () => { setHearing(true) }
    // rec.onaudiostart = () => { console.log('on audio start') }
    // rec.onspeechstart = () => { console.log('on speech start') }
    // rec.onspeechend = () => { console.log('on speech end') }
    // rec.onaudioend = () => { console.log('on audio end') }
    rec.onresult = (e: any) => {
      setAudioText(e.results[0][0].transcript);
      rec.stop();
    }
    rec.onend = () => { setHearing(false) }
  }

  return (
    <div>
      {
        hearing ? (
          <p>聞き取り中</p>
        ) : (
          <button onClick={recOn}>start</button>
        )
      }
      <p>{audioText}</p>
    </div>
  )
}

export default TextBox
