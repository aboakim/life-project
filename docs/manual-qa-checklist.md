# Ձեռքով QA — Life Decision Engine

> Սա իմ անձնական ստուգման ցուցակն է (սկսել եմ՝ 2026-05-05)։ Չեմ փաստում որ ամեն ինչ տարածք է եղել — շատ բաներ դեռ **չեմ անցել**։

Լեգենդա՝ ☑ արել եմ / կիսատ եմ, ☐ դեռ չեմ նայել

---

## 1. Deploy & հիմքեր

- ☑ `lifedecisions.space` բացվում է, HTTPS OK
- ☑ `ads.txt` — browser/curl 200, տողը ճիշտ Pub ID
- ☑ `robots.txt` Allow, sitemap հղում կա
- ☐ `www.lifedecisions.space` — մի անգամ պետք է լինի redirect կամ cert OK (դեռ չեմ ստուգել)
- ☐ Vercel environment — production vs preview confuse չկա արդյո՞ք

---

## 2. AdSense / verify (քո կողմից սկսած)

- ☑ Meta `google-adsense-account`՝ view-source / Elements-ում տեսել եմ
- ☑ `ads.txt` snippet AdSense UI-ի հետ համընկնում է
- ☑ Global `adsbygoogle.js` script ավելացրել ենք layout-ում (deploy հետո նորից նայել)
- ☐ AdSense dashboard-ում "Needs attention" status — re-request review **դեռ չեմ սեղմել** (սպասում եմ index)
- ☐ Search Console `site:` նոր blog post — **լրիվ դեռ չի երևում** (մի քանի օր կսպասեմ)

---

## 3. Գլխավոր / analyze

- ☑ Home վերբեռնվում է, hero երևում է
- ☐ `Analyze` CTA — package modal, free path, scroll to input — **մանրակրկիտ չեմ անցել**
- ☐ Լոկալ storage / locale փոխելուց հետո refresh — edge case
- ☐ Voice / Whisper buttons — եթե browser չի աջակցում՝ չի քայքայվում՞
- ☐ Mobile Safari — մի անգամ պիտի նայեմ

---

## 4. Blog

- ☑ Նոր post slug browser-ով բացել եմ
- ☐ Բոլոր հին slug-երը 404 չեն տալիս (տեստը երկար կլինի, չեմ արել)
- ☐ Tag էջեր, sitemap թիվը համընկնում է

---

## 5. Experts / community / tools

- ☐ `/experts` SSR տեքստը (editorial block) Google-ի նման bot-ով չեմ ստուգել, միայն աչքով
- ☐ Community post / empty state
- ☐ `/field-notes` — paste մեծ տեքստ, performance
- ☐ `/checklists` print preview
- ☐ Experts register form validation + error messages

---

## 6. i18n (8 լեզու)

- ☑ Header-ում լեզու փոխելը մի կերպ նայել եմ (en)
- ☐ hy, ru, de, fr, es, ar, it — **ծույլ եմ եղել**, մեկ-մեկ էջով պետք է գնամ
- ☐ RTL (ar) breakpoints, overflow

---

## 7. Օրենքային / trust

- ☑ `/privacy`, `/terms` — quick scan
- ☐ `/editorial-standards`, `/disclaimer` — դեռ full read չեմ արել
- ☐ Contact form / email deliverability — չեմ փորձարարել

---

## 8. Performance (այս շաբաթվա համար)

- ☑ PageSpeed մի անգամ նայել եմ — desktop score ցածր էր, codebase-ում փոփոխություն արինք
- ☐ Նույն URL-ը նորից PSI **deploy-ից հետո չեմ վազեցրել**
- ☐ Core Web Vitals Search Console tab — **չեմ բացել**

---

## 9. Edge case-եր (երկարաձգված, հիմա չեմ անի)

- ☐ Rate limit / API errors when OpenAI down
- ☐ Ad slot env vars դատարկ — չպիտի կոտրի UI
- ☐ Cookie banner reject path + AdSense reload

---

## Նշումներ ինձ համար

- Search Console indexing quota — վաղը կրկին կփորձեմ մեկ URL
- Vercel preview domain AdSense account-ից հանելը — **միշտ մորանում եմ, պետք է անեմ**

---

*Վերջին թարմացում՝ իմ կողմից manual, ոչ CI:*
