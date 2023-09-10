'use client'
import React, { useState } from 'react'
import { getRes } from '../api/chatgpt';


const TextBox = () => {
  const [audioText, setAudioText] = useState("");
  const [hearing, setHearing] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiText, setAiText] = useState("");

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
    rec.onresult = async (e: any) => {
      setAudioText(e.results[0][0].transcript);
      rec.stop();
      setAiThinking(true)
      const data = await getRes(e.results[0][0].transcript);
      setAiThinking(false)
      setAiText(data.choices[0].message.content);
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
      {
        audioText ? (
          <p>自分:「{audioText}」</p>
        ) : (
          <p>上のボタンから会話を始めましょう！</p>
        )
      }
    {
      aiText ? (
        <p>AI:「{aiText}」</p>
      ) : aiThinking ? (
        <p>AI:「...」</p>
      ) : (
        <p>AI:「何かお手伝いできることはありますか？」</p>
      )
    }
    </div>
  )
}

export default TextBox
