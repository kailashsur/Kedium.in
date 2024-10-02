import { emailRegex, passwordRegex } from "../lib/regeX";





export const validate_email = (email: string): boolean => {
    return emailRegex.test(email);
}

export const validate_password = (password: string): boolean => {
    return passwordRegex.test(password);
}