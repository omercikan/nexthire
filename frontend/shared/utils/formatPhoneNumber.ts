export function formatTurkishPhoneNumber(phone: string): string {
  const number = phone.replace(/\D/g, "");
  if (number.length !== 11 || !number.startsWith("0")) return phone;

  return number.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "($1) $2 $3 $4");
}
