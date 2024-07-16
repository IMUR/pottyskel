export const getPotties = async (): Promise<
  Array<{
    pottyName: string;
    pottyAddress: string;
    pottyRule: string;
    pottyNotes: string;
    pottyType: string;
    latitude: number;
    longitude: number;
  }>
> => {
  const response = await fetch("/api/potties");
  const data = await response.json();
  return data;
};

export const addPotty = async (potty: {
  pottyName: string;
  pottyAddress: string;
  pottyRule: string;
  pottyNotes: string;
  pottyType: string;
  latitude: number;
  longitude: number;
}): Promise<void> => {
  await fetch("/api/potties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(potty),
  });
};
