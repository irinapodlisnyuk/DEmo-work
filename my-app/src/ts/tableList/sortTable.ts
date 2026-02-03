import { AudioItem } from "./typesTracks";

export type SortOrder = 1 | -1;

export function sortTracks(
  tracks: AudioItem[], 
  field: keyof AudioItem, 
  order: SortOrder
): AudioItem[] {
  return [...tracks].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (typeof valA === "number" && typeof valB === "number") {
      return (valA - valB) * order;
    }
    return String(valA).localeCompare(String(valB)) * order;
  });
}