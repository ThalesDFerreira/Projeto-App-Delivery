const EMAIL_REGEX = /^[a-zA-z0-9._]+@[a-zA-z0-9._]+\.[a-zA-z0-9._ ]+(\.[a-zA-z0-9._ ]+)?$/;
const PASSWORD_REGEX = /.{6,}/;
const NAME_REGEX = /.{12,}/;

export const emailValidate = (emailInput) => (EMAIL_REGEX.test(emailInput));
export const passwordValidate = (passwordInput) => PASSWORD_REGEX.test(passwordInput);
export const nameValidate = (nameInput) => NAME_REGEX.test(nameInput);
