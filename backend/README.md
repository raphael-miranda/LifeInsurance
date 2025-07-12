# Life Insurance Recommendation Backend

A NestJS-based backend for generating personalized life insurance recommendations.

## Features

- REST API with `/recommendation` endpoint
- Joi for input validation
- TypeORM for PostgreSQL database interactions
- Swagger for API documentation (`/api`)

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Copy `.env.example` to `.env` and update with your PostgreSQL credentials.

4. **Run Database Migrations**
   Ensure PostgreSQL is running, then:
   ```bash
   npm run start:dev
   ```
   TypeORM's `synchronize: true` will create the schema automatically (disable in production).

5. **Run the Application**
   ```bash
   npm run start:dev
   ```
   - API: `http://localhost:3001/api`
   - Swagger: `http://localhost:3001/doc`

## API Endpoints

- **POST /recommendation**
  - Request Body: `{ "age": 30, "income": 50000, "dependents": 2, "riskTolerance": "Medium" }`
  - Response: `{ "recommendation": "Term Life – $600000.00 for 30 years", "explanation": "..." }`

## Notes

- **Validation**: Joi ensures robust input validation.
- **Database**: TypeORM with PostgreSQL, auto-synchronized for development.
- **Swagger**: Access API docs at `/doc`.
- **Production**: Set `synchronize: false` in `typeorm.config.ts` and use migrations.