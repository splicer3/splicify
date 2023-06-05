# [Splicify](https://splicify.vercel.app)

A **Spotify clone** made from scratch using **Supabase**, **Next 13**, **Stripe** and **TailwindCSS**.

<p align="center">
<img src="https://user-images.githubusercontent.com/104271382/237925682-89be2835-2732-4574-aa30-cdeb7ad6d52f.png" alt="LogoFull-Blue" style="max-width: 100%; width:300px; height:300px;">
</p>

## How to run

You will need to provide a `.env.local` containing your own **environment variables** to get this running. The environment variables are:  
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET    

Then `git clone` this repo, `npm install` and `npm run dev` to get it running on localhost:3000.  
The Supabase keys can be retrieved from the relevant Supabase project dashboard, and the same goes for the Stripe keys. Be sure to google how to setup those, as it is way too long to report it all here in its entirety.

## How it works

**Splicify** requires an *active subscription* to play songs and upload them, but **Stripe** is using **test data** so you can put whatever you want as payment information and it will still work.  
The app knows from the database *which songs were uploaded by the logged in user*, and they are shown in the **Library** section of the app (only visisble on larger screens).  
Liked songs are also on a user-basis, and can be played from the **Liked Songs playlist**.  
Like buttons and library songs are synchronized both client-side and server-side (using React Context).  
Songs are shown in the main page **from the newest to the oldest ones**. **Duplicates** are handled by assigning a **versioned id** to each song on the database.  
**Every user can see every song ever uploaded to the site**.

## Purpose

**Splicify** is a *personal project* to put on my **portfolio** to show proficiency in **React**, **Nextjs**, **Authentication** and **Online Payments**.
