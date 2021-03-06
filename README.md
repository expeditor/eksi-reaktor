# Ekşi Reaktör
[ekşisözlük](https://eksisozluk.com) deneyimini iyileştirmek için faydalı bir Chrome uzantısı.
Bu aralar pek zaman bulamadığımdan gelişim pek olmayabilir. Düzeltmeler gerekirse en kısa zamanda yapmaya çalışacağım.

![Ekşi Reaktör ekran görüntüsü](https://i.imgur.com/fHVIzF8.png)

  - Sol frame'de istemediğiniz kelimeleri gözlerden ırak tutabilir.
  - Entrylerin arasına karışan reklam başlığını engeller.
  - Dikkat dağıtmasını engellemek için sol frame'i gizleyebilir.
  - Konulu videoları da gizleyebilir.
  - Hatta konulu videolarda 59saniye yerine Youtube da kullanabilir.
  - Üşengeçler için troll'lere eklemeyi kolaylaştırır.
  - Sağ tık menüde seçili kelimeyi ekşi'de aramak için menü seçeneği.
  - Badi entrylerini ve şükela modunu başlık altındaki araştır menüsünün hizasına alır.
  - Üst menüyü sabitleme imkânı.
  - Otomatik olarak her zamanki görünüme döndürür.
  - **Odaklanma modu** ile sayfadaki dikkat dağıtan şeyler ortadan kaldırılır.
  - Araştır menüsü sağ tarafa eklendi.
  - Neler dönmüş serhat modu. Popüler'in sağındaki **24saat** ile sadece bugünün en çok entry girilen başlıkları doluluk sırasına göre listeliyor.


### Kelime filtresi
Sol frame için kelime sansürünü açayım: [jiddu krişnamurti](https://eksisozluk.com/jiddu-krisnamurti--94693) başlığını ele alalım. Mesela `nam` kelimesini sansürlediğimiz takdirde `jiddu krişnamurti` içinde `nam` olduğundan dolayı sol frame'den uçurulacaktır. Belki ilerleyen zamanlarda, talep olursa daha gelişmiş filtreler eklenebilir. `meltem banko` gibi birden fazla kelime için de aynı şekilde çalışır.

Eğer `regex` biliyorsanız, şöyle kullanablisiniz. Bayrakları kullanmak için `kelime/i` formatında yazabilirsiniz. Eğer bayrak kullanmayacaksınız sadece pattern'i  yazmanız yeterli.

`Tam kelime eşleme` için şu formatı kullanabilirsiniz: `kelime\b`

Regex'i daha gelişmiş filtreler hazırlamak için bilmeseniz de kolay bir şekilde öğrenebilirsiniz.

### Troll
Bazı yazarları sadece bir entrysinden yola çıkarak bile, çok uzatmadan trollere eklemek:
![hızlı trolllere gönderim](http://i.imgur.com/shYlt7X.png)

### 59saniye
Konulu videolar genellikle gereksiz içerikler, lüzumsuz önerilerle karşımıza çıkıyor. Bunu tamamen ortadan kaldırabilir, ya da başlıkla ilişkili en uygun YouTube videosunu getirebilir. Özellikle müzik başlıklarında oldukça faydalı olacaktır. Eğer youtube'daki başlıkla alakalı bir video bulunamazsa, 59saniye içeriğini görünmesine izin veriyor.

# Kurulum

[Chrome Web Store](https://chrome.google.com/webstore/detail/ek%C5%9Fi-reakt%C3%B6r/lijejpanomegahjfjepnnkdlfipkddaa)'dan kurulum için [burayı kullanabilirsiniz](https://chrome.google.com/webstore/detail/ek%C5%9Fi-reakt%C3%B6r/lijejpanomegahjfjepnnkdlfipkddaa?hl=tr&gl=TR).

### Bilinen sorunlar
- 24saat ile erişilen başlıklarda, trollere eklediğiniz yazarların entryleri de görüntüleniyor.

### Sürüm değişiklikleri
- **v1.3.8**:
 - Sözlükle ilgili düzeltmeler.
- **v1.3.8**:
 - Bazı başlıklarda yukarıda gösterilen videoları da YouTube ile değiştir. [3](https://github.com/expeditor/eksi-reaktor/pull/3)
- **v1.3.7**:
 - [kyzn](https://github.com/kyzn)'in youtube-konulu düzeltmeleri. [1](https://github.com/expeditor/eksi-reaktor/pull/1) [2](https://github.com/expeditor/eksi-reaktor/pull/2)
 - Alışılmış olarak sıkça kullanılan badi konumunun yerine geçtiğinden dolayı 24saat'i badinin sağına aldım.
 - 24saat ile ilgili bir sorun düzeltildi.
- **v1.3.6**:
 - araştır'daki ufak bir hata giderildi.
 - 24saat ile sadece bugünün en çok entry girilen başlıkları sıralanıyor. (neler dönmüş serhat modu)
- **v1.3.5**:
 - Sansürlenesi kelimeler `onkeyup` düzeltmesi.
- **v1.3.4**:
 - Seçeneklerde yapılan değişikleri otomatik olarak kaydet.
 - Başlıklarda **araştır** seçenekleri.
- **v1.3.3**:
 - Üst menüyü sabitleme.
 - Otomatik her zamanki görünüm.
 - Odaklanma modu.
- **v1.3.1**:
 - Regex'te düzeltme ve flag desteği.
- **v1.3**:
 - Sağ tık menü'ye seçili kelimeyi ekşi'de aramak için seçenek
 - Şükela modu ve badi entrylerini görünür yere al.
- **v1.2**:
 - Sol frame sansürü için regex desteği.
- **v1.1**:
 - Entry yanındaki diğer menüsüne troll seçeneği.
- **v1.0**:
 - İlk sürüm.

### Krediler
- [Ekşi Sözlük Sol Frame Kaldırgacı](https://chrome.google.com/webstore/detail/ek%C5%9Fi-s%C3%B6zl%C3%BCk-sol-frame-kal/kahiifbhglbbanbmkkgklfccicbglcjl)
- [EksiTube](https://github.com/metude/eksitube)
- [EkşiSözlük Troll Butonu](https://chrome.google.com/webstore/detail/ek%C5%9Fi-s%C3%B6zl%C3%BCk-troll-butonu/lhgmmdnlaoppjfbjgdhokcipogmgcfcc)
- [Logo](http://www.iconarchive.com/show/windows-8-icons-by-icons8/Industry-Nuclear-Power-Plant-icon.html)
- [Her zamanki görünüm](https://chrome.google.com/webstore/detail/ek%C5%9Fi-s%C3%B6zl%C3%BCk-her-zamanki-g/bmakpbbnljjdagpiajcojpmbcpmpijld)
-[kyzn](https://github.com/kyzn): [1](https://github.com/expeditor/eksi-reaktor/pull/1) [2](https://github.com/expeditor/eksi-reaktor/pull/2)
