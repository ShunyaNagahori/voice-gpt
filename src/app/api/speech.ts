export const speech = (text: string) => {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.rate = 1; // 速度 min 0 ~ max 10
  uttr.pitch = 1; // 音程 min 0 ~ max 2
  uttr.lang  = 'ja-JP';

  speechSynthesis.speak(uttr);
}
