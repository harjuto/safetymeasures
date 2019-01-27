const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function parseNameFromEmailString(user) {
  let nameString = user.email.replace(/@.*/, '');
  let nameTokens = nameString.split('.');
  return nameTokens.map(capitalize).join(" ");
}