export const validateRollNumber = (roll: any) => {
  roll = roll.toUpperCase();

  let year = roll.substring(0, 2).trim();
  let allowedYears = [];
  let currentYear = new Date().getFullYear();
  for (let i = 0; i < 8; i++)
    allowedYears.push(String(currentYear - i).slice(-2));
  //Invalid Year
  if (!allowedYears.includes(year)) {
    console.log("Invalid year");
    return false;
  }
  let collegeCode = roll.substring(2, 4);
  if (collegeCode !== "P6") {
    return false;
  }
  //branch and course checking happens in the backend anyways.
  return true;
};