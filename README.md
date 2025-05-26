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

<h2>🧾 Changelog – <code>dev</code> Branch (Latest Update)</h2>

<h3>🚀 Features</h3>
<ul>
  <li><strong>Job Postings System</strong>
    <ul>
      <li>🧱 Added <code>JobList</code> and <code>JobItem</code> components to render job listings</li>
      <li>🔌 Integrated new <code>/job-postings</code> API route</li>
      <li>🔗 Connected job listings to <strong>RTK Query</strong> for efficient data fetching</li>
      <li>🧩 Extended filter interface with company-related fields</li>
      <li>🔍 Centralized search functionality via <code>SearchJob</code> in <code>HeroSection</code></li>
      <li>🔎 Added search functionality to job listings via <code>JobList</code> component</li>
      <li>🧰 Implemented global filter management with Redux slice (<code>jobFilters</code>)</li>
      <li>📤 Added filter interaction logic in <code>JobItem</code> via <code>handleAction</code> and <code>handleJobTypeBadge</code></li>
      <li>🧱 Created <code>FilterBar</code> to display and clear selected filters</li>
      <li>🔽 Added <code>ResultNavigator</code> for sort & per-page filter selections</li>
    </ul>
  </li>
</ul>

<h3>🎨 UI/UX Enhancements</h3>
<ul>
  <li>🎞️ Added <strong>Framer Motion</strong> for entry animations across multiple components (<code>BestCompanies</code>, etc.)</li>
  <li>🎨 Added job type styling in <code>globals.css</code></li>
  <li>➕ Implemented "show more" toggle in <code>FilterSwitch</code> for experience/career level filtering</li>
  <li>🧹 Improved filter item styling in <code>FilterBar</code> with hover and close icons</li>
</ul>

<h3>⚙️ Refactoring & Structure</h3>
<ul>
  <li>🔁 Replaced all <code>useEffect</code>-based fetching logic in <code>FeaturedJobs</code> with <strong>RTK Query</strong></li>
  <li>🗂️ Moved all Redux logic under <code>/lib/redux</code> for better structure</li>
  <li>🗑️ Removed unused <code>employerSlice.ts</code></li>
  <li>🧼 Extracted <code>setUserDatabase</code> function for cleaner Firestore integration</li>
  <li>🛠️ Improved route format utility and added new helper function</li>
  <li>🔧 Renamed <code>JobType</code> component to <code>CustomList</code> and refactored for reusability in <code>FilterMenu</code></li>
  <li>🧠 Extended <code>jobFilters</code> slice with new fields (<code>sortValue</code>, <code>pageValue</code>, <code>filtersItem</code>) and reducers</li>
  <li>🧩 Added <code>touch</code> slice for managing UI-layer states</li>
  <li>🐛 Fixed type issues in <code>filtersJob</code> config file</li>
</ul>

<h2>📌 Notes</h2>
<ul>
  <li>This is the <strong>dev</strong> branch of the repository.</li>
  <li>The project is actively being developed.</li>
  <li>New features and updates will be added to this README as development progresses.</li>
</ul>
