# Purpose

- This project merges multiple codeforces accounts and generates single link
- when a user clicks on the link, it will redirect to the codeforces profile of the user with the highest rating

# Usecase
- it is meant to find out the best coder among a group of friends
- people misuse it to multiaccount on codeforces and put the shortened link in their resume 😼

# Tech Stack

### Backend

- golang
- redis

### Frontend

- react
- antd

# How to run
frontend and backend run independently and commmunicate via API calls

in development setup run backend using `go run main.go` from api folder
and frontend using `npm start` from frontend folder
you can use redis cloud for database
ensure .env file is present in api folder with correct values (see .env.sample)
