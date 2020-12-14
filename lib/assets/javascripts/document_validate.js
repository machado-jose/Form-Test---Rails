function documentValidate(document) {
  var documentNumberSum;
  var rest;
  documentNumberSum = 0;
  if (document == "00000000000") return false;

  for (i=1; i<=9; i++) documentNumberSum = documentNumberSum + parseInt(document.substring(i-1, i)) * (11 - i);
  rest = (documentNumberSum * 10) % 11;

  if ((rest == 10) || (rest == 11))  rest = 0;
  if (rest != parseInt(document.substring(9, 10)) ) return false;

  documentNumberSum = 0;
  for (i = 1; i <= 10; i++) documentNumberSum = documentNumberSum + parseInt(document.substring(i-1, i)) * (12 - i);
  rest = (documentNumberSum * 10) % 11;

  if ((rest == 10) || (rest == 11))  rest = 0;
  if (rest != parseInt(document.substring(10, 11) ) ) return false;
  return true;
}