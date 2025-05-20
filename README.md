# AI Paralel Projesi

This web application was created as a homework project for the Paralel Programlama course. It demonstrates how artificial intelligence can be used to generate code based on simple descriptions.

## Proje Tanımı

AI Paralel, yapay zeka destekli kod üretimi sağlayan modern bir web uygulamasıdır. Kullanıcıların doğal dil ile tanımladıkları programlama görevlerini, yapay zeka teknolojisi kullanarak otomatik olarak işlevsel ve optimize edilmiş kod parçalarına dönüştürür. Özellikle paralel programlama konusunda uzmanlaşarak, geliştiricilerin daha hızlı ve verimli çalışmalarını sağlamayı hedeflemektedir.

## Özellikler

- Doğal dil kullanarak kod üretimi
- Etkileşimli sohbet arayüzü ile kod optimize etme
- Kod parçalarını otomatik biçimlendirme ve vurgulama
- Yazılan kodları panoya kolayca kopyalama
- Modern ve kullanıcı dostu arayüz
- Responsive tasarım (tüm cihazlarla uyumlu)

## Proje Yapısı

- `/Paralel` - Frontend uygulaması (Svelte, Tailwind CSS, Vite)
- `/back` - Backend uygulaması (Node.js)

## Teknolojik Altyapı

### Frontend

- **Svelte**: Hızlı ve reaktif kullanıcı arayüzü için derleyici tabanlı JavaScript framework
- **Tailwind CSS**: Modern ve duyarlı tasarım için faydalı CSS framework
- **Vite**: Hızlı geliştirme ve derleme için modern build aracı

### Backend

- **Node.js/Express**: Sunucu tarafı API sağlamak için
- **OpenAI API**: GitHub AI modelleriyle iletişim kurarak kod üretmek için

## Kurulum Talimatları

### Frontend

```bash
cd Paralel
npm install
npm run dev
```

### Backend

```bash
cd back
npm install
npm start
```

## Uygulamanın Çalışma Prensibi

1. Kullanıcı arayüzdeki metin alanına doğal dilde ne tür bir kod istediğini yazar ("Python kullanarak iki diziyi paralel işleyen bir fonksiyon yaz" gibi)
2. Bu istek backend API'sine gönderilir
3. Backend, isteği OpenAI/GitHub AI modellerine iletir
4. Model, isteğe uygun kodu üretir ve düzenli biçimlendirilmiş olarak geri döndürür
5. Sonuç, kullanıcı arayüzünde görüntülenir ve etkileşimli bir sohbet arayüzü aracılığıyla kodu optimize etmek için ek sorular sorulabilir

## Kod Yapısı ve Önemli Bileşenler

### Backend

- `index.js`: Ana sunucu dosyası, Express yapılandırması ve API rotaları
- `chatAiHelper.js`: OpenAI API ile iletişim kuran ve kod üretimini yöneten kontrolör
- `config.env`: Ortam değişkenleri ve API anahtarları

### Frontend

- `App.svelte`: Ana uygulama bileşeni ve sayfa düzeni
- `CodeGenerator.svelte`: Kod üretimi için kullanıcı arayüzü
- `ChatWindow.svelte`: AI ile etkileşim için sohbet penceresi
- `lib/Stores.js`: Svelte store'ları kullanarak durum yönetimi

## Proje Hedefleri

1. Geliştiricilere paralel programlama görevlerinde hızlı ve etkili bir yardımcı sunmak
2. Yeni başlayanlar için paralel programlama kavramlarını öğrenmede kolaylaştırıcı bir araç olmak
3. Modern web teknolojileri ile yapay zeka entegrasyonunu göstermek
4. Kullanıcı dostu ve erişilebilir bir arayüz tasarlamak

## Gelecek Geliştirmeler

- Kullanıcı hesapları ve önceki kod üretimlerini kaydetme özelliği
- Kod çalıştırma ve test etme imkanı
- Birden fazla programlama dili desteği
- GitHub entegrasyonu
