export function toCurrency(value) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0,
    })
    .format(value)
    .split('\u00A0')
    .slice(0, -1)
    .join(' ') + ' ₸';
}

export function parseCurrency(value) {
    return Number(value.replace(/\D+/g, ''));
}