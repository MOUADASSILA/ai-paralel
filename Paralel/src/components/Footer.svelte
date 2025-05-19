<script>
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  // Footer visibility state
  let isVisible = false;

  // Current year
  const currentYear = new Date().getFullYear();

  // Social links
  const socialLinks = [
    { icon: "github", url: "https://github.com/MOUADASSILA" },

    {
      icon: "linkedin",
      url: "https://www.linkedin.com/in/mouad-assila-279604164/",
    },
  ];

  // Function to scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Initialize animations
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  });

  // Social media icon components
  const socialIcons = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>`,
  };
</script>

<footer
  class="relative bg-gradient-to-br from-indigo-900 to-indigo-950 text-white py-6 mt-auto overflow-hidden"
>
  <!-- Subtle background pattern -->
  <div
    class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2Nmgtdi02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"
  ></div>

  <!-- Main content -->
  <div class="container mx-auto px-4 relative z-10">
    {#if isVisible}
      <div class="flex flex-col md:flex-row items-center justify-between">
        <!-- Logo and social links -->
        <div class="flex items-center space-x-4">
          <!-- Logo -->
          <div class="flex items-center">
            <h3 class="ml-2 text-lg font-bold text-white">M.A-Codes</h3>
          </div>

          <!-- Navigation links compact -->
          <div class="hidden md:flex space-x-6 ml-8 text-sm">
            <a
              href="#home-section"
              class="text-indigo-200 hover:text-white transition-colors">Home</a
            >
            <a
              href="#how-it-works-section"
              class="text-indigo-200 hover:text-white transition-colors"
              >How It Works</a
            >
            <a
              href="#code-generator-section"
              class="text-indigo-200 hover:text-white transition-colors"
              >Generator</a
            >
            <a
              href="#about-section"
              class="text-indigo-200 hover:text-white transition-colors"
              >About</a
            >
          </div>
        </div>

        <div class="flex items-center mt-4 md:mt-0">
          <!-- Social links -->
          <div class="flex space-x-3">
            {#each socialLinks as link, i}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 rounded-full bg-white/5 text-indigo-200 hover:bg-white/15 hover:text-white transition-all duration-300"
                aria-label={`Visit our ${link.icon} page`}
              >
                {@html socialIcons[link.icon]}
              </a>
            {/each}
          </div>

          <!-- Back to top button -->
          <button
            on:click={scrollToTop}
            class="ml-4 p-1.5 rounded-full bg-indigo-800 hover:bg-indigo-700 transition-colors duration-200"
            aria-label="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-indigo-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 11l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center text-indigo-300 text-xs mt-4">
        <p>
          &copy; {currentYear} Mouad Assila 191502214 - Paralel Programlama Course
          Project
        </p>
      </div>
    {/if}
  </div>
</footer>
