String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export function parseNameFromEmailString(email) {
  let nameString = email.replace(/@.*/, '');
  let nameTokens = nameString.split('.');
  return nameTokens[0].capitalize() + " " + nameTokens[1].capitalize();

}