export const removeNonNumeric = (value: string) => value.replace(/\D/g, '')

export const formatPhoneNumber = (input: string) => {
  let value = removeNonNumeric(input)
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  let formattedValue = "+7";
  if (value.length > 1) {
    formattedValue += ` (${value.slice(1, 4)}`;
  }
  if (value.length > 4) {
    formattedValue += `) ${value.slice(4, 7)}`;
  }
  if (value.length > 7) {
    formattedValue += `-${value.slice(7, 9)}`;
  }
  if (value.length > 9) {
    formattedValue += `-${value.slice(9, 11)}`;
  }

  return formattedValue
};

export const formatDate = (input: string): string => {
  let value = removeNonNumeric(input);
  if (value.length > 8) {
    value = value.slice(0, 8);
  }

  let formattedValue = '';
  if (value.length >= 1) {
    formattedValue += value.slice(0, 2);
  }

  if (value.length >= 3) {
    formattedValue += '.' + value.slice(2, 4);
  }

  if (value.length >= 5) {
    formattedValue += '.' + value.slice(4, 8);
  }

  return formattedValue;
};