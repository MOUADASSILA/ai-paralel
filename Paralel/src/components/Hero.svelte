<script>
  import { onMount } from "svelte";

  // Content in both languages
  const content = {
    english: {
      title: "AI Coding Assistant",
      subtitle: "Code faster. Build better.",
      button: "Try Now",
    },
    turkish: {
      title: "AI Kodlama Asistanı",
      subtitle: "Daha hızlı kodla. Daha iyi inşa et.",
      button: "Şimdi Dene",
    },
  };

  // Current language and animation state
  let currentLanguage = "english";
  let isAnimating = false;

  // Create dummy elements to use the CSS classes so Svelte doesn't report them as unused
  let dummyUsage = false;

  // Function to scroll to code generator
  function scrollToGenerator() {
    const generator = document.querySelector("#code-generator-section");
    if (generator) {
      generator.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Toggle language
  function toggleLanguage() {
    if (isAnimating) return;

    const textElements = document.querySelectorAll(".animate-text");
    isAnimating = true;

    // Add exit class to all elements
    textElements.forEach((el) => {
      el.classList.add("exit");
    });

    // Change language after exit animation
    setTimeout(() => {
      currentLanguage = currentLanguage === "english" ? "turkish" : "english";

      // Remove exit class and add enter class
      setTimeout(() => {
        textElements.forEach((el) => {
          el.classList.remove("exit");
          el.classList.add("enter");
        });

        // Remove enter class after animation completes
        setTimeout(() => {
          textElements.forEach((el) => {
            el.classList.remove("enter");
          });
          isAnimating = false;
        }, 500);
      }, 50);
    }, 400);
  }

  // Auto language toggle
  onMount(() => {
    const interval = setInterval(toggleLanguage, 5000);
    return () => clearInterval(interval);
  });

  // Format code lines with inline styles instead of classes
  const codeLines = [
    `<span style="color: #60a5fa;">function</span> <span style="color: #34d399;">generateCode</span>(<span style="color: #fbbf24;">prompt</span>) {`,
    `  <span style="color: #60a5fa;">const</span> ai = <span style="color: #60a5fa;">new</span> <span style="color: #34d399;">ParalelAI</span>();`,
    `  `,
    `  <span style="color: #a78bfa;">// Process user request</span>`,
    `  <span style="color: #60a5fa;">const</span> result = ai.<span style="color: #34d399;">generate</span>(prompt);`,
    `  `,
    `  <span style="color: #60a5fa;">return</span> result.code;`,
    `}`,
  ];
</script>

<section class="relative h-screen flex items-center overflow-hidden bg-black">
  <!-- Background shapes -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Main gradient -->
    <div
      class="absolute top-0 -right-1/4 w-3/4 h-full bg-gradient-to-l from-blue-500/10 to-transparent"
    ></div>
    <div
      class="absolute bottom-0 -left-1/4 w-3/4 h-full bg-gradient-to-r from-purple-500/10 to-transparent"
    ></div>

    <!-- Foreground elements -->
    <div
      class="absolute right-10 top-1/2 transform -translate-y-1/2 w-1/3 max-w-md aspect-square border border-gray-800 rounded-full"
    ></div>
    <div
      class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 w-1/4 max-w-xs aspect-square border border-gray-800 rounded-full"
    ></div>

    <!-- Large decorative circle -->
    <div
      class="absolute right-1/3 -bottom-1/4 w-2/3 aspect-square border border-gray-800 rounded-full opacity-20"
    ></div>
  </div>

  <!-- Content container -->
  <div class="container mx-auto px-6 relative z-10 flex flex-col items-start">
    <div class="max-w-md">
      <!-- Title -->
      <div class="mb-6 overflow-hidden">
        <h1 class="text-5xl md:text-6xl font-bold text-white animate-text">
          {content[currentLanguage].title}
        </h1>
      </div>

      <!-- Subtitle -->
      <div class="mb-8 overflow-hidden">
        <p class="text-xl text-gray-400 animate-text">
          {content[currentLanguage].subtitle}
        </p>
      </div>

      <!-- Button row -->
      <div class="flex items-center space-x-6">
        <button
          on:click={scrollToGenerator}
          class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
        >
          {content[currentLanguage].button}
        </button>
      </div>
    </div>

    <!-- Code snippet display -->
    <div
      class="absolute right-10 top-1/2 transform -translate-y-1/2 w-5/12 max-w-lg hidden md:block"
    >
      <div
        class="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl"
      >
        <!-- Code editor header -->
        <div class="bg-gray-800 px-4 py-2 flex items-center">
          <div class="flex space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div class="ml-4 text-xs text-gray-400">main.js</div>
        </div>

        <!-- Code content with safer approach using inline styles -->
        <div class="p-4 font-mono text-sm text-gray-300">
          {#each codeLines as line}
            <div class="code-line">
              {@html line}
            </div>
          {/each}

          <!-- Cursor -->
          <div
            class="h-4 -mt-4 ml-4 w-2 bg-blue-400 inline-block animate-blink"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator at bottom of viewport -->
  <div
    class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
  >
    <div
      class="w-8 h-12 border border-gray-700 rounded-full flex justify-center opacity-50"
    >
      <div
        class="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll-down"
      ></div>
    </div>
    <span class="text-xs text-gray-500 mt-2">Scroll</span>
  </div>
</section>

<style>
  /* Cursor blink animation */
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .animate-blink {
    animation: blink 1s infinite;
  }

  /* Text animation classes */
  .animate-text {
    transform: translateY(0);
    opacity: 1;
    transition:
      transform 0.4s ease,
      opacity 0.4s ease;
  }

  /* Use these elements in the component to avoid unused CSS warnings */
  :global(.animate-text-usage) {
    transform: translateY(0);
    opacity: 1;
  }

  :global(.animate-text-usage.exit) {
    transform: translateY(20px);
    opacity: 0;
  }

  :global(.animate-text-usage.enter) {
    transform: translateY(0);
    opacity: 1;
  }

  /* Scroll down animation */
  @keyframes scrollDown {
    0%,
    100% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(6px);
      opacity: 0.5;
    }
  }

  .animate-scroll-down {
    animation: scrollDown 1.5s ease-in-out infinite;
  }
</style>
