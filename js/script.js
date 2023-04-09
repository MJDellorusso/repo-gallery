// Div that holds profile info
const overview = document.querySelector(".overview");
// Github user name
const username = "mjdellorusso";
// UL to show all repos
const repoList = document.querySelector(".repo-list");
// A section with the class of repos where the repo tiles UL will be displayed
const repoSection = document.querySelector(".repos");
// A section with the class of repo-data where the info about each individual repo is held.
const repoData = document.querySelector(".repo-data");
// Button that goes back to view of all tiles
const backToGallery = document.querySelector(".view-repos");
// The search bar to filter repos by name
const filterInput = document.querySelector(".filter-repos");

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
  repoTitleDisplay(allRepos);
};
// a function to display the names of all repos on github profile in tiles
const repoTitleDisplay = function (allRepos) {
  filterInput.classList.remove("hide");
  // for each repo of allRepos...
  for (const repo of allRepos) {
    const repoTitle = document.createElement("li");
    repoTitle.classList.add("repo");
    // The name of the individual repo from the array of repos
    repoTitle.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoTitle);
  }
};

// Event listener that captures the <h3> innerText of the repo tile that is clicked to create a varible that will be used to fetch details about the targeted repo
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // A call to the async function that will fetch the repo details after the click event acquires the repo name
    getRepoDetails(repoName);
  }
});
// A function to fetch the details of a clicked on repo
const getRepoDetails = async function (repoName) {
  const fetchDetails = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await fetchDetails.json();
  console.log(repoInfo);
  // Fetch to retreive languages used in each repo
  const fetchLanguages = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  );
  // languageData is an object
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  // Array to hold language data for each repo
  const languages = [];
  // In the languageData object the keys hold the names of the languages that we want to display
  for (let key in languageData) {
    languages.push(key);
    console.log(languages);
  }
  // A call to the function that will create a new div and display specific info about a clicked on repo
  displayRepoDetails(repoInfo, languages);
};

const displayRepoDetails = function (repoInfo, languages) {
  // Clears the section each time
  repoData.innerHTML = "";
  // Creates the div that will hold repo details
  const repoDetailDiv = document.createElement("div");
  // Populates the div with the HTML to show the details
  repoDetailDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${
    repoInfo.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  // Adds the div to the section
  repoData.append(repoDetailDiv);
  // Revels the div to the user
  repoData.classList.remove("hide");
  // Hides all repo tiles
  repoSection.classList.add("hide");
  // Reveals back to gallery button
  backToGallery.classList.remove("hide");
};
// Button that hides the specific repo info and displays the repo tiles again
backToGallery.addEventListener("click", function () {
  repoSection.classList.remove("hide");
  repoData.classList.add("hide");
  backToGallery.classList.add("hide");
});

// Event listener that captures the input typed into the search bar
filterInput.addEventListener("input", function (e) {
  // Varaible to hold the value typed into the input bar
  const searchText = filterInput.value;
  console.log(searchText);
  // variable to select all the individual repos
  const repos = document.querySelectorAll(".repo");
  // Variable to change input text to lower case
  const lowerCaseSearch = searchText.toLowerCase();

  // For of loop to change the title of the individual repos to lower text to match the search text
  for (const repo of repos) {
    // Varaible holding the lower case repo names
    const lowerCaseRepoText = repo.innerText.toLowerCase();
    // Conditional statement that compares the input text to the text in the repos name
    if (lowerCaseRepoText.includes(lowerCaseSearch)) {
      // If the search text contains a letter in the title of a repo that repo remains visible
      repo.classList.remove("hide");
    } else {
      // If the letter typed is not found in the repo title that repo is hidden
      repo.classList.add("hide");
    }
  }
});
