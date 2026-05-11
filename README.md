<div align="center">
<img src="./client/src/assets/image.png" 
alt="Gilgamesh Logo" width="220"/>

> Immortality lies in the walls we build and in the memory of our deeds.

---
**A modern platform for building and managing your professional career**


---
![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-purple.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

</div>

---
## Features

### CV management
- **Intuitive editor** with real-time preview
- **3 professional templates** (Modern, Classic, Creative)
- Customised **PDF generation**
- **Versioning** and revision history

### Cover Letters
- **4 customisable templates** (Formal, Modern, Creative, Startup)
- **Rich text editor** with live preview
- **Direct PDF export**

### Notes Management
- **Seamless organisation** with split-view interface
- **Create, edit, delete** instantly
- **Automatic saving**

### File Management
- **Secure upload** of up to 50MB
- **Cloud storage** via Supabase
- Easy **management and downloading**

### Calendar/Diary
- **Event tracking** (interviews, deadlines, follow-ups)
- **Interactive monthly view**
- **Event notifications**

### Modern Design
- **Dark/Light mode** with automatic detection
- **Responsive interface** with a mobile-first approach
- **Smooth animations** and a premium user experience
- **Professional branding**

---

## Quick Start

### Prerequisites:
- **Node.js** v18+
- **npm** or **pnpm** v10+
- **Supabase account** (free)

### Installation

#### 1. Clone the project
```bash
git clone  https://github.com/Monsieur9Bre99/Gilgamesh.git
cd gilgamesh
```

#### 2. Install the dependencies

**Client:**
```bash
cd client
pnpm install
```

**Server:**
```bash
cd server
pnpm install
```

#### 3. Environment variables

**Client (client/.env)**
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
```

**Server (server/.env)**
```env
PORT=3001
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxx
NODE_ENV=development
```

### 4. Launch the app

**Terminal 1 - Client:**
```bash
cd client
pnpm run dev
# http://localhost:5173
```

**Terminal 2 - Server:**
```bash
cd server
pnpm dev
# http://localhost:3001
```

**Terminal 3 - Optional - Supabase:**
```bash
# For the Supabase instance (if you're using it)
supabase start
```

### Project Structure
```
gilgamesh/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React & shadcn components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Libraries & utilities
│   │   ├── store/          # Zustand stores
│   │   └── assets/         # Images, logos, etc
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── services/       # Services
│   │   └── utils/          # Utilities
│   └── package.json
│
└── README.md              # This file
```

---

##  Configuration

### Setting up Supabase

#### 1. Create a Supabase project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project 
3. Copy the URL and ANON_KEY to `.env`

#### 2. Create the tables
```sql
-- profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- cvs
CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT,
  content JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- letters
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- notes
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- files
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT,
  storage_path TEXT,
  mime_type TEXT,
  size INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. RLS Policies
```sql
-- Example: CVs accessible only by owner
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access own CVs"
  ON cvs
  USING (auth.uid() = user_id);
```

#### 4. Storage Bucket
```bash
# Via Supabase Dashboard
1. Storage → Create new bucket
2. Name: gilgamesh-files
3. Privacy: Private (require auth)
```

---

##  Architecture

### Client Stack
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **React Query** - Data fetching
- **React Router 7** - Routing
- **Supabase Client** - Backend communication
- **shadcn UI** - Component library

### Server Stack
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Supabase JS** - Database & auth
- **Multer** - File upload handling
- **CORS** - Cross-origin requests
- **Dotenv** - Environment config

---

## Workflows

### Scenario 1: First login
```
1. User goes to /
2. Clicks "Sign up"
3. Enters their credentials
4. Supabase creates an account
5. Redirects to /dashboard
6. The dashboard is empty but ready to use
```

### Scenario 2: Create and export a CV
```
1. Go to /cv
2. Click "New CV"
3. Select a template
4. Edit the sections
5. Real-time preview
6. Click "Download PDF"
7. File ready to send
```

### Scenario 3: Uploading files
```
1. Go to /files
2. Click "Upload"
3. Select file (≤50MB)
4. Upload to Supabase Storage
5. Accessible from the app
6. Downloadable directly
```

---

## Checklist

- ✅ **TypeScript strict mode** - No type errors
- ✅ **Error handling** - Error handling throughout the codebase
- ✅ **Auth protection** - Protected routes
- ✅ **CORS configured** - Security
- ✅ **Structured logging** - Easy debugging
- ✅ **Mobile responsive** - Mobile-first design
- ✅ **Dark/Light mode** - Accessibility
- ✅ **Comprehensive documentation** - Guides + code
- ⬜ **Performance optimised** - Assets, queries
- ⬜ **Production ready** - Deployable

---

## Deployment

### Vercel (Client)
```bash
#  GitHub
git push origin main

# Vercel deploys automatically
# Environment variables in Settings → Environment Variables
```

### Railway/Heroku (Server)
```bash
# Connect repository
# Set environment variables
# Deploy

# Or with Docker
docker build -t gilgamesh-server .
docker run -p 3001:3001 gilgamesh-server
```

### Production Configuration

**Client:**
```env
VITE_SUPABASE_URL=https://prod.supabase.co
VITE_SUPABASE_ANON_KEY=prod_key_xxx
```

**Server:**
```env
PORT=3001
NODE_ENV=production
SUPABASE_URL=https://prod.supabase.co
SUPABASE_ANON_KEY=prod_key_xxx
```

---

## Contribution

### Report a bug
1. Open an [Issue]( https://github.com/Monsieur9Bre99/Gilgamesh/issues)
2. Describe the expected behaviour versus the actual behaviour
3. Add screenshots if possible

### Pull Requests
1. Fork the project
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit the changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

##  Conventions

### Code Style
- TypeScript strict mode
- Prettier formatting
- ESLint rules followed
- Component naming: PascalCase
- Variable naming: camelCase

### Branch Naming
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
---

##  Troubleshooting

### Client cannot connect to the server
```bash
✓ Check that PORT=3001 in .env server
✓ Check that CORS is enabled in index.ts
✓ Check that the fetch URL is correct
```

### File upload failed
```bash
✓ Check that the Supabase bucket exists
✓ Check that RLS policies are configured
✓ Check that the file size is less than 50MB
```

### AuthListener is not synchronising
```bash
✓ Check that QueryProvider wraps AppRoutes
✓ Check that Supabase credentials are correct
✓ Check that localStorage is not blocked
```

### Dark/light theme does not change
```bash
✓ Check ThemeProvider wrap App
✓ Check localStorage "gilgamesh-theme"
✓ Check system preferences
```

---


## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Guide](https://expressjs.com/en/guide/routing.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

### course 
- [Grafikart - Learn React](https://grafikart.fr/formations/react)
- [LaConsole -  Code with Supabase and JavaScript](https://laconsole.dev/formations/supabase/)
---

## Licence

ISC Licence – See [LICENCE](./LICENCE) for further details.

---
### **Made with ❤️ by [Breroot](https://github.com/Monsieur9Bre99/)**
---
Any questions? Open a [Issue](https://github.com/Monsieur9Bre99/gilgamesh/issues) 


**Last updated:** May 2026  
**Version:** 1.1.0  
**Status:** In development 

