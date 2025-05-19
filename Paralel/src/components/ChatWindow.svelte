<script lang="ts">
  import {
    chatVisible,
    chatMessages,
    codeGeneratorInput,
    codeGeneratorOutput,
  } from "../lib/Stores";
  import { fade, slide } from "svelte/transition";
  import TypingText from "../lib/TypingText.svelte";
  import CopyButton from "../lib/CopyButton.svelte";

  let newMessage = "";
  let chatContainer: HTMLDivElement;
  
  // Function to process message content and format code blocks
  function processMessageContent(content) {
    // Check if content has code blocks with ```
    if (content.includes("```")) {
      // Replace code blocks with HTML
      return content.replace(/```(?:\w+)?\n([\s\S]*?)```/g, 
        (match, code) => {
          return `<div class="code-block">
                    <pre><code>${code}</code></pre>
                  </div>`;
        }
      );
    }
    
    // Special case for initial code generation
    if (content === $codeGeneratorOutput && isLikelyCode(content)) {
      return `<div class="code-block">
                <pre><code>${content}</code></pre>
              </div>`;
    }
    
    return content;
  }
  
  // Check if content is likely code
  function isLikelyCode(content) {
    const codePatterns = [
      /function\s+\w+\s*\(/,
      /class\s+\w+/,
      /const\s+\w+\s*=/,
      /let\s+\w+\s*=/,
      /var\s+\w+\s*=/,
      /if\s*\(.+\)\s*{/,
      /for\s*\(.+\)\s*{/,
      /while\s*\(.+\)\s*{/,
      /^\s*import\s+.+from/m,
      /^\s*def\s+\w+\s*\(/m,
      /^\s*public\s+\w+/m
    ];
    
    return codePatterns.some(pattern => pattern.test(content));
  }

  // When chat opens, add the initial message from CodeGenerator
  $: if ($chatVisible && $codeGeneratorInput && $chatMessages.length === 0) {
    $chatMessages = [
      {
        type: "user",
        content: $codeGeneratorInput,
        timestamp: new Date(),
      },
    ];
    // Simulate AI response
    setTimeout(() => {
      $chatMessages = [
        ...$chatMessages,
        {
          type: "ai",
          content: $codeGeneratorOutput,
          timestamp: new Date(),
        },
      ];
    }, 1000);
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;

    const input = { prompt: newMessage.trim() };
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) return console.log("error from the backend ");

    const data = await res.json();

    $chatMessages = [
      ...$chatMessages,
      {
        type: "user",
        content: newMessage,
        timestamp: new Date(),
      },
    ];

    // Simulate AI response
    $chatMessages = [
      ...$chatMessages,
      {
        type: "ai",
        content: data.data.response,
        timestamp: new Date(),
      },
    ];

    newMessage = "";
  }
  
  // Copy function for the small button
  function copyContent(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Could add a small notification here
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

  function closeChat(): void {
    $chatVisible = false;
    $chatMessages = [];
    $codeGeneratorInput = "";
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  $: if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  transition:fade
>
  <div
    class="bg-white w-full max-w-2xl rounded-lg shadow-2xl flex flex-col"
    transition:slide
  >
    <!-- Header -->
    <div class="p-3 border-b flex justify-between items-center">
      <h3 class="text-base font-medium text-gray-700">AI Assistant</h3>
      <button
        on:click={closeChat}
        class="text-gray-500 hover:text-gray-700"
        type="button"
      >
        ✕
      </button>
    </div>

    <!-- Chat Messages -->
    <div
      bind:this={chatContainer}
      class="flex-1 p-4 overflow-y-auto max-h-[600px] space-y-4"
    >
      {#each $chatMessages as message}
        <div
          class={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            class={`max-w-[85%] rounded-lg p-3 text-sm group relative ${
              message.type === "user"
                ? "bg-blue-100 text-gray-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {#if message.type === "user"}
              {message.content}
            {:else}
              <!-- AI message with possible code blocks -->
              <div class="relative">
                {#if isLikelyCode(message.content) && message.content === $codeGeneratorOutput}
                  <!-- For initial code generation -->
                  <div class="bg-gray-800 rounded overflow-hidden mb-2">
                    <div class="text-xs text-gray-400 px-3 py-1 bg-gray-900 border-b border-gray-700">Code</div>
                    <pre class="p-3 text-gray-200 font-mono text-xs overflow-x-auto whitespace-pre"><code>{message.content}</code></pre>
                  </div>
                {:else}
                  <!-- For mixed content -->
                  {#if message.content.includes("```")}
                    <!-- Process markdown code blocks -->
                    {#each message.content.split(/```(?:\w+)?\n([\s\S]*?)```/) as part, i}
                      {#if i % 2 === 0}
                        <!-- Regular text -->
                        <div class="mb-2">{part}</div>
                      {:else}
                        <!-- Code block -->
                        <div class="bg-gray-800 rounded overflow-hidden mb-2">
                          <div class="text-xs text-gray-400 px-3 py-1 bg-gray-900 border-b border-gray-700">Code</div>
                          <pre class="p-3 text-gray-200 font-mono text-xs overflow-x-auto whitespace-pre"><code>{part}</code></pre>
                        </div>
                      {/if}
                    {/each}
                  {:else}
                    <!-- Regular text -->
                    <TypingText text={message.content} speed={30} />
                  {/if}
                {/if}
                
                <!-- Small copy button -->
                <button 
                  on:click={() => copyContent(message.content)}
                  class="absolute bottom-[-20px] left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-0.5 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                  </svg>
                  Copy
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Input Area -->
    <div class="p-3 border-t">
      <div class="flex space-x-2">
        <input
          type="text"
          bind:value={newMessage}
          placeholder="Type a message..."
          class="flex-1 p-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          on:keydown={handleKeydown}
        />
        <button
          on:click={sendMessage}
          type="button"
          class="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Styling for code blocks */
  :global(.code-block) {
    margin: 0.5rem 0;
    background-color: #1e1e1e;
    border-radius: 0.25rem;
    overflow: hidden;
  }
  
  :global(.code-block pre) {
    margin: 0;
    padding: 0.75rem;
    overflow-x: auto;
  }
  
  :global(.code-block code) {
    font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    color: #d4d4d4;
    line-height: 1.5;
  }
</style>
