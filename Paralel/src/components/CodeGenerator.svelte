<script>
  import { chatVisible, codeGeneratorInput, codeGeneratorOutput } from "../lib/Stores";
  import { fade, fly, scale } from "svelte/transition";
  import { elasticOut, cubicOut } from "svelte/easing";
  import { onMount } from "svelte";
  
  // State variables
  let inputCode = "";
  let isLoading = false;
  let isVisible = false;
  
  // Handle code generation
  async function handleGenerate() {
    if (!inputCode.trim()) return;
    
    isLoading = true;
    
    try {
      const input = { prompt: inputCode };
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      
      if (!res.ok) {
        throw new Error("Failed to generate code");
      }
      
      const data = await res.json();
      $codeGeneratorInput = inputCode;
      $codeGeneratorOutput = data.data.response;
      $chatVisible = true;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isLoading = false;
    }
  }
  
  // Animation on component mount
  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 300);
  });
</script>

<div id="code-generator-section" class="container mx-auto px-4 py-16">
  <!-- Section Header with Animations -->
  {#if isVisible}
    <div 
      in:fly={{ y: 30, duration: 800, delay: 200, easing: cubicOut }}
      class="text-center mb-12"
    >
      <h2 class="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
        <span class="text-blue-600">AI</span> Code Generator
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Describe what you want to build, and our AI will generate the code for you
      </p>
    </div>
  {/if}
  
  <!-- Main Content Card -->
  {#if isVisible}
    <div 
      in:fly={{ y: 40, duration: 800, delay: 300, easing: cubicOut }}
      class="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <!-- Code Input Section -->
      <div class="p-8">
        <!-- Code Input Textarea -->
        <div class="relative mb-6">
          <textarea
            bind:value={inputCode}
            class="w-full h-52 p-5 bg-gray-50 border border-gray-200 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  resize-none shadow-sm transition-all duration-200
                  text-gray-800 font-mono text-sm leading-relaxed"
            placeholder="Describe what you want to generate..."
          ></textarea>
        </div>
        
        <!-- Generate Button -->
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            <span class="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
              Be specific for better results
            </span>
          </div>
          
          <button
            on:click={handleGenerate}
            disabled={isLoading || !inputCode.trim()}
            class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg 
                 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md
                 flex items-center justify-center min-w-[140px]
                 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-1"
          >
            {#if isLoading}
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Code
            {/if}
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Help Cards -->
  {#if isVisible}
    <div 
      in:fly={{ y: 30, duration: 800, delay: 500, easing: cubicOut }}
      class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-10"
    >
      <!-- Tip 1 -->
      <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-100 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mb-3 transform group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Be Specific</h3>
        <p class="text-gray-600 text-sm">
          Include details about language, features, and functionality for more accurate code generation.
        </p>
      </div>
      
      <!-- Tip 2 -->
      <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-green-100 hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-3 transform group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Review Output</h3>
        <p class="text-gray-600 text-sm">
          Check the generated code in the chat window and use it as a starting point for your project.
        </p>
      </div>
      
      <!-- Tip 3 -->
      <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-amber-100 hover:bg-amber-50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mb-3 transform group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Keep Chatting</h3>
        <p class="text-gray-600 text-sm">
          Continue the conversation in the chat to refine the code or ask follow-up questions.
        </p>
      </div>
    </div>
  {/if}
</div>
