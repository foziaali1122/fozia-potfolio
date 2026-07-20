/* =========================
   DARK MODE TOGGLE
========================= */
const themeToggle =
    document.getElementById("theme-toggle");

themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {
            themeToggle.textContent = "☀";

        } else {

            themeToggle.textContent = "☾";
        }
    }
);


/* =========================
   GITHUB API
========================= */
const loadProjectsButton =
    document.getElementById(
        "load-projects"
    );

const apiStatus =
    document.getElementById(
        "api-status"
    );

const projectsContainer =
    document.getElementById(
        "github-projects-container"
    );

loadProjectsButton.addEventListener(
    "click",
    function () {

        apiStatus.textContent =
            "Loading my latest GitHub projects...";

        projectsContainer.innerHTML =
            "";

        fetch(
            "https://api.github.com/users/foziaali1122/repos?sort=updated&per_page=6"
        )

        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Unable to load projects"
                );
            }
            return response.json();
        })

        .then(function (repositories) {
            apiStatus.textContent =
                "Latest projects from GitHub";

            repositories.forEach(
                function (repo) {

                    const projectCard =
                        document.createElement(
                            "article"
                        );

                    projectCard.classList.add(
                        "github-card"
                    );

                    projectCard.innerHTML = `
                        <h4>
                            ${repo.name}
                        </h4>

                        <p>
                            ${
                                repo.description ||
                                "A project built with passion and technology."
                            }
                        </p>

                        <a
                            href="${repo.html_url}"
                            target="_blank"
                        >
                            View Repository →

                        </a>
                    `;

                    projectsContainer.appendChild(
                        projectCard
                    );
                }
            );
        })

        .catch(function (error) {

            apiStatus.textContent =
                "Sorry, GitHub projects could not be loaded right now. Please try again later.";
            console.error(error);
        });
    }
);