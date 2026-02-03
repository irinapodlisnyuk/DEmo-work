import { AudioItem } from "./typesTracks";

// Единый источник для всего приложения
export const state = {
  allTracks: [] as AudioItem[]
  
};
// @ts-ignore
window.state = state; // Теперь ты сможешь писать в консоли `state`