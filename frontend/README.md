# Life Insurance Recommendation Frontend

A Next.js-based frontend for a life insurance recommendation MVP, built with TypeScript, Formik, Yup, and Tailwind CSS. It provides a single-page form to collect user inputs (age, income, dependents, and risk tolerance) and displays personalized recommendations from a backend API.

## Features

- **Single-Page Form**: Collects user inputs with client-side validation.
- **Validation**: Uses Formik and Yup for robust form validation.
- **Responsive Design**: Styled with Tailwind CSS for a clean, mobile-friendly UI.
- **API Integration**: Communicates with a backend API at `http://localhost:3001/api/recommendation`.
- **Error Handling**: Displays validation and server errors clearly.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running at `http://localhost:3001/api/recommendation`

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   Required dependencies:
   - `next`, `react`, `react-dom`
   - `formik`, `yup`
   - Dev dependencies: `typescript`, `@types/react`, `@types/node`, `tailwindcss`, `postcss`, `autoprefixer`, `@types/yup`

3. **Configure Tailwind CSS**
   Ensure the following files are in the project root:
   - `tailwind.config.js`:
     ```javascript
     module.exports = {
       content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
       theme: { extend: {} },
       plugins: [],
     };
     ```
   - `postcss.config.js`:
     ```javascript
     module.exports = {
       plugins: {
         tailwindcss: {},
         autoprefixer: {},
       },
     };
     ```

4. **Run the Application**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

## Usage

1. Open `http://localhost:3000` in a browser.
2. Fill out the form with:
   - Age (18–100)
   - Annual Income (non-negative, supports decimals)
   - Number of Dependents (non-negative integer)
   - Risk Tolerance (Low, Medium, or High)
3. Submit the form to receive a personalized recommendation and explanation.
4. Validation errors will appear below each field if inputs are invalid.
5. Server errors, if any, will display below the form.

## Project Structure

- `pages/index.tsx`: Main page with the form and recommendation display.
- `tailwind.config.js`: Tailwind CSS configuration.
- `postcss.config.js`: PostCSS configuration for Tailwind.

## Notes

- **Backend Dependency**: The frontend expects a backend API at `http://localhost:3001/api/recommendation`. Ensure the backend is running (e.g., the NestJS backend provided previously).
- **Validation**: Client-side validation is handled by Yup, complementing server-side validation.
- **Production**: For production, build the app with `npm run build` and serve with `npm run start`.

## Development

- To add new form fields, update the `initialValues` and `validationSchema` in `pages/index.tsx`.
- To modify styling, adjust Tailwind classes in `index.tsx` or extend `tailwind.config.js`.