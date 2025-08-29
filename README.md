# BrightHR Absence Tracker

An application for viewing employee absences with sorting and conflict detection features.
Built with React TypeScript.

## Getting Started

### Prerequisites

- Node.js ( >= v22)
- npm

### Installation & SetUp

Clone the repository and install dependencies:

```bash
git clone https://github.com/ushicode/brighthr-absence-tracker.git
cd brighthr-absence-tracker
npm install

npm run start:dev

Open http://localhost:5173 in your browser.
```

### Running Test

```bash
  npm run test

  npm run test:watch
```

## Backlogs - Approach to Incomplete Features
  - ***Pagination***: Implement client-side pagination for better performance with large datasets.
    The pagination would have controls with page numbers, next/previous buttons.
    I may also use additional react custom hook to manage the the pagination state.
    For large data set - I will consider virtualized scrolling.
    
  - ***Testing***: More test coverage for - components and functions.
  - ***Styling*** : I handled the styling at the final stage; with focus on simplicity. I would use Tailwind/Styled Components/Modules for improved UI. I decided to keep it native & simple per the task (just to show my command of CSS).

 
