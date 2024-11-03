



export const getUsernameByEmail = (email: string) : string => {
    
    let username = email.split("@")[0]; // 'as@gmail.com -> [as, gmail]->as


    // isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
    return username;
};

export function extractNameFromEmail(email: string) {
    // Split the email address by "@" symbol
    var parts = email.split("@");

    // If the email address doesn't contain "@" or the parts are not exactly 2
    if (parts.length !== 2) {
        return "Invalid email address";
    }

    // Get the part before "@" symbol
    var namePart = parts[0];

    // Split the name part by any digits
    var name = namePart.split(/\d+/).join("").trim();

    return name;
}
