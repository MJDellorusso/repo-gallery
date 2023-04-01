// Div where profile information will appear
const overviewDiv = document.querySelector(".overview");
// GitHub username
const username = "mjdellorusso";
// Ul of repos on github
const repoList = document.querySelector(".repo-list");

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
  getRepoList();
};

const getRepoList = async function () {
  const data = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoInfo = await data.json();
  console.log(repoInfo);
  repoDisplay(repoInfo);
};

const repoDisplay = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};
