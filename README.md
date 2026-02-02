# Dream Interpretation Web Service

A global AI-powered dream interpretation service with zero operating costs, built with Next.js, Supabase, and Google Gemini AI.

## Features

- 🌙 **AI Dream Analysis**: Psychological interpretation using Google Gemini 1.5 Flash
- 🌍 **Multi-language Support**: English, Korean, Spanish, and Japanese
- 💾 **Dream History**: Save and review past dreams (with authentication)
- ⚡ **Smart Caching**: Reduces API calls by checking for similar dreams
- 📱 **Responsive Design**: Beautiful dreamy UI with glassmorphism
- 💰 **Zero Cost**: Free tier services (Vercel, Supabase, Gemini API)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide React
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini 1.5 Flash API
- **Deployment**: Vercel
- **i18n**: i18next, react-i18next

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_ADSENSE_ID=your_adsense_id (optional)
   ```

4. Set up Supabase database:
   - Create a new table called `dreams` with the following schema:
   ```sql
   create table dreams (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references auth.users not null,
     dream_description text not null,
     interpretation jsonb not null,
     keywords text[] not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security
   alter table dreams enable row level security;

   -- Create policies
   create policy "Users can view their own dreams"
     on dreams for select
     using (auth.uid() = user_id);

   create policy "Users can insert their own dreams"
     on dreams for insert
     with check (auth.uid() = user_id);
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
├── app/
│   ├── api/
│   │   └── interpret/
│   │       └── route.ts          # Dream interpretation API
│   ├── history/
│   │   └── page.tsx              # Dream history page
│   ├── interpretation/
│   │   └── page.tsx              # Interpretation results page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── AdSenseScript.tsx         # Google AdSense integration
│   └── Navigation.tsx            # Navigation component
├── lib/
│   ├── gemini.ts                 # Gemini API integration
│   ├── i18n.ts                   # Internationalization config
│   └── supabase.ts               # Supabase client
└── public/                       # Static assets
```

## Features Explained

### Smart Caching
The app checks the database for similar dreams based on keywords before calling the Gemini API. If a dream with >60% keyword match is found, it returns the cached interpretation, saving API quota.

### Multi-language Support
Uses i18next for seamless language switching between English, Korean, Spanish, and Japanese. All UI elements are translated.

### AdSense Integration
Placeholder slots are included for Google AdSense monetization (header, sidebar, bottom).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
