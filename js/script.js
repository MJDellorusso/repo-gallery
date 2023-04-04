// Div that holds profile info
const overview = document.querySelector(".overview");
const username = "mjdellorusso";

const getProfile = async function () {
  const profileFetch = await fetch(`https://api.github.com/users/${username}`);
  const profileInfo = await profileFetch.json();
  console.log(profileInfo);
};
getProfile();

const displayProfile = function (profileInfo) {
  const profileDiv = document.createElement(".user-info");
};
