# Birthday Surprise — public template

A reusable birthday webpage with animated teddies, a birthday wish, three surprises, an automatic memory slideshow, a letter, a gift reveal, and a separate admin studio.

**This is the shareable version.** It contains generic demonstration text, generated teddy artwork, no personal story or memories, no private photos, no passwords, and no original repository history. One deployment supports one birthday page and one configured admin. Anyone can view the birthday page; only the admin can edit it.

## What is included

- Welcome Yes/No interaction, animated teddy selection, custom welcome image/GIF and photo movement.
- Birthday celebration, then surprise selection. Open Little Moments first to unlock Your letter, then One more surprise.
- Fourteen generic sample moments in the original image-and-text slideshow. Scenes advance automatically; click the progress lines to jump backward or forward.
- Editable letter and final surprise, with an optional gift image, message and link. Choose your next surprise returns to the selection screen.
- Gallery of current uploaded images and built-in teddy artwork.
- `/admin/login` email/password login; `/admin` content editor.
- Public page at `/`. No admin link is displayed on the birthday page.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, existing Radix UI components, Supabase Auth/Postgres/Storage. Runs on Vercel's Node.js runtime. It does **not** require ChatGPT, Cloudflare Workers, D1, R2, or the original hosting account.

## 1. Local preview

Install Node.js 22.13 or newer (Node 22 LTS recommended), then:

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Without environment variables, the public page shows generic demo content. Admin saving and image uploads require the Supabase setup below.

## 2. Create your own Supabase project

1. Create a Supabase project at https://supabase.com.
2. Run `supabase/setup.sql` in its SQL Editor. This creates the content table and private `birthday-media` bucket. No anonymous database or storage write access is granted.
3. In Authentication → Users, create your admin user with your email and a strong password. Confirm the email for this user. Disable public sign-ups in the authentication settings: the app has no sign-up screen.
4. Copy the project URL and the server-only **service_role** key from the project API settings. Never use this key in browser code or with a `NEXT_PUBLIC_` prefix.
5. Copy `.env.example` to `.env.local` and fill in:

```dotenv
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
```

Restart the development server after changing environment variables.

## 3. Admin details

| Item | Value |
| --- | --- |
| Login address | `https://YOUR_DOMAIN/admin/login` |
| Editor address | `https://YOUR_DOMAIN/admin` |
| Username | The Supabase user's email, exactly matching `ADMIN_EMAIL` |
| Password | The password you set in Supabase; no default password is included |
| Session | HttpOnly, SameSite=Strict cookie; Secure on production; expires within one hour |
| Logout | Sign out button below the admin editor |
| Password recovery | Reset the admin user's password in Supabase; a recovery-email flow is not included |

Tabs: Birthday details, Welcome screen, Three surprises, Memory chapters, Gallery, Photos, Personal letter. Text edits require **Save changes**. Uploads save the current edits and image automatically. Gallery lets you reuse an uploaded picture on the welcome screen. Photos are limited to **4 MiB each** to fit Vercel's function request limit.

### Replace the sample moments

1. Open `/admin` and select **Memory chapters**.
2. Pick a scene and edit its title, small heading, caption and closing note.
3. Upload a photo for that scene. The existing illustration remains until you replace it. Scenes without a sample illustration show the animated teddy.
4. Click **Save changes** after editing text. Use **Photos** to manage uploaded images and their scene assignments.
5. In **Three surprises**, change the card titles, letter, final message and optional gift.

These edits are stored in your configured database, not in the GitHub source. Existing saved content takes priority over sample defaults.

Set the admin email before the first save. The saved content records the admin user ID as its owner. If you change to a different admin user later, update the `owner` column in `birthday_content` in the Supabase SQL Editor to that user's UUID too.

## 4. Deploy to Vercel

1. Upload this folder's contents to a new GitHub repository (instructions below).
2. In https://vercel.com, add a project and import that repository.
3. Choose the **Next.js** preset. Root directory is the directory containing `package.json`. Use `npm install` and `npm run build`; leave Output Directory at its default.
4. Add the three environment variables above to the Production environment (and Preview only if you want preview deployments to access the same content).
5. Deploy. Open the public URL, then `/admin/login` to configure your content.
6. If Vercel Deployment Protection is enabled, disable it for the production site if you want everyone to view the birthday page.

There are no secrets embedded in this source. Supabase content and uploads persist across Vercel deployments. Local preview and production use the same content if they use the same Supabase project. Use a separate Supabase project for isolated testing.

## 5. Push to GitHub without personal information

**Push only this extracted `birthday-template` folder. Do not push your separate PRIVATE memories file.**

```bash
git init
git add .
git status
# Check the staged files: no .env.local, credentials, or personal photos.
git commit -m "Add reusable birthday surprise template"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

You can also use GitHub Desktop's “Add local repository”, then “Publish repository”. Choose public or private as you prefer. No GitHub account is connected or modified by downloading this ZIP.

Keep personal words/photos in your own database and uploads through admin, rather than in `app/story-data.ts` or `public/`. `.gitignore` excludes environment files, `.vercel`, `private/`, and names beginning with `PRIVATE`. Gitignore does not remove files already committed: if a secret was committed, revoke it, remove it from history, and replace it.

**A public GitHub repo can be generic while the deployed website is personalized. However, a public website exposes its displayed text and pictures to its visitors.** Do not publish private memories on a public website if you do not want visitors to see them.

## Project map

- `app/surprise.tsx`: public screen flow.
- `app/story-player.tsx`: automatic slideshow, letter and final surprise.
- `app/story-data.ts`: fourteen fictional sample moments.
- `app/defaults.ts`: generic text and settings.
- `app/birthday.tsx`, `app/surprises-editor.tsx`, `app/gallery.tsx`: admin UI.
- `lib/auth.ts`: validates the session with Supabase and checks `ADMIN_EMAIL`.
- `lib/content.ts`, `lib/supabase.ts`: server-only database and media access.
- `app/api/admin/*`: protected sign-in, sign-out and editing endpoints.
- `app/api/content`, `app/api/photos/[id]`: public reads; photo writes require admin.
- `public/animation`: generated teddy sprite sheets. Keep the files and CSS together.
- `supabase/setup.sql`: database/storage setup.

## Checks and limits

```bash
npm run typecheck
npm run build
npm start
```

This export was typechecked and built locally. Local smoke checks confirmed that the public page and content endpoint return 200, unauthenticated content edits and photo uploads return 401, and a login request without the required origin returns 403. A live Supabase account and Vercel deployment are not included; verify sign-in, save/reload, upload, logout and mobile animation after configuring your own project. Supabase handles password verification and authentication rate limits. Sessions require re-login after expiry; automatic refresh and multi-user registration are intentionally not included.

If the public page shows “could not be loaded”, check the Supabase variables and run the SQL setup. If uploads fail, check the private bucket, MIME type and 4 MiB limit. If sign-in works but editing is forbidden, check `ADMIN_EMAIL` and the saved owner UUID.

## Official setup references

- Next.js deployment: https://nextjs.org/docs/app/getting-started/deploying
- Supabase password auth: https://supabase.com/docs/guides/auth/passwords
- Supabase storage access: https://supabase.com/docs/guides/storage/security/access-control
- Vercel request limits: https://vercel.com/docs/functions/limitations
