export const authentication = async (apiKey: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication?api_key=${apiKey}`
    );
console.log("response", response);

    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error in authentication:", error);
    throw error;
  }
};

export const logout = ()=> {
    localStorage.removeItem("api_key");
    window.location.reload();
}
