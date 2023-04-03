// Div where profile information will appear
const overviewDiv = document.querySelector(".overview");
// GitHub username
const username = "mjdellorusso";
// Ul of repos on github
const repoList = document.querySelector(".repo-list");
// <section> for displaying the repo gallery
const repos = document.querySelector(".repos");
// <section> where hidden detailed repo data is
const repoData = document.querySelector(".repo-data");
// Back to repo gallery button
const backToRepos = document.querySelector(".view-repos");
// Search field for repo gallery
const filterInput = document.querySelector(".filter-repos");

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
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // A call to the repDeets function, when the function is clicked the name, description, default branch languages, and url to the repo are displayed
    repoDeets(repoName);
  }
});

// A function to fetch specific details of the repositories
const repoDeets = async function (repoName) {
  const getDeets = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const deets = await getDeets.json();
  console.log(deets);
  //  To fetch the language info specifically for each repo, to then be consolidated to an array to be displayed
  const fetchLanguages = await fetch(deets.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  // empty array to hold keys of the language objects
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
    console.log(languages);
  }
  //   A call to the function that will tell the webiste how to display specific repo info.
  repoDeetDisplay(deets, languages);
};

const repoDeetDisplay = function (deets, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  const deetDiv = document.createElement("div");
  deetDiv.innerHTML = `<h3>Name: ${deets.name}</h3>
  <p>Description: ${deets.description}</p>
  <p>Default Branch: ${deets.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${
    deets.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(deetDiv);
  backToRepos.classList.remove("hide");
};

backToRepos.addEventListener("click", function () {
  // Displays the gallery
  repos.classList.remove("hide");

  repoData.classList.add("hide");
  backToRepos.classList.remove("hide");
});

filterInput.addEventListener("input", function (e) {
  const input = e.target.value;
  const allRepos = document.querySelectorAll(".repo");
  const searchValue = input.toLowerCase();

  for (const repo of allRepos) {
    const lowerCaseRepo = repo.innerText.toLowerCase();
    if (lowerCaseRepo.includes(searchValue)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
