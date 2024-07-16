export const getPotties = async () => {
  const response = await fetch("/api/potties");
  const data = await response.json();
  return data;
};

export const addPotty = async (potty) => {
  await fetch("/api/potties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(potty),
  });
};
