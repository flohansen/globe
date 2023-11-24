package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*.html")
	router.Static("/assets", "public")
	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index", nil)
	})
	router.Run()
}
