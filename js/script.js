// Div where profile information will appear
const overviewDiv = document.querySelector(".overview");
// GitHub username
const username = "mjdellorusso";
// Ul of repos on github
const repoList = document.querySelector(".repo-list");

// async function to fetch user info ex: pic, name, bio, etc
const getGitHubInfo = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const userInfo = await res.json();
  console.log(userInfo);
  //   A call to the function that creates a div and populates it with the userInfo
  displayUserInfo(userInfo);
};
// The call to fetch the userInfo
getGitHubInfo();

// Function to display fetched userInfo in a <div>
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
  //   A call for the async function that fetches the repoInfo and the function that displays it in new <li>
  getRepoList();
};

// An async function to fetch the repoInfo w/ parameters to display repos from most recently updated and limit 100 repos per page.
const getRepoList = async function () {
  const data = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoInfo = await data.json();
  console.log(repoInfo);
  //   A call to the function that will display the fetched repo info w/ the argument being the variable holding the converted data to json
  repoDisplay(repoInfo);
};

// A function to display the repos fetched from the api
const repoDisplay = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};
