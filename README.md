# Portfolio Website — Maarten van den Berg

A personal portfolio website built with a **terminal-style interface**, inspired by classic systems such as **MS-DOS** and the **Linux command line**.  
This project showcases my skills in **frontend development**, **UI/UX design**, and creative technical thinking.  
It was developed as part of my HBO-ICT study program.


## Live Demo

- **Live Website:** https://portfolio-website-ecru-omega-46.vercel.app/  
- **GitHub Repository:** https://github.com/Maarten0162/portfolio-website


## Overview

The portfolio was created to:

- Demonstrate my frontend development skills  
- Highlight my design choices and creativity  
- Provide visitors with a unique, interactive experience  
- Show that I can build complex interfaces using modern tooling  

The terminal interface reflects my interest in Linux, command-line tools, and technical systems.


## Features

### Interactive Terminal Interface
Visitors can navigate the website using terminal-like commands based on real Linux commands, such as:

```bash
  help
  about
  projects
  clear
  ls
  open <project>
```




### Supabase Database Integration
The project includes a **Supabase** backend for storing dynamic data such as project details, making the site modular and easy to expand.

### Modern & Responsive
Even though the website has a retro aesthetic, it is built with modern technologies:

- Responsive layout  
- Smooth animations  
- Fast loading performance  
- Modular component structure  


## Technologies Used

- **Framework:** Next.js 15.5.6
- **Language:** React 19.1.0 + TypeScript ^5
- **Styling:** Tailwind CSS 4.x
- **Database & Auth:** Supabase 2.76.1

## Installed packages
- ESlint
- Supabase SSR
- Turbopack

## File structure

```txt
portfolio-website/
├── .gitattributes
├── .gitignore
├── app/
│   ├── components/
│   │   └── Terminal.tsx
│   ├── favicon.ico
│   ├── fonts/
│   │   └── perfect-dos-vga-437.woff2
│   ├── fonts.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── eslint.config.mjs
├── lib/
│   ├── commandAlias.ts
│   ├── commandResponses/
│   │   ├── aboutLines.ts
│   │   ├── helpLines.ts
│   │   └── projectLines.ts
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│   ├── download.png
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
└── tsconfig.json
```

## Installation & Development

```bash
# Clone the repository
git clone https://github.com/Maarten0162/portfolio-website.git

# Navigate into the project
cd portfolio-website

# Install dependencies
npm install

# Run the development server
npm run dev
```

## License
MIT License

Copyright (c) 2025 Maarten van den Berg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
