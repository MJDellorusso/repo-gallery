// Div that holds profile info
const overview = document.querySelector(".overview");
const username = "mjdellorusso";

const getProfile = async function () {
  const profileFetch = await fetch(`https://api.github.com/users/${username}`);
  const profileInfo = await profileFetch.json();
  console.log(profileInfo);
  displayProfile(profileInfo);
};
getProfile();

const displayProfile = function (profileInfo) {
  const profileDiv = document.createElement("div");
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
