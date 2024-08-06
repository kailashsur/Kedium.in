import { customAlphabet } from "nanoid";

function obfuscateEmail(email) {
    // Validate the input
    if (email) {
        if (typeof email !== 'string') {
            console.log("the email is not a string", email)
        }

        const email_id = email.trim();
        const domain = email_id.slice(email_id.indexOf('@'), email_id.length)
        const name = email_id.slice(0, email_id.indexOf('@'));
        const firstCharacter = name.charAt(0);
        const dots = '.'.repeat(name.length - 1);
        return firstCharacter + dots + domain
    }
}

function Appwrite_ImageID(username) {


    // Create a custom Nano ID generator with a length of 10 characters
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

    // Generate a Nano ID
    const id = nanoid();


    return username + "-" + id;
}
export { obfuscateEmail, Appwrite_ImageID }