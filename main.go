package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.LoadHTMLGlob("site/*.html")
	router.Static("/site", "./site")

	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "main.html", nil)
	})

	router.POST("/jsondata", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"some": "test"})
	})

	router.Run("localhost:8080")
}
