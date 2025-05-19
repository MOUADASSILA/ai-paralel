<script>
  import Navbar from "./components/Navbar.svelte";
  import Hero from "./components/Hero.svelte";
  import CodeGenerator from "./components/CodeGenerator.svelte";
  import Footer from "./components/Footer.svelte";
  import HowitWorks from "./components/HowItWorks.svelte";
  import { chatVisible } from "./lib/Stores";
  import ChatWindow from "./components/ChatWindow.svelte";
  import About from "./components/About.svelte";
  import { onMount } from "svelte";
  
  // Enhanced smooth scrolling
  onMount(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Handle hash links on page load
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        setTimeout(() => {
          // Custom smooth scroll
          const rect = targetElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = scrollTop + rect.top - 80;
          
          let start = null;
          const duration = 1000;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          
          function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Cubic easing
            const easing = percentage < 0.5 
              ? 4 * percentage * percentage * percentage 
              : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
              
            window.scrollTo(0, startPosition + distance * easing);
            
            if (progress < duration) {
              window.requestAnimationFrame(step);
            }
          }
          
          window.requestAnimationFrame(step);
        }, 100);
      }
    }
    
    // Add scrolling progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    document.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
    
    return () => {
      document.body.removeChild(progressBar);
    };
  });
</script>

<main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  <Navbar />
  <Hero />
  <HowitWorks />
  <CodeGenerator />
  <About />
  <Footer />
</main>

{#if $chatVisible}
  <ChatWindow />
{/if}

<style>
  /* Scrollbar styling */
  :global(html) {
    scrollbar-width: thin;
    scrollbar-color: rgba(79, 70, 229, 0.5) transparent;
  }
  
  :global(*::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }
  
  :global(*::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(*::-webkit-scrollbar-thumb) {
    background-color: rgba(79, 70, 229, 0.3);
    border-radius: 20px;
  }
  
  :global(*::-webkit-scrollbar-thumb:hover) {
    background-color: rgba(79, 70, 229, 0.6);
  }
  
  /* Progress bar styling */
  :global(.scroll-progress-bar) {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #60a5fa, #6366f1);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease-out;
  }
  
  /* Enhanced focus styles for accessibility */
  :global(*:focus-visible) {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
</style>
