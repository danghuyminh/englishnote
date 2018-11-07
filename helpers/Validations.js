export const required = value => value ? undefined : 'Required';
export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength128 = maxLength(128);
export const maxLength512 = maxLength(512);
export const numeric = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;