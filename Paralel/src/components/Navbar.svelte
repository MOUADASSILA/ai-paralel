<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  // Active section tracking
  let activeSection = "home";
  let scrollY = 0;
  let isScrolled = false;

  // Update active section based on scroll position
  function updateActiveSection() {
    const sections = [
      { id: "home", element: document.querySelector("#home-section") },
      {
        id: "how-it-works",
        element: document.querySelector("#how-it-works-section"),
      },
      {
        id: "code-generator",
        element: document.querySelector("#code-generator-section"),
      },
      { id: "about", element: document.querySelector("#about-section") },
    ];

    // Find section in view
    for (const section of sections) {
      if (!section.element) continue;
      const rect = section.element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection = section.id;
        break;
      }
    }

    // Update scroll state for navbar styling
    scrollY = window.pageYOffset;
    isScrolled = scrollY > 20;
  }

  // Smooth scroll function with enhanced behavior
  function scrollToSection(sectionId) {
    const targetElement = document.querySelector(`#${sectionId}-section`);

    if (targetElement) {
      // SoftAI-style smooth scroll with subtle acceleration
      const rect = targetElement.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = scrollTop + rect.top - 70;

      let start = null;
      const duration = 1000;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        // Use a cubic easing function for a more natural scroll
        const easing =
          percentage < 0.5
            ? 4 * percentage * percentage * percentage
            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easing);

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }

      window.requestAnimationFrame(step);
    }

    // Set active immediately for better UX
    activeSection = sectionId;
  }

  onMount(() => {
    // Initial check for active section
    setTimeout(updateActiveSection, 100);

    // Add scroll event listener with passive option for better performance
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    // Clean up when component is destroyed
    return () => window.removeEventListener("scroll", updateActiveSection);
  });
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled
    ? 'bg-indigo-900/90 backdrop-blur-md shadow-md py-3'
    : 'bg-transparent py-5'}"
>
  <div class="container mx-auto px-4 md:px-8">
    <div class="flex items-center justify-between">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        <span class="font-bold text-xl text-white">
          <!-- Subtle gradient on logo text -->
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            >M.A-Codes</span
          >
          <!-- Small accent dot -->
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 ml-0.5"
          ></span>
        </span>
      </div>

      <!-- Navigation Links - Modern pill style -->
      <div
        class="flex items-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/10 shadow-sm"
      >
        <button
          on:click={() => scrollToSection("home")}
          class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                {activeSection === 'home'
            ? 'bg-white text-indigo-900 shadow-sm'
            : 'text-white/90 hover:bg-white/20'}"
        >
          Home
        </button>

        <button
          on:click={() => scrollToSection("how-it-works")}
          class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                {activeSection === 'how-it-works'
            ? 'bg-white text-indigo-900 shadow-sm'
            : 'text-white/90 hover:bg-white/20'}"
        >
          How It Works
        </button>

        <button
          on:click={() => scrollToSection("code-generator")}
          class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                {activeSection === 'code-generator'
            ? 'bg-white text-indigo-900 shadow-sm'
            : 'text-white/90 hover:bg-white/20'}"
        >
          Generator
        </button>

        <button
          on:click={() => scrollToSection("about")}
          class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                {activeSection === 'about'
            ? 'bg-white text-indigo-900 shadow-sm'
            : 'text-white/90 hover:bg-white/20'}"
        >
          About
        </button>
      </div>
    </div>
  </div>
</nav>
