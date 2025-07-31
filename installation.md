# Installation Guide

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (Latest LTS version)
- npm or yarn
- MySQL Server
- Bash (for running shell scripts)
- g++ or another C++ compiler (required for `code_runner` service)

## Project Structure
```
- Project
    - database
    - backend
         - main
         - code_runner
    - frontend
```

## Database Setup
1. Navigate to the `database` directory:
   ```sh
   cd Project/database
   ```
2. Run the SQL setup script:
   ```sh
   ./run_sql.sh
   ```

## Backend Setup
### Main Service
1. Navigate to the `main` directory:
   ```sh
   cd Project/backend/main
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and set up environment variables:
   ```env
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   DB_HOST=localhost                    
   DB_PORT=3306                           
   DB_USER=application                         
   DB_PASSWORD=Str0ngP@ssword!   
   DB_NAME=JUDGE_DB
   TOKEN_SECRET=secret
   RUNNER_URL=http://localhost:2000
   ```
4. Start the service:
   ```sh
   npm run dev
   ```

### Code Runner Service
1. Ensure you have `g++` or another C++ compiler installed.
2. Navigate to the `code_runner` directory:
   ```sh
   cd Project/backend/code_runner
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and set up environment variables:
   ```env
   PORT=2000
   MAIN_URL=http://localhost:3000
   ```
5. Start the service:
   ```sh
   npm run dev
   ```

## Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd Project/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Running the Application
Once all services are up and running, access the frontend at:
```
http://localhost:5173
```

The backend main service should be running at:
```
http://localhost:3000
```

The code runner service should be running at:
```
http://localhost:2000
```

## Notes
- Ensure MySQL is running before starting the backend services.
- Ensure `g++` or another C++ compiler is installed for the `code_runner` service.
- Modify the `.env` files as needed for different environments.

