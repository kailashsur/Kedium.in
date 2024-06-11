

function obfuscateEmail(email) {
    // Validate the input
   if(email){
    if (typeof email !== 'string') {
        console.log("the email is not a string", email)
    }
  
    const email_id = email.trim();
    const domain = email_id.slice(email_id.indexOf('@'), email_id.length)
    const name = email_id.slice(0, email_id.indexOf('@'));
    const firstCharacter = name.charAt(0);
    const dots = '.'.repeat(name.length -1);
    return firstCharacter+dots+domain
   }
  }

  export {obfuscateEmail}