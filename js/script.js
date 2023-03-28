// Div where profile information will appear
const overviewDiv = document.querySelector(".overview");
// GitHub username
const username = "mjdellorusso";

const getGitHubInfo = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const userInfo = await res.json();
  console.log(userInfo);
  displayUserInfo(userInfo);
};
getGitHubInfo();

const displayUserInfo = function (userInfo) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("user-info");
  newDiv.innerHTML = `<figure>
  <img alt="user avatar" src=${"https://avatars.githubusercontent.com/u/109251548?v=4"} />
</figure>
<div>
  <p><strong>Name:</strong> ${userInfo.name}</p>
  <p><strong>Bio:</strong> ${userInfo.bio}</p>
  <p><strong>Location:</strong> ${userInfo.location}</p>
  <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
</div> `;
  overviewDiv.append(newDiv);
};
