<script>
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { cubicOut, backOut } from "svelte/easing";
  import meImage from "../assets/me.jpg";

  // Animation states
  let sectionVisible = false;
  let projectCardVisible = false;
  let developerCardVisible = false;

  // Tech stack items
  const technologies = [
    {
      name: "Svelte",
      color: "blue",
      icon: `<svg viewBox="0 0 98.1 118" width="20" height="20" fill="#FF3E00"><path d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5"/></svg>`,
    },
    {
      name: "Node.js",
      color: "green",
      icon: `<svg viewBox="0 0 448 512" width="20" height="20" fill="#539E43"><path d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z"/></svg>`,
    },
    {
      name: "Tailwind CSS",
      color: "purple",
      icon: `<svg viewBox="0 0 248 154" width="20" height="20"><path fill="#38BDF8" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"/></svg>`,
    },
    {
      name: "AI Integration",
      color: "yellow",
      icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/><path d="M10 15.5v0a2.5 2.5 0 0 1 4 2V20"/><path d="M14 16v0a2 2 0 1 1 4 0v4"/><path d="M6 13v0a2 2 0 0 1 4 0v7"/></svg>`,
    },
  ];

  // Initialize animations with observer
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionVisible = true;

          // Sequence card animations
          setTimeout(() => {
            projectCardVisible = true;

            setTimeout(() => {
              developerCardVisible = true;
            }, 300);
          }, 300);

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector("#about-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section id="about-section" class="py-24 relative overflow-hidden">
  <!-- Background gradient and pattern -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 -z-10"
  ></div>
  <div
    class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM0MzM4ZWUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2Nmgtdi02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 -z-10"
  ></div>

  <!-- Content container -->
  <div class="container mx-auto px-4 md:px-8 max-w-5xl">
    <!-- Section header -->
    {#if sectionVisible}
      <div
        in:fly={{ y: 30, duration: 800, easing: cubicOut }}
        class="text-center mb-16"
      >
        <span
          class="inline-block py-1 px-3 rounded-full text-indigo-700 bg-indigo-100 text-sm font-medium mb-4"
          >About</span
        >
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-700"
          >
            About This Project
          </span>
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          A student project showcasing AI-powered code generation technology
        </p>
      </div>
    {/if}

    <!-- Project Info Card with enhanced styling and hover effects -->
    {#if projectCardVisible}
      <div
        in:fly={{ y: 20, duration: 700, easing: cubicOut }}
        class="mb-10 relative group cursor-pointer"
      >
        <!-- Main card with glass morphism effect -->
        <div
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-50 p-8 md:p-10 relative overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 transform"
        >
          <!-- Decorative elements -->
          <div
            class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-100 to-blue-50 opacity-50 rounded-bl-full -z-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-70"
          ></div>
          <div
            class="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-blue-50 opacity-30 rounded-full blur-xl -z-0 transition-all duration-300 group-hover:opacity-50"
          ></div>

          <!-- Content -->
          <div class="relative z-10">
            <!-- Header with enhanced icon -->
            <div class="flex items-center mb-8">
              <div class="relative">
                <div
                  class="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="transition-transform duration-300 group-hover:rotate-12"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <div
                  class="absolute -inset-2 bg-indigo-600 opacity-10 rounded-lg blur-lg -z-10 transition-opacity duration-300 group-hover:opacity-20"
                ></div>
              </div>
              <div class="ml-5">
                <h3 class="text-xl md:text-2xl font-bold text-gray-800">
                  AI Code Generator
                </h3>
                <p class="text-indigo-600 text-sm font-medium">
                  Paralel Programlama Project
                </p>
              </div>
            </div>

            <!-- Project Description with enhanced typography -->
            <div class="space-y-5 text-gray-600 mb-10">
              <p class="leading-relaxed">
                This web application was created as a homework project for the <span
                  class="font-medium text-indigo-700">Paralel Programlama</span
                > course. It demonstrates how artificial intelligence can be used
                to generate code based on simple descriptions.
              </p>

              <blockquote
                class="pl-4 border-l-2 border-indigo-500 italic text-gray-700 my-6"
              >
                The app connects a Svelte frontend with a Node.js backend that
                uses AI to transform text prompts into working code. Users can
                type what they need, and the AI will generate the appropriate
                code in various programming languages.
              </blockquote>
            </div>

            <!-- Enhanced Tech Stack with hover effects -->
            <div class="relative">
              <h4
                class="text-sm font-semibold text-gray-900 mb-4 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Technologies Used
              </h4>

              <div class="flex flex-wrap gap-3">
                {#each technologies as tech, i}
                  <div
                    in:scale={{
                      delay: 300 + i * 100,
                      duration: 400,
                      start: 0.9,
                      easing: backOut,
                    }}
                    class="flex items-center px-4 py-2 rounded-full bg-{tech.color}-50 text-{tech.color}-700 border border-{tech.color}-100 shadow-sm hover:shadow hover:bg-{tech.color}-100 hover:-translate-y-1 transform transition-all duration-300 cursor-pointer"
                  >
                    <span class="mr-2 flex-shrink-0 text-{tech.color}-500"
                      >{@html tech.icon}</span
                    >
                    <span class="text-sm font-medium">{tech.name}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>

        <!-- Card glow effect on hover -->
        <div
          class="absolute -inset-1 bg-gradient-to-r from-indigo-200 to-blue-200 opacity-0 group-hover:opacity-30 rounded-2xl blur-lg -z-10 transition-opacity duration-500"
        ></div>
      </div>
    {/if}

    <!-- Developer Card with enhanced styling and hover effects -->
    {#if developerCardVisible}
      <div
        in:fly={{ y: 20, duration: 700, delay: 300, easing: cubicOut }}
        class="relative group cursor-pointer"
      >
        <div
          class="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl overflow-hidden shadow-lg relative transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 transform"
        >
          <!-- Background decoration -->
          <div class="absolute inset-0 overflow-hidden">
            <svg
              class="absolute left-full transform -translate-y-1/4 -translate-x-1/3 lg:left-auto lg:right-full lg:translate-x-1/3 lg:translate-y-1/4 transition-transform duration-500 group-hover:scale-110"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="squares"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-indigo-400"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#squares)"
                opacity="0.1"
                class="transition-opacity duration-500 group-hover:opacity-20"
              />
            </svg>
          </div>

          <!-- Card content -->
          <div class="relative p-8 flex flex-col sm:flex-row items-center">
            <!-- Profile Image with enhanced styling and hover effect -->
            <div class="relative mb-5 sm:mb-0 sm:mr-8">
              <div
                class="h-20 w-20 rounded-full overflow-hidden shadow-md border-2 border-white transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
              >
                <img
                  src={meImage}
                  alt="Mouad Assila"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="absolute -inset-1 bg-white opacity-30 rounded-full blur -z-10 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
            </div>

            <!-- Developer Info with enhanced typography -->
            <div class="text-center sm:text-left">
              <h3 class="text-2xl font-bold text-white mb-1">Mouad Assila</h3>
              <p class="text-blue-200 mb-4 font-light">
                Computer engineering student
              </p>

              <!-- Enhanced Social Links with hover effects -->
              <div class="flex justify-center sm:justify-start space-x-4">
                <a
                  href="https://github.com/MOUADASSILA"
                  target="_blank"
                  class="p-2.5 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow hover:scale-110 transform"
                  aria-label="GitHub Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/mouad-assila-279604164/"
                  target="_blank"
                  class="p-2.5 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow hover:scale-110 transform"
                  aria-label="LinkedIn Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Right Side Badge with enhanced styling and hover effect -->
            <div class="hidden sm:block ml-auto">
              <span
                class="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 shadow-inner transition-all duration-300 group-hover:bg-white/20"
              >
                Student Project
              </span>
            </div>
          </div>
        </div>

        <!-- Card glow effect on hover -->
        <div
          class="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-30 rounded-2xl blur-xl -z-10 transition-opacity duration-500"
        ></div>
      </div>
    {/if}
  </div>
</section>
