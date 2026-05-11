# Codex review — 12-deck

## Verdict + Score 8/10

Deckning katta arki to'g'ri: 9-moduldagi oddiy klassifikator botni "ishlaydi" holatidan production-readiness tahliliga olib chiqadi. Pipeline, logging, replay, branching, cost va idempotency bitta real bot atrofida bog'langani Markaziy Bank auditoriyasi uchun foydali.

Ship qilish mumkin, lekin deliverydan oldin 5 ta punch-listni tuzatish kerak. Eng muhim muammo: deck ba'zi joylarda 9-modul botida allaqachon log/replay/idempotency bor degandek eshitiladi. README bo'yicha bu bot demo darajada: 7 main node, no state machine, no admin commands, no vector store; production xususiyatlari 12-modulda tahlil qilinib, qo'shilishi kerak.

## Punch-list

1. **Content accuracy + governance fit**
   - Slide 7 lead: "Har biri alohida log qoldiradi, alohida qayta ishga tushadi" hozirgi deck-9 botga nisbatan aniq emas. Buni "production versiyada shunday bo'lishi kerak" deb qayta yozing.
   - Slide 9 log misolida `chat_id`, user name, matn, operator telefoni ochiq ko'rinadi. Bank kontekstida buni audit log deb bersangiz, yoniga "log access control, retention, PII masking" shartlarini qo'shing.
   - Slide 11 speaker notesdagi aniq Gemini narxlari tez eskiradi. 2026-05-11 holatida Google rasmiy pricing sahifasida Gemini 3.1 Flash-Lite va Pro Preview token narxlari boshqacha tuzilmada berilgan; deckda "$0.005 vs $0.0005"ni delivery oldidan tekshirish yoki "nisbiy: Flash arzonroq" shakliga o'tkazish kerak.
   - Gemini/free-tier ishlatilsa data governance savoli chiqadi: Google rasmiy pricing sahifasida Free tier content mahsulotlarni yaxshilash uchun ishlatilishi mumkinligi, Paid tierda esa ishlatilmasligi ko'rsatilgan. Bank production uchun "paid/enterprise + tasdiqlangan yopiq kontur" eslatmasi kerak.

2. **Atamalar coverage**
   - Pipeline va Idempotent design slide 5 da rasmiy kiritilgan, slide 17 da recap bor. Bu CLAUDE.md talabiga mos.
   - Slide 4 esa "Idempotent"ni slide 5 dan oldin benefit sarlavhasi sifatida ochib yuboradi; notes esa "hozirgi slaydda atalmaydi" deydi. Slide 4 sarlavhasini "Takrorlansa ham xavfsiz" qiling, slide 5 da rasmiy atamani kiriting.
   - Terminologiyani bir xil tuting: "Idempotent design" rasmiy atama, Uzbek matnda "idempotent dizayn" yoki "takror ishlasa ham bitta natija" deb izohlang. "Idempotency"ni faqat texnik izohda qoldiring.

3. **Pipeline-analysis tone**
   - Deck tonu "bizning 7-node botimiz productionga yaqin" degandan ko'ra "demo botni production tekshiruvidan o'tkazamiz" bo'lishi kerak.
   - Slide 14 bug-hunt juda kuchli, lekin javobda asl sababni aniqroq ajrating: Sheets append 500 vaqtinchalik xato; mijozga 3 xat ketishining production sababi esa send bosqichida idempotent key yo'qligi.
   - Cost slaydda model fallbackdan tashqari branching cost ham ko'rinsin: high urgency branch qo'shimcha notification/SMS xarajatini, low urgency branch esa arzonroq kanalni ishlatadi.

4. **Uzbek language quality**
   - "Promt" ketma-ket ishlatilgan; series convention shunday bo'lsa qoldiring, lekin "prompt engineering" kabi inglizcha izohlarni Uzbek gap ichida kamaytiring.
   - "retry exponential backoff" bankir auditoriyasi uchun ortiqcha. "3 marta kutib qayta urinish" yetarli.
   - "validatsiyasi" o'rniga "qat'iy tekshirish"; "sotsial xato" o'rniga "mijoz tajribasidagi xato" yoki "ishonchga zarar" tabiiyroq.
   - Speaker notesdagi "magic word", "ops qismi", "crash" kabi iboralarni delivery tiliga moslang: "audit uchun tanish savol", "ishlashni kuzatish", "tizim to'xtasa".

5. **Cross-references**
   - Back to deck 9 yaxshi ishlaydi: Classification, Schema, Operators/Applications, 7-node flow qayta ishlatilgan.
   - Forward to deck 13 bor, lekin kuchsiz. Closingda 13-modulga "real bank keyslarida shu 5 production savolni tekshiramiz: idempotency, logging, error handling, branching, cost" deb ko'prik qiling.
   - Deck 14 cross-ref hozir bor, lekin user so'rovi deck 13 casesga urg'u bergan. Slide 17da 13-modulni alohida kuchaytirib, 14-modulni ikkinchi darajada qoldiring.

## Top 5 rewrites in Uzbek

1. **Slide 7 lead**
   - Hozir: "Har biri alohida log qoldiradi, alohida qayta ishga tushadi."
   - Rewrite: "9-modulda bu 7 bosqichli demo flow edi. Production versiyada har bosqich log qoldirishi, xato bo'lsa shu joydan qayta davom etishi kerak."

2. **Slide 4 benefit 3**
   - Hozir: "Idempotent — bir mijoz xabarini 2 marta yuborsa ham..."
   - Rewrite: "Takrorlansa ham xavfsiz — bir mijoz xabari qayta kelsa ham Applications'da bitta yozuv qoladi, mijozga ortiqcha xat ketmaydi. Keyingi slaydda buni 'Idempotent design' deb nomlaymiz."

3. **Slide 8 Sheets error**
   - Hozir: "3 marta retry exponential backoff · oxirida fallback..."
   - Rewrite: "3 marta kutib qayta urinish · o'tmasa, mijozga 'operator keyinroq biriktiriladi' degan xavfsiz javob."

4. **Slide 11 cost note**
   - Hozir: "Gemini Pro 1 ta klassifikatsiya uchun ~$0.005; Flash — ~$0.0005..."
   - Rewrite: "Aniq narx delivery kuni rasmiy pricingdan tekshiriladi. Asosiy qoida o'zgarmaydi: oddiy tasniflashni arzon modelda qiling, murakkab holatdagina kuchli modelga o'ting."

5. **Slide 17 closing bridge**
   - Hozir: "13-modulda real bank keyslari..."
   - Rewrite: "13-modulda real bank keyslarini shu checklist bilan o'qiymiz: qayerda pipeline bor, qayerda log bor, retry idempotentmi, branch biznes qoidasiga bo'ysunadimi, xarajat nazoratdami?"
