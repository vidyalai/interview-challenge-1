// utils/formatUser.js
export function formatUserName(name) {
    if (!name) return '';
    const [firstName, lastName] = name.split(' ');
    return `${firstName.charAt(0)}. ${lastName.charAt(0)}.`;
  }
  
  export function formatUserEmail(email) {
    if (!email) return '';
    const [name, domain] = email.split('@');
    return `${name.charAt(0)}@${domain}`;
  }