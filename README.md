# Contact center project

## How to set up

* Clone the repository
```
git clone https://github.com/evtimkirov/contact-center.git
cd contact-center
```

* Start the Docker containers
```
docker compose up --build
```

## Specifics

* The frontend can be accessed at http://localhost:3001/
  * Login with 
    * Email: `admin@squaretalk.com`
    * Password: `password`
* The backend (API) can be accessed at http://localhost:8080/

## Used  technologies
* JavaScript
  * React + Redux (used React toolkit)
  * Axios
* PHP & MySQL
  * Laravel
    * CORS  
    * Sanctum with cookie-based token
    * Eloquent with migrations, seeders, and factories
    * Redis
    * PHPUnit tests
    * Separated request validations
* Infrastructure 
  * Git with GitHub
    * GitHub actions (example here https://github.com/evtimkirov/contact-center/actions/runs/17825668116/job/50678155730 )
  * Docker
  * Separated container for the backend, frontend, MySQL, and Redis.

## Project Structure
* backend/   
* frontend/  
* docker-compose.yml
