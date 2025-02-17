export function isValidCardExpiration(expirationData: string): boolean {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expirationData)) {
    return false;
  }

  const [monthStr, yearStr] = expirationData.split("/");
  const month = parseInt(monthStr, 10);
  const year = 2000 + parseInt(yearStr, 10);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear) {
    return false;
  }
  if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
}
