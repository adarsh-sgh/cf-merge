// ⚡️ Fiber is an Express inspired web framework written in Go with ☕️
// 🤖 Github Repository: https://github.com/gofiber/fiber
// 📌 API Documentation: https://docs.gofiber.io

package main

import (
	"fmt"
	"log"
	"os"

	"github.com/adarsh-sgh/cf-merge/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

// setup two routes, one for shortening the url
// the other for resolving the url
// for example if the short is `4fg`, the user
// must navigate to `localhost:3000/4fg` to redirect to
// original URL. The domain can be changes in .env file
// allow CORS for localhost and https://cf-merge-backend.onrender.com/
func setupRoutes(app *fiber.App) {
	app.Use(cors.New(
		cors.Config{
			AllowOrigins: "http://localhost:5173, https://cf-merge-backend.onrender.com",
			AllowHeaders: "Origin, Content-Type, Accept",
			AllowMethods: "GET, POST, OPTIONS",
		},
	))
	app.Get("/:url", routes.ResolveURL)
	app.Post("/api/v1", routes.ShortenURL)
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	app := fiber.New()

	//app.Use(csrf.New())
	app.Use(logger.New())

	setupRoutes(app)

	log.Fatal(app.Listen(os.Getenv("PORT")))
}
