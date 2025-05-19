// Gerekli modüllerin içe aktarılması
// Express: Web sunucusu oluşturmak için
// Dotenv: Ortam değişkenlerini yönetmek için
const express = require("express");
const dotenv = require("dotenv");

// Ortam değişkenlerini config.env dosyasından yükle
dotenv.config({ path: "./config.env" });

// Yapay zeka yardımcısı kontrol modülünü içe aktar
const chatController = require("./controllers/chatAiHelper");

const app = express();

// CORS (Kaynaklar Arası Kaynak Paylaşımı) ayarları
// Bu, frontend'in farklı bir domain'den backend'e erişmesine izin verir
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Tüm kaynaklardan erişime izin ver
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // İzin verilen HTTP metotları
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // İzin verilen başlıklar

  // OPTIONS istekleri için hemen yanıt döndür
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next(); // Sonraki middleware'e devam et
});

// JSON isteklerini işlemek için middleware (10kb boyut sınırı ile)
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Mouad AI app",
  });
});

// Chat endpoint'i - Kullanıcı isteklerini AI'ya iletir ve yanıtları döndürür
// Kullanıcı doğal dilde bir istek gönderir ve AI kodu üretir
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        status: "error",
        message: "Prompt is required",
      });
    }
    // İsteği AI işleyici fonksiyonuna gönder ve yanıtı bekle
    // Bu adım, kullanıcının isteklerini AI modeline iletir ve kod üretir
    const response = await chatController.processChatRequest(prompt);

    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    console.error("Error processing chat request:", error);

    res.status(500).json({
      status: "error",
      message:
        error.message || "An error occurred while processing your request",
    });
  }
});

// 404 Hata Yakalayıcı - Tanımlanmamış rotalar için
// Kullanıcı geçersiz bir URL'ye istek yaparsa bu middleware çalışır
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

// Sunucuyu belirtilen port üzerinde başlat
// Ortam değişkeninden port numarasını alır veya varsayılan olarak 3000 kullanır
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// İşlenmeyen Promise reddetmelerini yakala
// Bu, uygulamanın beklenmeyen hatalar nedeniyle çökmesini önler
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);

  // Sadece geliştirme ortamında uygulamayı sonlandır
  if (process.env.NODE_ENV === "development") {
    process.exit(1);
  }
});
