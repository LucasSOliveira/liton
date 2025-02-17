export function isValidCardExpiration(expirationData: string): boolean {
  // Verifica se o formato está correto (MM/AA, onde MM varia de 01 a 12)
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expirationData)) {
    return false;
  }

  // Separa o mês e o ano
  const [monthStr, yearStr] = expirationData.split("/");
  const month = parseInt(monthStr, 10);
  // Converte ano com 2 dígitos para 4 dígitos (assumindo que está no século 21)
  const year = 2000 + parseInt(yearStr, 10);

  // Obtém a data atual
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() retorna 0 a 11
  const currentYear = now.getFullYear();

  // Valida se o cartão já expirou:
  // - Se o ano for menor que o atual, está expirado.
  if (year < currentYear) {
    return false;
  }
  // - Se for o mesmo ano mas o mês for menor que o atual, está expirado.
  if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
}
