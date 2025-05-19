<script>
  import { onMount } from "svelte";

  // Step data
  const steps = [
    {
      title: "Describe",
      description:
        "Tell us what you want to build in any programming language. Be as specific or general as you need.",
      icon: "✏️",
      color: "blue",
    },
    {
      title: "Generate",
      description:
        "Our AI instantly creates clean, efficient code that matches your requirements and follows best practices.",
      icon: "⚡",
      color: "indigo",
    },
    {
      title: "Implement",
      description:
        "Copy your code with one click or refine it through conversation until it's exactly what you need.",
      icon: "✓",
      color: "purple",
    },
  ];
  
  // Section visibility tracking
  let visible = false;
  
  // Function to scroll to code generator
  function scrollToGenerator() {
    const generator = document.querySelector("#code-generator-section");
    if (generator) {
      generator.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  // Initialize with observer
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visible = true;
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    const section = document.querySelector("#how-it-works-section");
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
</script>

<section id="how-it-works-section" class="py-24 bg-white">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-center mb-16 text-gray-800">
      How It Works
    </h2>

    <div class="flex flex-col md:flex-row justify-between gap-10 relative">
      <!-- Timeline connector - visible on md screens and up -->
      <div class="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-100 z-0"></div>
      
      {#each steps as step, i}
        <div
          class="flex-1 relative z-10 animate-fade-in"
          style="animation-delay: {i * 150}ms;"
        >
          <div class="flex flex-col items-center group">
            <!-- Step icon with circle -->
            <div 
              class="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm bg-white transition-all duration-300 group-hover:shadow-md group-hover:scale-105"
              class:border-blue-400={step.color === 'blue'}
              class:border-indigo-400={step.color === 'indigo'}
              class:border-purple-400={step.color === 'purple'}
              class:border-2={true}
              class:group-hover:border-blue-500={step.color === 'blue'}
              class:group-hover:border-indigo-500={step.color === 'indigo'}
              class:group-hover:border-purple-500={step.color === 'purple'}
            >
              <span class="text-3xl group-hover:-rotate-12 transition-transform duration-300">{step.icon}</span>
            </div>
            
            <!-- Step number -->
            <div 
              class="text-xs font-semibold uppercase tracking-wider mb-3 transition-colors duration-300"
              class:text-blue-500={step.color === 'blue'}
              class:text-indigo-500={step.color === 'indigo'}
              class:text-purple-500={step.color === 'purple'}
            >
              Step {i + 1}
            </div>
            
            <!-- Step title -->
            <h3 class="text-xl font-semibold mb-2 text-gray-800 text-center group-hover:text-black transition-colors duration-300">
              {step.title}
            </h3>
            
            <!-- Step description -->
            <p class="text-gray-500 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {step.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="mt-16 text-center">
      <button 
        on:click={scrollToGenerator}
        class="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium hover:shadow-md transform hover:-translate-y-1"
      >
        Try It Now
      </button>
    </div>
  </div>
</section>

<style>
  .animate-fade-in {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>