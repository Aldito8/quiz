const swiper = new Swiper(".swiper", {
  spaceBetween: 70,
  loop: true,
  slidesPerView: "auto",
  speed: 4000,
  freeMode: false,
  autoplay: {
    delay: 0,
    reverseDirection: true,
  },
  allowTouchMove: true,
});

const workExperience = [{
  name: "Mentor Full Stack Web Developer",
  former: "Dumbways Indonesia",
  duration: "Oct 2022 - Present",
  description: [
    "Mentoring students in Full Stack Development bootcamp",
    "Teaching JavaScript, React, Node.js, and related technologies",
    "Providing code reviews and technical guidance",
    "Developing curriculum and learning materials",
    "Conducting technical interviews and assessments"],
  techs: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL"],
  pic: "assets/images/dumbways.png"
}, {
  name: "Full Stack Web Developer",
  former: "LezzCode",
  duration: "Oct 2023 - Mar 2024",
  description: [
    "Develop and maintain web applications",
    "Collaborate with the team to complete projects on time",
    "Implement new features based on user requirements",
    "Optimize application performance and user experience"],
  techs: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind"],
  pic: "assets/images/lezzcode.png"
}, {
  name: "Internship Full Stack Web Developer",
  former: "Nocola IOT Solution",
  duration: "May 2019 - Oct 2019",
  description: [
    "Assisted in developing web applications using HTML, CSS, and JavaScript",
    "Worked on IoT projects involving hardware integration and PCB assembly",
    "Identified and fixed software bugs, ensuring optimal performance and security"],
  techs: ["JavaScript", "Node.js", "IoT", "MySQL"],
  pic: "assets/images/nocola.png"
}]

const myProjects = [{
  pic: "assets/myproject/fakturly.png",
  name: "Fakturly",
  description: "Digital invoice and payment reminder solution that makes billing management easier. Built with modern tech stack for optimal performance.",
  techs: ["Next.js", "TypeScript", "Node.js", "Tailwind"],
  repo: "#",
  demo: "#"
}, {
  pic: "assets/myproject/nimalis.png",
  name: "Nimalis",
  description: "A peer-to-peer platform connecting minimalists with those in need, enabling users to share and find free items while promoting sustainable living.",
  techs: ["Next.js", "TypeScript", "Node.js", "Tailwind"],
  repo: "#",
  demo: "#"
}, {
  pic: "assets/myproject/lezzauth.gif",
  name: "LezzAuth",
  description: "A ready-to-use user management platform, providing pre-built components for login and registration systems.",
  techs: ["React", "TypeScript", "Node.js", "Tailwind"],
  repo: "#",
  demo: "#"
}, {
  pic: "assets/myproject/lezztable.gif",
  name: "LezzTable",
  description: "A platform that simplifies the creation of custom tables and lists using both static data and APIs.",
  techs: ["React", "TypeScript", "Node.js", "Tailwind"],
  repo: "#",
  demo: "#"
}, {
  pic: "assets/myproject/raimu.png",
  name: "Raimu.pro",
  description: "A platform for pixel AI image generation that produces HD images based on user-defined prompts.",
  techs: ["Next.js", "TypeScript", "AI/ML", "Tailwind"],
  repo: "#",
  demo: "#"
}, {
  pic: "assets/myproject/hallocorona.png",
  name: "Hallo Corona",
  description: "A web-based platform providing reliable COVID-19 information and support.",
  techs: ["React", "Go", "PostgreSQL", "Bootstrap"],
  repo: "#",
  demo: "#"
}, {
  pic: "assets/myproject/dumbmerch.png",
  name: "DumbMerch",
  description: "A comprehensive e-commerce platform for buying and selling.",
  techs: ["React", "Express", "PostgreSQL", "Bootstrap"],
  repo: "#",
  demo: "#"
}]

function WorkExperiences() {
  workExperience.map(experience => {
    console.log(experience)
    document.getElementById("cardWorkExperiences").innerHTML +=
      `<div class="flex gap-10 shadow-sm px-4 py-12">
        <div class="h-16 w-16 mt-3">
          <img
            src="${experience.pic}"
            id="pic"
            class=""
            alt=""
          />
        </div>
        <div class="w-full">
          <div class="">
            <div class="flex justify-between">
              <div class="">
                <h3 class="text-lg font-semibold" id="name">
                  ${experience.name}
                </h3>
                <p class="text-green-600" id="former">
                  ${experience.former}
                </p>
              </div>
              <span class="text-gray-500" id="duration"
              >${experience.duration}</span
              >
            </div>
          </div>
          <div class="mt-3">
            <ul
              class="list-inside list-disc mb-4 space-y-2 text-gray-600 text-sm"
              id="description"
            >${experience.description.map(desc => `<li>${desc}</li>`).join('')}</ul>
          </div>
          <div class="flex gap-2 mt-2" id="techs">
            ${experience.techs.map(x => `<span class="rounded-full bg-gray-200 text-xs font-medium px-3 py-1 text-gray-600">${x}</span>`).join('')}
          </div>
        </div>
      </div>`
  }).join('');
}

function Projects() {
  myProjects.map(project => {
    console.log(project)
    document.getElementById("cardProjects").innerHTML +=
      `<div class="overflow-hidden rounded-xl shadow-sm">
        <div
          class="relative h-52 flex bg-gray-200 items-center justify-center bg-gray"
        >
          <img
            src="${project.pic}"
            class="w-full h-full object-contain rounded-xl"
            alt=""
          />
        </div>
        <div class="p-8">
          <h3 class="font-bold text-xl mb-3">${project.name}</h3>
          <p class="text-gray-600 text-sm mb-4">
            ${project.description}
          </p>
          <div class="flex gap-2 mt-2 mb-6">
          ${project.techs.map(x => `<span
              class="rounded-full bg-gray-200 text-xs font-medium px-3 py-1 text-gray-600"
              >${x}</span
            >`).join('')}
            
          </div>
          <div class="flex gap-4">
            <a class="flex items-center text-xs text-gray-500" href="${project.repo}">
              <svg
                class="w-4 h-4 mr-1.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                ></path>
              </svg>
              Private Repository</a
            >

            <a class="flex items-center text-xs text-blue-600" href="${project.demo}">
              <svg
                class="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path></svg
              >Live Demo</a
            >
          </div>
        </div>
      </div>`
  }).join('');
}

WorkExperiences()
Projects()


const time = new Date().toISOString().split("T")[0]


console.log(time);
