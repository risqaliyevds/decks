# Kirish

Assalomu alaykum, hurmatli hamkasblar. Tushlikdan keyin biz to'qqizinchi modulda klassifikator botni o'z qo'limiz bilan qurgan edik — Telegram, Gemini, Sheets bilan, n8nda o'n uchta nodedan iborat. Endi savol: bu botni qanday qilib "doim ishlaydigan" tizimga aylantirish mumkin? Bugungi modulning markaziy mavzusi shu.

O'n ikkinchi modulning o'ziga xosligi shu — birinchi modul bo'lib biz xato qilishni va xatoni topishni maxsus o'rganamiz. Bu modul "tayyor mahsulot" ko'rsatish uchun emas, "buzilgan tizim" tushunchasi uchun. Bankirlar uchun bu juda muhim, chunki real ish jarayonida xato yuz beradi, va biz uni topib, tuzata olishimiz kerak. Olmish daqiqa pipeline ham, debug ham — tayyormisiz?

Olmish daqiqani biz to'rt fazaga bo'lamiz. Birinchi qism, taxminan o'n uch daqiqa — pipeline tushunchasi: nima uchun bitta promt yetmaydi, bosqichlarga bo'lish nima beradi, va idempotent dizayn nima. Ikkinchi qism, to'qqiz daqiqa — to'qqizinchi modulda qurgan klassifikatorni production darajasiga olib chiqamiz, yetti bosqichni bittama-bitta tahlil qilamiz. Uchinchi qism, eng katta — o'n sakkiz daqiqa — debugging: logging, replay, narx optimizatsiyasi va branching. To'rtinchi qism, o'n yetti daqiqa — real bug-hunt mashqi, debug checklist, production tayyorligi, yakun va savol-javob.

Bu modul boshqalardan biroz farq qiladi: nazariya kam, real misollar va debugging ko'p. Dasturchilar buni "ops" qismi deb atashadi — bizda esa bu bankirlar uchun ish jarayoni boshqaruvi. Tayyor bo'lsangiz, boshlaymiz.

# Pipeline nima va nega kerak

Eng oddiy savoldan boshlaylik. Klassifikator botingizga "matnni o'qi, tasnifla, operator tanla, Sheetsga yoz, mijozga javob ber" deb bitta promt yozsangiz nima bo'ladi? Birinchi qarashda eng oson yo'lga o'xshaydi. Lekin debug qila olmaysiz. Xato qayerda ekanini bilmaysiz. Qayta ishga tushirsangiz mijozga ikkita xat yuboradi.

Birinchi yondashuvni qora quti deyish mumkin. Hammasi bir oynada: xabar kirdi, Gemini "tushun, tasnifla, operator top, ariza yoz, javob ber" deyiladi — bitta uzun promt. Xato yuz berdi. Qaysi bosqichda? Bilmaymiz. Qayta yuborsak takrorlanadi. Bu — ko'p texnologik kompaniyalarning xatosi. Bizda esa bu xatosi qimmat. Mijozga ikki tasdiq xati ketishi — muvofiqlik muammosi, ishonch yo'qoladi.

Ikkinchi yondashuv — yetti bosqichli pipeline. Har bosqich alohida. Xabar, tasniflash, operatorlar ro'yxatini o'qish, operator tanlash, ariza yozish, javob shakllantirish, yuborish. Har bosqich log qoldiradi, alohida qayta ishga tushadi. Xato beshinchi bosqichda — faqat shu bosqichdan qaytadan ishlatamiz, oldingi natijalar saqlanib qoladi. Tekshiruvchan, idempotent. To'qqizinchi modulda biz qurgan bot allaqachon yetti nodedan iborat — bu tasodif emas. Endi tushuntiramiz nima uchun shunday qildik. Audit'oriyaga qarayman: kim "men ham bitta promtda yozardim" der ekan? Yo bo'lmasa, "yo'q, bo'laklash kerak"?

Endi pipelinening uchta amaliy sababini ko'raylik. Birinchisi — aniqroq. Har bosqich bitta vazifa qiladi. LLM faqat tasniflaydi, Code faqat operator tanlaydi. Promtlar qisqaradi, sifat ortadi. Beshinchi modulda prompt engineering darsida ko'rganmiz: promt qancha qisqa va aniq bo'lsa, LLM shuncha yaxshi javob beradi. LLMda xato bo'lsa — to'xtatamiz, Sheetsda xato bo'lsa — qayta urinib ko'ramiz, har biri uchun alohida strategiya.

Ikkinchi sabab — tekshiruvchan. Har bosqichdan keyin natija saqlanadi. Buzilgan joyni logdan topish mumkin. Bu bankirlar uchun magic word: tekshiruvchan. Muvofiqlik, audit, "kim nima qildi" savollari ish jarayonining ajralmas qismi. Muvofiqlik auditori "qaysi qadamda toifa aniqlandi?" deb so'rasa, besh sekundda javob bo'ladi.

Uchinchi sabab — takrorlansa ham xavfsiz. Bir mijoz xabari qayta kelsa ham Applicationsda bitta yozuv qoladi, mijozga ortiqcha xat ketmaydi. Misol: message_id orqali tekshiruv. Bu fazilatning rasmiy nomi bor, keyingi slaydda atalaymiz.

Endi modulning markaziy ikki atamasiga keldik. Bu atamalar bugundan keyin qayta-qayta uchraydi.

Birinchi atama — Pipeline. Bankir tilida: ko'p bosqichli AI zanjiri. Bir vazifani bir nechta ketma-ket bosqichga bo'lish. Har bosqich alohida promt yoki dastur, har bosqich log qoldiradi. Bank misol: klassifikator botda Telegram, LLM, Sheets read, operator tanlash, ariza yozish, javob — yetti bosqich. Sodda analogiya: pipeline — bu zanjir. Suv quvuri kabi: kran ochildi, suv besh filtrdan o'tib, kranga keladi. Har filtri o'z ishini qiladi.

Ikkinchi atama — Idempotent design. Bankir tilida: qayta ishga tushirilsa ham xatosiz. Bir xil kirish — bir xil chiqish. Bir mijoz xabarini o'n marta yuborsangiz, Applicationsda bitta ariza yoziladi. Mijozga bitta xat ketadi. Mexanizm: har xabarga unique message_id beriladi, ishlangan IDlar saqlanadi. Sodda analogiya: idempotent so'zi lotinchadan keladi — "idem" bir xil, "potens" kuch. Ya'ni: bir marta bossangiz ham, o'n marta bossangiz ham — natija bir xil. Liftning o'n nechi tugmasini besh marta bossangiz, ellikinchi qavatga chiqmaysiz. Bitta marta tugma — bitta amal. Yodda tutib turing, oxirida birga aytamiz.

Endi idempotency real misolda. Mijoz Telegramga "Avtokredit kerak" deb yubordi, tarmoq uzildi. Telegram "kelmadi" deb o'yladi va qayta yubordi. Idempotent emas tizimda: birinchi xabar keldi, ariza A-001 yozildi, operatorga bildirishnoma ketdi, mijozga "qabul qilindi" xati ketdi. O'sha daqiqa xabar yana keldi (retry) — ariza A-002 yozildi, ikkinchi operatorga bildirishnoma ketdi, mijozga yana "qabul qilindi" xati ketdi. Natija: ikkita ariza, ikkita xat, ishonch yo'qolishi.

Idempotent dizaynda esa boshqacha. Birinchi xabar id=A4F2 keldi, tekshirildi: yangi, ariza yozildi, xat ketdi. O'sha id=A4F2 yana keldi, tekshirildi: allaqachon ishlangan, eski natija qaytariladi. Bitta ariza, bitta xat, ishonch saqlandi. Tasavvur qiling, mijoz "avtokredit" deb yozdi, internet shovqinli, Telegram klienti tugmani uch marta yubordi — idempotency yo'q bo'lsa Applicationsda uch ariza yoziladi, uch operator habardor qilinadi, mijozga uchta xat ketadi. Idempotent design — bu mas'uliyatli yechim, "ishlasa bo'ldi" emas. Ko'pchilik developerlar buni keyinroq qo'shaman deb o'ylashadi — keyin esa muammo paydo bo'lganda kech bo'ladi. Birinchi kundan idempotent.

# Klassifikator bot pipeline tahlili

Endi to'qqizinchi modulda qurgan klassifikator botingizning ichini ochaylik. Foydalanuvchi uchun bitta amal — mijoz Telegramga xabar yozdi va javob oldi. Lekin ichida yetti bosqich bor.

Birinchi bosqich — Telegram. Xabar trigger orqali keldi. Ikkinchisi — LLM Chain. Gemini chaqiriladi, toifa va JSON qaytadi. Bu yerda eslatib o'taman — Gemini chaqiruvi pul, vaqt sarflaydi, bu eng qimmat bosqich. Uchinchisi — Sheets Read. Operators jadval o'qiladi, faol filtr. To'rtinchisi — Pick Operator. Code orqali birinchi mos operator tanlanadi. Bu — qaror chiqaruvchi bosqich, biznes mantig'i shu yerda. Beshinchisi — Sheets Append. Applications jadvaliga ariza yoziladi. Oltinchisi — Format. Set node orqali o'zbek tilidagi matn shakllantiriladi. Yettinchisi — Send. Telegram javobi yuboriladi.

Eng muhim narsa: ikkinchi va to'rtinchi bosqichlar — qaror chiqaruvchi. Ikkinchisi Gemini — pullik. To'rtinchisi Code — logika. Qolgan beshtasi — integratsiya va tezkor logika, arzon, tezkor. Bu farq nima uchun muhim? Chunki agar replay kerak bo'lsa, biz qimmat bosqichni qayta ishga tushirmaymiz. To'qqizinchi modulda siz aynan shu botni qurgansiz, biroq ehtimol bitta promtga yaqin yondashuv bilan. Bu yerda biz har bosqichni alohida ko'rib, har birida xato turini va yechimni belgilaymiz.

Pipelinening qadri shu — biz xatoning turini aniq biladigan bo'lamiz. To'rt turdagi xato bor.

Birinchisi — LLM xatosi. Gemini noto'g'ri toifa berdi yoki JSON sxemaga mos bo'lmagan javob qaytardi. Yechim: Output Parser sxemani qattiq tekshiradi, qayta urinish bilan, temperature 0.2. To'qqizinchi modulda Schema atamasini ko'rgandik — bu yerda aynan shu ish keladi.

Ikkinchisi — Sheets mavjud emas. Google Sheets API kechikdi yoki rate-limit'ga tushdi. Yechim: uch marta qayta urinish kutish bilan, oxirida fallback "operator keyinroq" javob.

Uchinchisi — mos operator yo'q. Toifa uchun faol operator topilmadi. Yechim: Codeda "Tayinlanmagan" fallback, administratorga avtomatik xabar.

To'rtinchisi — Telegram timeout. Mijozga javob yuborishda tarmoq xatosi. Yechim: ariza saqlangan, javob retry navbatga qo'yiladi, idempotent send.

Bu slayd auditoriyani "AI mukammal" tushunchasidan qutqaradi. AI xato qilmaydi degan eshikni yopamiz. AI xato qiladi, va biz xatoga tayyormiz. Har xato turi alohida yechim talab qiladi. Bu pedagogik jihatdan muhim: ishtirokchilar "xato yuz berdi, mahsulot ishlamaydi" emas, "xato yuz berdi, tegishli yechim bor" deb o'ylashlari kerak.

# Debug strategiyalari

Endi debug strategiyalariga o'tamiz. Birinchisi va eng muhimi — Logging. Har bosqich uchun uch narsani yozib qo'yish: kirish, oraliq natija, xato konteksti. n8nning "Sheets log" nodei yetarli boshlang'ich qadam.

Real log misolida nimani ko'ramiz? Tasavvur qiling, ekranda quyidagi qatorlar: vaqt belgisi, message_id A4F2, chat_id, foydalanuvchi nomi. Keyin step bir, Telegram qabul qilingan, mijoz matn yozdi. Step ikki, LLM tasniflash, ok, Gemini Flash modeli, temperature 0.2, kirish va chiqish tokenlari, JSON natija. Step uch, Sheets read, ok, filter kategoriya kredit va faol bo'yicha, ikki qator topildi. Step to'rt, operator tanlandi, Aziza Karimova, kontakti. Step besh, Applications jadvaliga yozildi, warn — sekin, ikki yarim sekund. Step olti, javob shakllantirildi, ok. Step yetti, Telegram send, FAIL, HTTP 429, rate limit, o'ttiz sekund kutib retry kerak.

Logni o'qish bankirlar uchun ham qiyin emas. Har qator bitta narsani aytadi. Eng muhimi nima? Birinchidan, message_id va chat_id — har xabar uchun unique, debug uchun zarur. Ikkinchidan, step — har bosqich aniq raqam bilan. Uchinchidan, status — ok, warn, FAIL — rangli. To'rtinchidan, token va xarajat — auditga muhim. Auditor ikki daqiqada topadi: xato yettinchi bosqichda, sabab — Telegram rate-limit, ariza beshinchi bosqichda saqlanib qoldi. Bu — qora qutining oydinlashishi.

Ikkinchi debug strategiyasi — Replay. Pipeline beshinchi bosqichda buzildi. Boshidan boshlash kerakmi? Yo'q — agar har bosqich natijani saqlasak va idempotent bo'lsak, biz to'xtagan joydan davom etamiz.

Replay strategiyasi yo'q tizimda xatolik yuz berganda barcha bosqichlar birinchidan boshlanadi. Telegram qayta o'qiladi, LLM qayta chaqiriladi. Gemini narxi ikki barobar, sekin. Idempotent plus replay tizimda esa beshinchi bosqichdan davom etamiz. message_id bo'yicha eski tasniflash o'qiladi, LLM qayta chaqirilmaydi. Arzon, tezkor, qaytarilmas. Texnik amaliyot: message_id bo'yicha kirish va chiqish juftligi Sheetsga yoziladi. Replay shu ID bo'yicha eski natijani topadi.

Sodda hayotiy misol bilan ayting: Liftga kirdingiz, o'n ikki tugma bosdingiz, oxirgisi yopilmadi. Liftdan tushib yana o'n ikki marta bosish kerakmi? Yo'q — o'n ikkinchi tugmani bossangiz yetarli. Pipeline ham shunday — to'xtagan joydan davom. LLM chaqiruvi narx jihatidan eng qimmat. Agar replay yo'q bo'lsa, har crashda Geminiga ikki marta to'laymiz. Idempotent plus replay — bitta to'lov.

Endi narx haqida gaplashaylik. Bitta promtli botda har so'rov bir xil narx. Pipeline narxni besh-o'n baravar tushiradi, agar uchta sodda qoidaga rioya qilsak.

Birinchi qoida — kichik model birinchi. Besh toifaga tasniflash uchun Gemini Flash kifoya, o'n marotaba arzon. Pro model faqat noaniq holatlar yoki sentiment tahlili kerak bo'lsa ishlatiladi. Klassifikator default — Flash. "Shikoyat" toifasida sentiment tahlili uchun Pro. Aniq raqam: Gemini Pro bitta klassifikatsiya uchun taxminan besh sent. Flash — yarim sent. Kuniga ming xabar bo'lsa, oyiga yuz ellik dollar yoki o'n besh dollar — pipeline pul tejaydi.

Ikkinchi qoida — jadvalni xotirada saqlash. Operatorlar jadvali har xabarda qayta o'qilmasin — n8nda besh daqiqaga keshlanadi. Daqiqasiga yuz xabar kelganda Sheets API chaqiruvi to'qson besh foizga kamayadi. To'qqizinchi modulda biz Sheetsni har xabarda o'qib turardik — bu demo uchun yaramli, production uchun yo'q. Operators jadval kunda bir-ikki marta o'zgaradi, har xabarda o'qish behuda.

Uchinchi qoida — zaxira modelga o'tish. Agar Pro javob bermasa yoki kechiksa, Flashga avtomatik o'tish. Klassifikatsiya doim ishlaydi. n8nda "agar besh sekundda javob yo'q, Flashga o'tish" sharti — mijoz farqini sezmaydi. Bizning vazifa — bot doim ishlasin.

Endi branching. Pipeline har doim bir xil yo'l bilan ketmaydi. Klassifikator muhimlik darajasini, urgencyni allaqachon aniqlaydi — biz shu bo'yicha yo'lni ajratamiz. Telegram, LLM Chain Flash bilan toifa va urgency aniqlanadi. Agar urgency high bo'lsa, tez yo'l: birinchi faol operator, darhol bildirishnoma, besh daqiqada javob. Agar low yoki medium bo'lsa, standart yo'l: toifa bo'yicha operator, email, yigirma to'rt soat ichida.

Misol: "Kartam yo'qoldi" — urgency high, Risk Officerga darhol SMS. "Filial soat nechagacha?" — urgency low, standart yo'l. Bu biznes mantig'i. AI o'zi qaror qilmaydi — biz qoida yozamiz, AI bajaradi. n8nda "If" nodeini eslating, sakkizinchi modulda ko'rgandik. Trigger, LLM, If, ikki branch — tanish struktura.

Pipeline qurishda eng tipik xatolar haqida. To'rt afsona va to'rt haqiqat. Birinchi afsona: bitta promtga hammasini sig'dirsam, sodda bo'ladi. Haqiqat: sodda emas, qora quti. Aniq bosqichlar — debug, audit va xarajat uchun zarur.

Ikkinchi afsona: logging sekinlatadi, productionda o'chirib qo'yamiz. Haqiqat: logging asosiy sarmoya. Bankda o'chiq log degan — audit yo'q degan, muvofiqlik muammosi. Audit, muvofiqlik — Uchinchi modulda ko'rganmiz, Data Masking va Yopiq Kontur. Logging shu lentaning davomi — kim, qachon, qaysi natijani oldi, barchasi qayd etilishi shart.

Uchinchi afsona: idempotency keyinroq qo'shamiz, hozir ishlasa bo'ldi. Haqiqat: birinchi kundan kerak. Mijozga ikki xat ketishi — sotsial xato, ishonchni qaytarib bo'lmaydi.

To'rtinchi afsona: Pro modelni har joyda ishlatamiz — sifat muhim. Haqiqat: o'n baravar qimmat. Ko'p bosqich Flashda ham ishlaydi. Pro — faqat fikrlash kerak bo'lganda.

# Amaliyot — bug-hunt va checklist

Endi modulning eng interaktiv qismi keldi. Bug-hunt mashqi. Real loglarni o'qib xato topamiz. Ekranda log: vaqt 14:47, message_id B7C9, chat_id, foydalanuvchi Sherzod. Birinchi bosqich Telegram qabul qildi, "Depozit ochmoqchiman" matni. Ikkinchi bosqich LLM tasniflash, ok, depozit toifasi. Uchinchisi Sheets read, ok, bitta operator. To'rtinchisi pick operator, ok, Dilfuza Nazarova. Beshinchisi Sheets append — FAIL, HTTP 500, retry bir, yana FAIL, retry ikki, oxirida ok, qator A-3318 yozildi. Oltinchisi format, ok. Yettinchisi Telegram send, ok, sent_count uch — bu joyda undov belgisi.

Ikki savol bor. Birinchisi: xato qaysi bosqichda ko'rinadi va asl sababi nima? Ikkinchisi: mijoz uchta tasdiq xati oldi. Idempotency qaysi bosqichda kerak edi?

Olti daqiqa beraman, uch stol bilan ishlaymiz. Birinchi stol birinchi savol bo'yicha. Ikkinchi stol ikkinchi savol bo'yicha. Uchinchi stol ikkala savolga qaytib, yechim taklif qiladi.

Kutilgan javoblar shunday. Birinchi savol: xato beshinchi bosqichda — Sheets append — lekin asl sabab uchda. Birinchidan, Sheets API 5xx, vaqtinchalik. Ikkinchidan, retry qildi va oxirida muvaffaqiyat. Ammo step yettida sent_count uch — bu asl muammo: telegram_send idempotent emas, har retryda xat ketgan. Ikkinchi savol: idempotency beshinchi bosqichga kerak — message_id bo'yicha dedup. Va yettinchi bosqichga ham — bir xil reply har retryda takror yuborilmasligi uchun.

Real productionda shu xato — eng tipik. Endi siz tahlil qila olasiz.

Endi debug checklist. Pipeline buzilganda boshqa savol bermang. Aynan shu olti savolni tartib bilan bering. Birinchi ikki daqiqada javobi topilmasa, undan keyin chuqurroq ketamiz.

Birinchi savol: qaysi bosqich? Avval logni o'qing. Step raqami bilan FAIL qatorini toping. Boshqa bosqichlarda muammo izlamang. Ikkinchi savol: kirish to'g'rimi? Oldingi bosqichning chiqishi shu bosqichga to'g'ri keldimi? Format, ma'lumot tipi, til mosligi. Uchinchi savol: birinchi marta xatomi? Retry tarixi, ikkinchi urinishda o'tdimi? Vaqtinchalik yoki doimiy xato. To'rtinchi savol: idempotent bo'ldimi? Mijozga ortiqcha xat ketdimi? Applicationsda takroriy yozuv bormi? message_id tekshiruvi to'g'rimi? Beshinchi savol: promt o'zgardimi? Yaqinda yangilash bo'ldimi? Schema yangilandimi? Few-shot misollar to'g'rimi? Versiyani solishtirish. Oltinchi savol: replay imkoni bormi? Eski natijalarni yangidan ishlatib bo'ladimi? Yo'q bo'lsa — keyingi pipelineda bu imkonni qo'ying.

Bu olti savol — auditoriya uydan olib ketadigan checklist. Aytib qo'yaman: bu olti savolni telefonga yozib oling yoki rasmga oling. Production buzilsa — birinchi ikki daqiqa shu ro'yxat bilan ishlang. Tartibi muhim: avval qayerda, keyin qaysi bosqich, keyin nima sababdan. Boshqacha ketma-ketlik — vaqt yo'qotish.

Endi production tayyorligi. Bu ro'yxatni to'qqizinchi modulda qurgan klassifikator botga, yoki har qanday boshqa botga tatbiq eting. Besh "Ha" bo'lmasa — pilot rejimida qoldiring.

Tayyor, qo'yib yuborsa bo'ladi: har bosqich alohida log qoldiradi message_id va chat_id bilan; message_id orqali idempotency tekshiruvi bor Sheetsda dublikatlarni tozalash uchun; Output Parser orqali sxemani qat'iy tekshirish besh toifa bo'yicha; fallback model Prodan Flashga va Sheets retry sozlangan; bankir uchun "qaysi bosqichda nima bo'ldi" hisoboti oson topiladi.

Tayyor emas, pilotda qoling: bitta uzun promt, bosqichlar yo'q; log faqat errorda yoziladi, oraliq natija yo'q; retry yo'q yoki idempotencysiz retry, mijozga takror xat; har so'rov Pro modelda, besh-o'n baravar ortiqcha xarajat; schema yo'q, har xil maydonlar Applicationsga tushadi.

Bu modulning yakuniy aksent. Bankirlar bu slayd bilan ish boshlovchilar bilan suhbatlashishi mumkin: loyihangiz pilotmi, productionmi? Besh nuqta, aniq ro'yxat. Ko'pchilik bot pilotda turishi normal — production talabi qattiq.

# Yakun

Bugungi darsdan uchta asosiy xulosa.

Birinchisi — to'qqizinchi modulda qurdingiz, endi productionga. Klassifikator botingiz "ishlaydi" dan "doim ishlaydi"ga o'tishi uchun pipeline plus log plus idempotency kerak. Bu uchligi yo'q bo'lsa, demo darajada qoladi.

Ikkinchisi — idempotency birinchi kundan. message_id orqali tekshiruv. Mijozga ikki xat ketishi — mijoz ishonchini butunlay yo'qotish. Buni keyinroq qo'shaman degan adashish — kech bo'ladi.

Uchinchisi — o'n uchinchi modulda shu checklist bilan keldik. Real bank keyslarini o'qiymiz: qayerda pipeline bor, qayerda log bor, retry idempotentmi, branch biznes qoidasiga bo'ysunadimi, xarajat nazoratdami? O'n to'rtinchi modulda — guruh loyihangiz, shu ro'yxatni qo'llaysiz.

Endi lug'at recap, birga aytamiz. Pipeline — bu nima edi? Birga: "ko'p bosqichli AI ish zanjiri". Idempotent design — bu nima edi? Birga: "qayta ishga tushsa ham bitta natija". Bularni yodda tutib turing — o'n beshinchi modul yakuniy glossary reviewda Pipeline va Idempotent design qaytib chiqadi.

Savol-javob uchun besh daqiqa qoldiraman. Eng ko'p kelishi mumkin bo'lgan savollar: Pipeline qancha bosqichdan iborat bo'lishi kerak? Javob: eng kam, vazifa talab qiladigan miqdor. Klassifikator yetti. RAG bot to'rt-besh. Lekin har bosqich bitta vazifa qilishi kerak. Idempotency bizning 1C tizimida qanday ishlaydi? 1C backend, biz n8n orqali ulansak, message_idni n8n yozadi. 1C tomonida ham unique constraint qo'shish kerak. Bu hammasi qancha vaqt oladi? Birinchi pilot — ikki hafta. Productionga to'rt-olti hafta, agar siz besh "Ha"ni qo'lga kiritsangiz.

Rahmat. Tanaffusdan keyin o'n uchinchi modul — bank amaliyotidagi real keyslar.
