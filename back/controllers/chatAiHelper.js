// OpenAI kütüphanesini içe aktar - AI modellerine erişmek için kullanılır
const OpenAI = require("openai");

// GitHub AI'ya erişim için gereken kimlik bilgileri ve parametreler
const token = process.env.GITHUB_TOKEN; // GitHub API token'i (.env dosyasından okunur)
const endpoint = "https://models.github.ai/inference"; // GitHub AI API'sinin URL'si
const model = "openai/gpt-4.1"; // Kullanılacak yapay zeka modeli


// Ana işlev: Kullanıcı mesajlarını işler ve yapay zeka yanıtlarını oluşturur
// Bu fonksiyon, kullanıcının gönderdiği metni alır ve yapay zeka modelinden kod üretir
exports.processChatRequest = async (prompt) => {
  // Girdi doğrulamaları - kullanıcı girdisinin geçerli olduğundan emin olur
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Invalid input: Prompt must be a non-empty string");
  }

  // Maksimum uzunluk kontrolü - çok uzun istekler reddedilir
  if (prompt.length > 4000) {
    throw new Error(
      "Invalid input: Prompt exceeds maximum length (4000 characters)"
    );
  }

  // Kullanıcı girdisini temizleme - başındaki ve sonundaki boşlukları kaldırır
  const sanitizedPrompt = prompt.trim();

  // OpenAI istemcisini oluştur - GitHub AI API'sine bağlanmak için kullanılır
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  try {

    // Yapay zeka davranış talimatları - AI'nın nasıl yanıt vermesi gerektiğini belirler
    // Bu mesaj, AI'ya kod yazarken takip etmesi gereken kuralları verir
    const systemMessage = `You are a helpful coding assistant. When generating code:
1. Always put code in Markdown code blocks using triple backticks and include the language name
2. Format code cleanly with proper indentation
3. Add brief comments to explain key parts
4. Keep explanations clear and concise
5. Example of proper code formatting:
\`\`\`javascript
function example() {
  // Your code here
  return result;
}
\`\`\``;

    // Kullanıcı sorusunu talimatlarla birlikte AI'ya gönder
    // Bu adım, sistem mesajını ve kullanıcı istemini birleştirerek AI'dan yanıt ister
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: sanitizedPrompt },
      ],
      temperature: 0.7,
      top_p: 0.95,
      model: model,
    });

      // AI'nın yanıtını al ve geri döndür
      // choices[0] ilk (ve genellikle tek) yanıtı temsil eder, message.content ise metin içeriğidir
    return response.choices[0].message.content;
  } catch (err) {
    // Çeşitli API hatalarını yönetme ve kullanıcı dostu hata mesajları oluşturma
    if (err.status === 429) {
      // Hız sınırı aşıldı (bir dakikada çok fazla istek)
      console.error("Rate limit exceeded:", err);
      throw new Error(
        "Service is currently experiencing high demand. Please try again later."
      );
    } else if (err.status === 401 || err.status === 403) {
      // Kimlik doğrulama hatası - API anahtarı geçersiz veya yetkisiz
      console.error("Authentication error:", err);
      throw new Error(
        "Authentication failed. Please check your API credentials."
      );
    } else {
      // Diğer tüm hatalar için genel hata mesajı
      console.error("Error processing chat request:", err);
      throw new Error("Failed to process your request. Please try again.");
    }
  }
};
