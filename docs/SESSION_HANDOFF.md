# Շարունակել վաղը — կարճ հիշեցում

Վերջին խոսակցությունից (2026-04-14) — ինչ արվեց, ինչ անել հաջորդ։

## Repo

- GitHub: **https://github.com/aboakim/life-project**
- Տեղային պանակ: `C:\Users\HP\Desktop\Life`
- `main` branch push արված է (initial commit + հետագա փոփոխություններ, եթե ավելացրել ես)

## Ինչ արդեն կա նախագծում

- Գլխավոր էջ՝ սլայդեր, գույներ, Product «Moments» շերտ
- `/experts`՝ վերափաթեթավորում
- `/community`՝ հարց–պատասխան (Prisma + API + rate limit)
- Անվտանգության HTTP headline-ներ `next.config.ts`
- AdSense slot կոմպոնենտ (`NEXT_PUBLIC_ADSENSE_*` env)
- Deploy ուղեցույց՝ **`docs/DEPLOY_CHECKLIST.md`** (Vercel + Neon + env ցանկ)
- `npm run dev:lan` / `dev:lan:3001`՝ LAN IP-ով բացելու համար

## Հաջորդ քայլեր (քո հերթ)

1. **Vercel** — import `aboakim/life-project`, env փոփոխականներ
2. **Neon** — PostgreSQL, `prisma/schema.prisma`-ում `postgresql` (տե՛ս checklist)
3. **AdSense** — հաստատում, հետո env
4. **Git** — `git add` / `commit` / `push` փոփոխություններից հետո

## Օգտակար հրամաններ

```bash
npm run dev:lan          # LAN-ից բացել (192.168.x)
npm run build            # production build ստուգում
npx prisma db push       # տեղային DB սխեմա sync
```

## Նշումներ

- `.env` Git-ում չէ — hosting-ում ձեռքով
- SQLite production-ում չի պահվում — Neon PostgreSQL

---

*Այս ֆայլը կարող ես ջնջել կամ թարմացնել, երբ ավարտես deploy-ը։ Նոր chat-ում բացի սա կամ գրիր «կարդա SESSION_HANDOFF»։*
