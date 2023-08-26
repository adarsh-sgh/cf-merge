package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/adarsh-sgh/cf-merge/database"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

// ResolveURL ...
func ResolveURL(c *fiber.Ctx) error {
	// get the short from the url
	url := c.Params("url")
	// query the db to find the original URL, if a match is found
	// increment the redirect counter and redirect to the original URL
	// else return error message
	r := database.CreateClient(0)
	defer r.Close()

	value, err := r.SMembers(database.Ctx, url).Result()
	if err == redis.Nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "short not found on database",
		})
	} else if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "cannot connect to DB",
		})
	}
// redis cloud allows only dbNo = 0 for free tier
	rInr := database.CreateClient(0)
	defer rInr.Close()
	_ = rInr.Incr(database.Ctx, "counter")
	// redirect to original URL
	selectedProfile := "https://codeforces.com/profile/"+SelectProfile(value)
	return c.Redirect(selectedProfile, 301)
}

type userData struct {
	Handle string `json:"handle"`
	Rating int `json:"rating"`
}
type cfResponse struct {
	Status string `json:"status"`
	Result []userData `json:"result"`
}

func SelectProfile(profiles []string) string {
	users := strings.Join(profiles, ";")
	userInfoUrl := fmt.Sprintf("https://codeforces.com/api/user.info?handles=%s", users)
	log.Println(userInfoUrl)
	resp, err := http.Get(userInfoUrl)
	if err != nil {
		log.Println(err)
	}
	defer resp.Body.Close()
	var userInfos cfResponse
	fmt.Printf("%+v\n", resp.Body)
	if err := json.NewDecoder(resp.Body).Decode(&userInfos); err != nil {
		log.Println(err)
	}
	if userInfos.Status != "OK" {
		log.Println("Error in fetching user info")
		log.Println(userInfos)
	}
	maxRating := 0
	maxRatingUser := ""
	for _, user := range userInfos.Result {
		if user.Rating > maxRating {
			maxRating = user.Rating
			maxRatingUser = user.Handle
		}
	}
	return maxRatingUser
}

