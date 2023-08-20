package database

import (
	"context"
	"github.com/go-redis/redis/v8"
	"os"
	"fmt"
)

var Ctx = context.Background()

func CreateClient(dbNo int) *redis.Client {
	_,DOCKER := os.LookupEnv("DOCKER")
	var hostname string
	if(DOCKER){
		hostname = "db"
	}else{
		hostname = "localhost"
	}
	DB_ADDR := hostname + ":" + os.Getenv("DB_ADDR")
	DB_PASS := os.Getenv("DB_PASS")
	rdb := redis.NewClient(&redis.Options{
		Addr:     DB_ADDR,
		Password: DB_PASS,
		DB:       dbNo,
	})
	return rdb
}
