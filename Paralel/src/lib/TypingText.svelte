<script>
  export let text = "";
  export let speed = 50;

  let displayedText = "";
  let index = 0;

  $: if (text) {
    index = 0;
    displayedText = "";
    typeText();
  }

  function typeText() {
    if (index < text.length) {
      displayedText += text[index];
      index++;
      setTimeout(typeText, speed);
    }
  }
</script>

<span>{displayedText}</span>
