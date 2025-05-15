<h1>NextHire (dev)</h1>

<p><strong>NextHire</strong> is a modern job platform that connects candidates and employers in a streamlined, user-friendly environment.</p>

<p>The <strong>authentication system</strong> (sign up, login) and the <strong>landing page</strong> have been completed. A <strong>newsletter subscription</strong> feature is also functional on the homepage. Development has now moved on to building the <strong>job listings</strong> section.</p>

<h2>🚀 Tech Stack</h2>
<ul>
  <li><strong>Next.js</strong> – Using the App Router architecture</li>
  <li><strong>React 19</strong> – With the latest stable version</li>
  <li><strong>TypeScript</strong> – For a safer and scalable codebase</li>
  <li><strong>Tailwind CSS</strong> – Fast and flexible styling system</li>
  <li><strong>SCSS</strong> – For writing custom styles when needed</li>
  <li><strong>Firebase</strong> – Authentication and Firestore database</li>
  <li><strong>Redux Toolkit</strong> – Global state management</li>
  <li><strong>Axios</strong> – For making API requests</li>
  <li><strong>Formik & Yup</strong> – For form handling and validation</li>
  <li><strong>React Firebase Hooks</strong> – Simplified Firebase integration</li>
  <li><strong>React Icons</strong> – Icon set for UI components</li>
  <li><strong>React Transition Group</strong> – Basic animation support</li>
  <li><strong>Framer Motion</strong> – Advanced UI animations</li>
  <li><strong>React Hot Toast</strong> – Notification system</li>
  <li><strong>Material UI (MUI)</strong> – For select UI components</li>
  <li><strong>Turbopack</strong> – For a faster development experience</li>
  <li><strong>ESLint</strong> – To maintain code quality</li>
</ul>

<h2>🛠️ Recent Changes (dev branch)</h2>
<ul>
  <li>✅ Integrated <strong>Framer Motion</strong> for smooth UI animations.</li>
  <li>✅ Fixed Google Fonts loading and rendering issues via proper <code>subsets</code> configuration.</li>
  <li>✅ Refactored component styles for improved consistency and maintainability.</li>
  <li>✅ Implemented a fully working <strong>newsletter subscription</strong> system on the landing page.</li>
  <li>✅ Fixed Google sign-up issue where user data wasn't being updated immediately.</li>
  <li>✅ Extracted <code>setUserDatabase</code> function for cleaner and reusable Firestore logic (applied clean code principles, reduced duplication).</li>
  <li>✅ Enhanced <strong>BestCompanies</strong> component with:
    <ul>
      <li>🔁 Fallback logic for Firestore user reference (<code>id</code> or <code>cid</code>)</li>
      <li>🎞️ Entry animation using <strong>Framer Motion</strong></li>
    </ul>
  </li>
  <li>✅ Created reusable <strong>SearchJob</strong> component and integrated it into <strong>HeroSection</strong> for centralized job search functionality.</li>
  <li>✅ Refactored <strong>FeaturedJobs</strong> data flow by integrating RTK Query:
    <ul>
      <li>🔁 Replaced <code>useEffect</code>-based fetching with <strong>RTK Query</strong></li>
      <li>🧱 Created a dedicated <strong>RTK Query API slice</strong> and connected it to the Redux store</li>
      <li>⚙️ Updated the <strong>FeaturedJobs</strong> component to use the RTK Query hook</li>
    </ul>
  </li>
  <li>✅ Moved all Redux-related files into a dedicated <code>/lib/redux</code> folder for better project structure and clarity:
    <ul>
      <li>🗂️ Created dedicated folder structure inside <code>/lib/redux</code>:
        <pre>
          /lib
          └── redux
              ├── store.ts
              ├── features/
              └── services/
        </pre>
      </li>
      <li>📦 Updated all imports to reflect new paths, including <code>store.ts</code></li>
    </ul>
  </li>
</ul>

<h2>📌 Notes</h2>
<ul>
  <li>This is the <strong>dev</strong> branch of the repository.</li>
  <li>The project is actively being developed.</li>
  <li>New features and updates will be added to this README as development progresses.</li>
</ul>
