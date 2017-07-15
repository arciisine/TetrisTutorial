export function initMusic() {
  let audio = document.createElement('audio');
  audio.src = './asset/music.mp3';
  document.body.appendChild(audio);
  return audio;
}