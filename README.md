# Sekar Fitness Equipments – Chennai Gym Equipment Manufacturer

A modern, high-converting web application and quotation builder for **Sekar Fitness Equipments**, premier gym and fitness equipment manufacturer and dealer in Chennai, Tamil Nadu.

## Features
- **Brand Story & Heavy Manufacturing**: Showcase of factory fabrication with 12-gauge MS steel, cast iron foundries, and Olympic grade knurled barbells.
- **Embedded YouTube Video Tour**: Video player with factory tests and showroom walkthrough (Embed ID `x9d7Ju9v_Uc`).
- **Interactive Product Catalog**: Searchable and filterable by item code and category (Dumbbells, Plates, Rods, Combos, Benches, Machines, Accessories).
- **Weight Selector & Pricing**: Real-time price calculation for per-kg items (Cast iron plates, rubber dumbbells, MS weight stacks).
- **WhatsApp Order & Quotation Drawer**: Formats itemized order references, customer details, and policy acknowledgements into a structured WhatsApp message (`wa.me`).
- **Firebase Google Authentication**: Google popup sign-in, user profile dropdown, and "My Enquiries" history tracking.
- **Olympic Plate Calculator**: Interactive plate loader utility for gym enthusiasts and lifters.
- **Official Factory Price Sheet (PDF)**: Formatted printable catalog price list.
- **Showroom Location & Contact**: Embedded Google Maps pointing to `27/18, Ethiraj Garden St, Pattalam, Purasaiwalkam, Chennai 600012` and Instagram `@sekar_fitness_equipments`.

---

## Policies
- **Transportation Cost Extra**: Freight is computed based on destination distance and carrier weight.
- **100% Advance Payment**: Required for all orders prior to factory dispatch.

---

## Deployment on Vercel

1. Push this repository to GitHub or GitLab.
2. In [Vercel Dashboard](https://vercel.com), click **Add New > Project** and import the repository.
3. Configure the **Environment Variables** in Vercel Project Settings (reference `.env.example`):
   ```env
   VITE_FIREBASE_API_KEY="AIzaSy..."
   VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-app"
   VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
   VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef"
   ```
4. In [Firebase Console](https://console.firebase.google.com):
   - Go to **Authentication > Sign-in method** and enable **Google**.
   - Under **Authentication > Settings > Authorized domains**, add your Vercel deployment domain (e.g. `*.vercel.app`).
5. Click **Deploy** on Vercel.
