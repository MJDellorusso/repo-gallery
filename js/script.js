// Div that holds profile info
const overview = document.querySelector(".overview");
// Github user name
const username = "mjdellorusso";

// Async function to fetch profile info from github api
const getProfile = async function () {
  const profileFetch = await fetch(`https://api.github.com/users/${username}`);
  const profileInfo = await profileFetch.json();
  console.log(profileInfo);
  //   A call to the function that will display the profile info in a new div
  displayProfile(profileInfo);
};
// The call to fetch the user info
getProfile();
// The function to create a new div and populate it with the profile info
const displayProfile = function (profileInfo) {
  const profileDiv = document.createElement("div");
  //   Adds the class that styles the new div w/ the profile info
  profileDiv.classList.add("user-info");
  profileDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${profileInfo.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${profileInfo.name}</p>
    <p><strong>Bio:</strong> ${profileInfo.bio}</p>
    <p><strong>Location:</strong> ${profileInfo.location}</p>
    <p><strong>Number of public repos:</strong> ${profileInfo.public_repos}</p>
  </div> `;
  overview.append(profileDiv);
};
