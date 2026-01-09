# StudyNotes - Complete Tech Interview Preparation

A modern, responsive documentation website built with Next.js for comprehensive study notes covering Data Structures & Algorithms, Computer Networking, Operating Systems, and SQL.

**Live Demo**: [Coming Soon - Deploy on Vercel]

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Routes](#available-routes)
- [Content Included](#content-included)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

### User Interface
- Clean documentation-style layout with left sidebar navigation
- "On this page" table of contents with scroll spy
- Dark and Light mode support with smooth transitions
- Animated gradient background with subtle effects
- Fully responsive design for mobile, tablet, and desktop
- VSCode-style syntax highlighting for code blocks

### Content
- Complete DSA notes with Python code examples
- PDF downloads for CN, OS, and SQL subjects
- Organized by topics with easy navigation
- Code examples with syntax highlighting

### Performance
- Built with Next.js 16 and Turbopack for fast development
- Server-side rendering for optimal performance
- Optimized for Vercel deployment

---

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Markdown**: react-markdown with remark-gfm and rehype-highlight
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono

---

## Project Structure

```
study-notes/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home landing page
│   │   ├── dsa/page.tsx      # DSA documentation
│   │   ├── cn/page.tsx       # Computer Networking
│   │   ├── os/page.tsx       # Operating Systems
│   │   ├── sql/page.tsx      # SQL & Databases
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles & themes
│   ├── components/
│   │   ├── Header.tsx        # Navigation header with theme toggle
│   │   ├── LeftSidebar.tsx   # Left navigation sidebar
│   │   ├── RightSidebar.tsx  # "On this page" TOC
│   │   ├── MarkdownContent.tsx # Markdown renderer
│   │   └── PDFDownload.tsx   # PDF download cards
│   ├── content/
│   │   ├── BASIC.md          # Basic DSA content
│   │   └── ADVANCE.md        # Advanced DSA content
│   └── lib/
│       └── dsa-content.ts    # Content loader
└── public/
    ├── files/                # PDF files for download
    └── favicon.svg           # Site favicon
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rhushya/DSA.git
cd DSA/study-notes
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

### Build for Production

```bash
npm run build
npm start
```

---

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with subject cards |
| `/dsa` | Data Structures & Algorithms |
| `/cn` | Computer Networking |
| `/os` | Operating Systems |
| `/sql` | SQL & Databases |

---

## Content Included

### Data Structures & Algorithms

**Basic Topics**:
- Arrays (Static, Dynamic, Stacks)
- Linked Lists (Singly, Doubly, Circular)
- Sorting (Insertion, Merge, Quick, Bucket)
- Binary Search
- Trees (BST, BFS, DFS, Traversals)
- Backtracking (Subsets, Permutations, Combinations)
- Heap / Priority Queue
- Hashing (HashMap, HashSet)
- Graphs (Matrix DFS/BFS, Adjacency List)
- Dynamic Programming (1D, 2D, Knapsack)
- Bit Manipulation

**Advanced Topics**:
- AVL Trees, Red-Black Trees, B-Trees
- Floyd-Warshall, Bellman-Ford, Dijkstra
- Topological Sort, Cycle Detection
- Traveling Salesman Problem
- Python utilities (collections, itertools, heapq)

### Other Subjects

- Computer Networking: OSI Model, TCP/IP, Protocols, Security
- Operating Systems: Processes, Memory Management, Deadlocks
- SQL: Queries, Joins, Aggregations, Window Functions

---

## Customization

### Changing Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: #F55036;        /* Main accent color */
  --background: #0A0A0A;     /* Dark mode background */
  --text-primary: #FAFAFA;   /* Primary text color */
}

html.light {
  --background: #FAFAFA;     /* Light mode background */
  --text-primary: #171717;   /* Light mode text */
}
```

### Adding New Content

1. Add markdown files to `src/content/`
2. Update the content loader in `src/lib/dsa-content.ts`
3. Add navigation links in `src/components/LeftSidebar.tsx`

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to vercel.com and sign in with GitHub
3. Click "Add New" > "Project"
4. Import your repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your site will be live in 1-2 minutes with automatic deployments on every push.

### Environment Variables

No environment variables are required for basic deployment.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

---

## License

This project is open source and available for educational purposes.

---

## Author

**Rhushya**
- GitHub: [@Rhushya](https://github.com/Rhushya)

---

Built with Next.js and deployed on Vercel.
