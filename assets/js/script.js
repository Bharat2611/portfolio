$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });

  $("#contact-form").submit(function (event) {
    emailjs.init("T6bIDcBG_-HxlbHUO");

    emailjs
      .sendForm("service_wcswcb4", "template_ab2kn19", "#contact-form")
      .then(
        function (response) {
          document.getElementById("contact-form").reset();
          alert("Form Submitted Successfully");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Form Submission Failed! Try Again");
        }
      );
    event.preventDefault();
  });
});

var typed = new Typed(".typing-text", {
  strings: [
    "frontend development",
    "backend development",
    "web designing",
    "web development",
  ],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});

async function fetchData(type = "skills") {
  let response;
  type === "skills"
    ? (response = await fetch("./assets/js/jsonFiles/skills.json"))
    : type === "projects"
    ? (response = await fetch("./assets/js/jsonFiles/projects.json"))
    : (response = await fetch("./assets/js/jsonFiles/experience.json"));
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach((skill) => {
    skillHTML += `
      <div class="bar">
        <div class="info">
          <img src="${skill.icon}" alt="skill" />
          <span>${skill.name}</span>
          ${skill.status ? `<s class="learning-label">Learning</s>` : ""}
        </div>
      </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects.slice(0, 6).forEach((project) => {
    projectHTML += `
        <div class="box tilt">
          <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>`;
  });
  projectsContainer.innerHTML = projectHTML;
}

function showExperience(experiences) {
  let experienceContainer = document.querySelector("#experience .timeline");
  let experienceHTML = "";

  experiences.forEach((experience) => {
    experienceHTML += `
      <div class="container ${experience.side}">
        <div class="content">
          <div class="tag">
            <h2>${experience.title}</h2>
          </div>
          <div class="desc">
            <h3>${experience.description}</h3>
            <p>${experience.time}</p>
          </div>
        </div>
      </div>`;
  });
  experienceContainer.innerHTML = experienceHTML;
}

fetchData().then((data) => {
  showSkills(data);
});

fetchData("projects").then((data) => {
  showProjects(data);
  // if (data.length < 7) {
  //   const viewallProjectBtn = document.querySelector("#viewallProjectBtn");
  //   viewallProjectBtn.style = "display :none";
  // }
});

fetchData("experience").then((data) => {
  showExperience(data);
  // if (data.length < 7) {
  //   const viewallExperienceBtn = document.querySelector(
  //     "#viewallExperienceBtn"
  //   );
  //   viewallExperienceBtn.style = "display :none";
  // }
});

function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}
function fadeOut() {
  setInterval(loader, 500);
}
window.onload = fadeOut;
// Display age
const displayAge = document.querySelector("#displayAge");
const currYear = new Date().getFullYear();
displayAge.innerText = currYear - 2003 + " years old";

// fetch user connected or not
mainContent.style = "display:none";

function checkInternet() {
  const page_404 = document.querySelector("#page_404");
  const mainContent = document.querySelector("#mainContent");
  let con = navigator.onLine;
  if (con) {
    page_404.style = "display:none";
    mainContent.style = "display:block";
  } else {
    page_404.style = "display:block";
    mainContent.style = "display:none";
  }
}

setInterval(() => {
  checkInternet();
}, 1000);
