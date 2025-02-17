export function formatPeriodToString(start: any, end: any): string {
  if (!start || !end) { return '-'; }
  const starDay = String(start.day).toString().padStart(2, '0')
  const startMonth = String(start.month).toString().padStart(2, '0')
  const startYear = start.year
  const endDay = String(end.day).toString().padStart(2, '0')
  const endMonth = String(end.month).toString().padStart(2, '0')
  const endYear = end.year
  
  return `${starDay}/${startMonth}/${startYear} - ${endDay}/${endMonth}/${endYear}`
}


export function formatDate(timestamp: string): string {
  if (!timestamp) {
    return '-';
  }
  
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return '-';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}
export function formatCurrency(
  value: any,
): string {
  if (value && isNaN(value)) { return '-'; }
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

}

export function truncateNames(names: any): string {
  if (typeof names !== 'string' || names.length === 0) {
    return '';
  }
  const items = names.split(',').map(item => item.trim()).filter(item => item.length > 0);

  if (items.length > 3) {
    return items.slice(0, 3).join(', ') + '...';
  }

  return items.join(', ');
}
