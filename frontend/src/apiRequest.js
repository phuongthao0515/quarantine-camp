const apiRequest = async (url = "", optionsObj = null) => {
  let errMsg = null; // Initialize here
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Cannot add patient! Please try again");
  } catch (err) {
    errMsg = err.message;
  }
  return errMsg;
};
