export default function idCardCheck(idCard: string) {
  if (!Number(idCard)) return false;
  if (idCard.substring(0, 1) === "0") return false;
  if (idCard.length !== 13) return false;

  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseFloat(idCard.charAt(i)) * (13 - i);

  return (11 - (sum % 11)) % 10 === parseFloat(idCard.charAt(12));
}
