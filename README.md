# 📝 Notes App

https://notes-app-navy-one.vercel.app

 A modern, full-stack notes application built for developers who want to capture, organize, and link their technical insights with style.

![Notes App Hero](./public/landing.png)

## ✨ Features

🔥 **Create Smarter Notes. Code Better.**

Supercharge your workflow with Notes App — the smartest way to capture, organize, and link dev notes, code snippets, and technical insights.

### 🔐 Authentication & Security
- **Better Auth** integration with email/password authentication
- Google OAuth support (configured)
- Protected routes with middleware
- Secure session management

### 📱 Modern User Interface
- **Dark/Light theme** switching with system preference detection
- Fully responsive design for all screen sizes
- Animated hero section with theme-aware screenshots
- Card-based layouts for intuitive navigation
- Modal dialogs with confirmation states
- Toast notifications for user feedback
- Loading states and comprehensive error handling

### 📚 Note Management
- **Hierarchical organization**: Dashboard → Notebooks → Notes
- Create and manage notebooks with validation
- Rich text editing with **TipTap editor**
- Auto-save functionality - never lose your work
- Note previews with content extraction
- Search functionality across all notebooks and notes
- Bulk operations with confirmation dialogs

### ⚡ Rich Text Editor
- **Bold, Italic, Strikethrough, Code** formatting
- Text alignment (left, center, right)
- Hover effects on toolbar buttons
- Real-time content saving
- Responsive toolbar design
- Clean, distraction-free writing experience

### 🔍 Advanced Features
- Real-time search with URL state management
- Dynamic sidebar navigation
- Breadcrumb navigation for easy traversal
- Collapsible sidebar sections
- Theme-persistent preferences

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety throughout
- **[TailwindCSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[Better Auth 1.3.8](https://www.better-auth.com/)** - Modern authentication
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database operations
- **[PostgreSQL](https://www.postgresql.org/)** - Reliable data persistence

### UI & Interactions
- **[TipTap](https://tiptap.dev/)** - Rich text editing
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[Lucide Icons](https://lucide.dev/)** - Consistent iconography
- **[nuqs](https://nuqs.47ng.com/)** - URL state management
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Runtime type validation

## 📁 Project Structure

```
src/
│   middleware.ts            # Next.js middleware (e.g. auth, redirects)
│
├───app                     # Next.js App Router
│   │   favicon.ico         # App favicon
│   │   globals.css         # Global styles & themes
│   │   layout.tsx          # Root layout with providers
│   │   page.tsx            # Landing page
│   │
│   ├───api                 # API routes (Next.js Route Handlers)
│   │   ├───auth
│   │   │   └───[...all]
│   │   │           route.ts    # Auth API endpoint (Better Auth)
│   │   └───test
│   │           route.ts        # Test API endpoint
│   │
│   ├───dashboard           # Protected dashboard routes
│   │   │   layout.tsx          # Dashboard layout
│   │   │   page.tsx            # Dashboard overview
│   │   │
│   │   └───notebook
│   │       └───[notebookId]    # Dynamic notebook routes
│   │           │   page.tsx        # Notebook detail page
│   │           │
│   │           └───note
│   │               └───[noteId]    # Dynamic note routes
│   │                       page.tsx    # Note editor page
│   │
│   ├───login               # Login page route
│   │       page.tsx
│   │
│   └───signup              # Signup page route
│           page.tsx
│
├───components              # Reusable UI and app components
│   │   app-sidebar.tsx         # Sidebar navigation
│   │   call-to-action.tsx      # CTA section
│   │   create-note-button.tsx  # Button to create a note
│   │   create-notebook-button.tsx # Button to create a notebook
│   │   features.tsx            # Features section
│   │   footer.tsx              # App footer
│   │   header.tsx              # App header
│   │   hero-section.tsx        # Hero/landing section
│   │   logo.tsx                # App logo
│   │   logout.tsx              # Logout button
│   │   mode-switcher.tsx       # Theme mode switcher
│   │   mode-toggle.tsx         # Theme toggle button
│   │   note-card.tsx           # Note card component
│   │   note-preview-modal.tsx  # Note preview modal (Dialog)
│   │   note-preview.tsx        # Note preview card (static)
│   │   notebook-card.tsx       # Notebook card component
│   │   page-wrapper.tsx        # Page wrapper layout
│   │   protected-route.tsx     # Route protection HOC
│   │   rich-text-editor.tsx    # Rich text editor (TipTap)
│   │   search-form.tsx         # Search form
│   │   sidebar-data.tsx        # Sidebar navigation data
│   │   theme-provider.tsx      # Theme provider
│   │   version-switcher.tsx    # Version switcher
│   │
│   │
│   │
│   │ 
│   │
│   ├───forms                  # Form components
│   │       login-form.tsx         # Login form
│   │       signup-form.tsx        # Signup form
│   │
│   └───ui                     # shadcn/ui base components
│           alert-dialog.tsx       # Alert dialog
│           animated-group.tsx     # Animated group wrapper
│           badge.tsx              # Badge component
│           breadcrumb.tsx         # Breadcrumb navigation
│           button.tsx             # Button component
│           card.tsx               # Card component
│           collapsible.tsx        # Collapsible panel
│           dialog.tsx             # Dialog/modal
│           dropdown-menu.tsx      # Dropdown menu
│           form.tsx               # Form wrapper
│           input.tsx              # Input field
│           label.tsx              # Label component
│           separator.tsx          # Separator line
│           sheet.tsx              # Sheet/side panel
│           sidebar.tsx            # Sidebar base
│           skeleton.tsx           # Skeleton loader
│           sonner.tsx             # Toast notifications
│           text-effect.tsx        # Text effect
│           toggle.tsx             # Toggle switch
│           tooltip.tsx            # Tooltip
│
├───db                         # Database config & schema
│       drizzle.ts                 # Drizzle ORM connection
│       schema.ts                  # Drizzle schema definitions
│
├───hooks                      # Custom React hooks
│       use-mobile.ts               # Mobile detection hook
│
├───lib                        # Utilities & configuration
│       auth-client.ts              # Better Auth client config
│       auth.ts                     # Better Auth server config
│       utils.ts                    # Helper functions
│
└───server                     # Server actions & database ops
        notebooks.ts               # Notebook CRUD operations
        notes.ts                   # Note CRUD operations
        users.ts                   # User management actions

```

## 📱 Screenshots

| Light Theme | Dark Theme |
|-------------|------------|
| ![Light Theme](./public/notes-page.png) | ![Dark Theme](./public/notes-page-dark.png) |

| Landing Page | Editor |
|-------------|------------|
| ![Landing](./public/landing2.png) | ![Dashboard](./public/text-editor-dark.png) |

| Notebooks | Notes |
|-------------|------------|
| ![Login](./public/notebook-page-dark.png) | ![SignUp](./public/notes-page-dark.png) |

| Create | Note Preview |
|-------------|------------|
| ![Create Notebook](./public/create.png) | ![Create Note](./public/note-prev-dark.png) |

| Sign Up | Log In |
|-------------|------------|
|![SignUp](./public/signup.png) | ![LogIn](./public/login.png) |

## 🌟 Recent Improvements

- ✅ **Production Authentication** - Fixed deployment auth issues with proper cookie configuration
- ✅ **Landing Page** - Beautiful hero section with animated features showcase
- ✅ **Theme System** - Seamless dark/light mode with persistence
- ✅ **Rich Editor** - Simplified, reliable TipTap implementation
- ✅ **UI Polish** - Card components, hover effects, and animations
- ✅ **Search Enhancement** - Real-time search with URL state


<br>


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended)
- PostgreSQL database

### 1. Clone the Repository
```bash
git clone <repository-url>
cd notes-app
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/notes_db"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Email (for verification)
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="noreply@yourapp.com"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup
```bash
# Generate and run migrations
pnpm db:generate
pnpm db:migrate

# Optional: Seed the database
pnpm db:seed
```

### 5. Start Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000` to see your app in action!

## 🔧 Development

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
pnpm db:generate  # Generate database migrations
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Drizzle Studio
```

### Database Management
```bash
# View database in browser
pnpm db:studio

# Reset database (development only)
pnpm db:reset

# Check database status
pnpm db:check
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **[TipTap](https://tiptap.dev/)** - For the amazing rich text editor
- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful component library
- **[Better Auth](https://www.better-auth.com/)** - For modern authentication
- **[Vercel](https://vercel.com/)** - For seamless deployment

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**

*Ready to create smarter notes and code better? [Get started now!](http://localhost:3000)*