# Verdict: NEEDS FIXES · Score 6/10

Deck Agent + Tool Use mavzusini alohida kiritadi va 16-slaydda recap qiladi, bu series qoidasiga mos. Lekin Markaziy Bank auditoriyasi uchun ohang hali haddan tashqari "agent o'zi bajaradi" tomonga ketgan: qaror huquqi, read/write tool chegarasi, inson tasdig'i, audit izi, owner va pilot mezoni boshidan ramkalanmagan. Shaky raqamlar (`1,243,500`, `856,000`, `100+`, `8 soat`, `5-10 sent`, `1%`) real benchmarkdek eshitiladi. Yakun ham bank qaror artefakti bilan emas, Q&A bilan tugaydi.

Punch-list:

- **Content accuracy:** "agent fikrlaydi", "agent o'zi o'ylab topadi", "agent matn ishlab chiqarmaydi - ish bajaradi" kabi jumlalar antropomorfik va nazoratsiz avtonomiya taassurotini beradi. Agentni "ruxsat berilgan asboblar bilan bosqich tanlaydigan tizim" deb berish kerak.
- **Governance fit:** Markaziy Bank kontekstida mijoz balansini ko'rsatishdan ko'ra nazorat savollari oldin turishi kerak: data class, ruxsat, read/write ajratish, audit log, eskalatsiya, risk owner, limit, rollback.
- **Atamalar coverage:** Agent + Tool Use slayd 5 da bor, recap slayd 16 da bor. Lekin Tool Use kiritilishida read tool / write tool farqi darhol aytilsin; screenshotda slayd 16 recap past kontrast va kichik, uni ko'rinarliroq qilish kerak.
- **Uzbek language quality:** "Hisobimda nechta pul?" -> "Hisobimda qancha mablag' bor?"; "qaerda" -> "qayerda"; "engil" -> "yengil"; "komplaens" yoki "muvofiqlik"dan bittasini tanlash; "bilolmaydi", "halok bo'ladi", "foydasiz" kabi og'zaki/qat'iy iboralarni yumshatish.
- **Vendor absolutism:** `Gemini, GPT, Claude` slaydda markaziy komponent sifatida turibdi. Vendor nomlari ikkinchi planga tushsin; tanlov mezonlari: data residency, auditability, access control, narx, integratsiya.
- **Numeric precision:** Demo raqamlar real bank ko'rsatkichi kabi ko'rinmasin. `DEMO_BALANCE`, "pilotda o'lchanadi", "taxminiy diapazon" va "manbaga qarab" formulalari bilan almashtirish kerak.
- **Decision artifact:** 15-slayddagi muhokama natijasi 1 sahifalik "Agent pilot qaror varaqasi"ga aylansin. Q&A shu artefaktdan keyin kelsin.

## Top 5 rewrites in Uzbek

1. **Agent ta'rifi: avtonomiya emas, nazoratli tizim**

   Almashtirish uchun:

   > **Agent** - LLM asosidagi yordamchi tizim. U vazifani bosqichlarga ajratadi, faqat ruxsat berilgan asboblar ro'yxatidan foydalanadi, natijani izohlaydi va belgilangan chegaradan chiqsa inson xodimiga uzatadi. Agent mustaqil qaror egasi emas; qaror huquqi, limit va javobgarlik bank siyosati bilan belgilanadi.

2. **Tool Use: read/write farqini darhol kiriting**

   Almashtirish uchun:

   > **Tool Use - asbobdan foydalanish.** AI tizimga ulangan ruxsatli asbobni chaqiradi: ma'lumot o'qish, hisob-kitob qilish, hujjatdan qidirish yoki xabar loyihasini tayyorlash. Bankda tool'lar ikki guruh: **read tool** - faqat o'qiydi; **write tool** - tizimga ta'sir qiladi va odatda inson tasdig'ini talab qiladi.

3. **Demo misol: aniq balans raqamlarini xavfsizroq qiling**

   Almashtirish uchun:

   > Mijoz: "Hisobimda qancha mablag' bor?"  
   > Agent: "Bu savolga jonli ma'lumot kerak. Avval foydalanuvchi autentifikatsiyasi va ruxsatini tekshiraman, keyin `balance_check` read tool'ini chaqiraman."  
   > Javob: "Demo hisob bo'yicha qoldiq topildi. Real tizimda bu raqam faqat ruxsat, audit log va kanal xavfsizligi tasdiqlangandan keyin ko'rsatiladi."

4. **Vendor nomlari o'rniga bank tanlov mezonlari**

   Almashtirish uchun:

   > **Miya · LLM** - vazifani tushunadigan va keyingi qadamni tanlashga yordam beradigan til modeli. Muayyan vendor keyin tanlanadi: ma'lumot qayerda saqlanishi, audit imkoniyati, ruxsat nazorati, narx va bank tizimlari bilan integratsiyaga qarab.

5. **Yakun: bank qaror artefakti bilan tugating**

   Q&A oldidan yangi closing artefakt:

   > **Agent pilot qaror varaqasi**  
   > 1. Vazifa: qaysi takrorlanadigan ish agentga beriladi?  
   > 2. Owner: qaysi bo'lim javobgar?  
   > 3. Tool'lar: qaysilari read, qaysilari write?  
   > 4. Chegara: agent nimalarni qila olmaydi?  
   > 5. Tasdiq: qaysi qadamda inson tasdig'i shart?  
   > 6. Audit: qaysi loglar saqlanadi va kim ko'radi?  
   > 7. Pilot metrikasi: vaqt, xato, eskalatsiya va kutish vaqti qanday o'lchanadi?  
   > 8. Qaror: RAG yetarlimi, agent pilotga tayyormi yoki jarayon avval tartibga keltiriladimi?

Closing line:

> Bugungi natija: har bir stol bitta agent nomzodini shu qaror varaqasiga joylaydi. Agar owner, tool, tasdiq va audit aniq bo'lmasa - bu agent pilotga tayyor emas.
