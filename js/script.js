// Div that holds profile info
const overview = document.querySelector(".overview");
// Github user name
const username = "mjdellorusso";
// UL to show all repos
const repoList = document.querySelector(".repo-list");

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
  // A call to the function fetching repo info
  getRepos();
};

const getRepos = async function () {
  const repoFetch = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const allRepos = await repoFetch.json();
  console.log(allRepos);
  // A call to the function that will display each repos name W/ the getRepos json response as the argument
  repoInfoDisplay(allRepos);
};

const repoInfoDisplay = function (repos) {
  for (const repo of repos) {
    const repoInfo = document.createElement("li");
    repoInfo.classList.add("repo");
    repoInfo.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoInfo);
  }
};
