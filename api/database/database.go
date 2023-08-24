package database

import (
	"context"
	"log"
	"os"

	"github.com/go-redis/redis/v8"
)

var Ctx = context.Background()

func CreateClient(dbNo int) *redis.Client {
	DB_HOST := os.Getenv("DB_HOST")
	DB_PORT := os.Getenv("DB_PORT")
	if DB_HOST == "" {
		DB_HOST = "localhost"
	}
	if DB_PORT == "" {
		DB_PORT = "6379"
	}
	DB_HOST = DB_HOST + ":" + DB_PORT
	log.Println("DB_HOST: ", DB_HOST)
	DB_PASS := os.Getenv("DB_PASS")
	rdb := redis.NewClient(&redis.Options{
		Addr:     DB_HOST,
		Password: DB_PASS,
		DB:       dbNo,
	})
	return rdb
}
