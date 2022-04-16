package main

import (
	// "crypto/tls"
	// "fmt"
	"net/http"
	// "path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	// "golang.org/x/crypto/acme/autocert"
)

// func getSelfSignedOrLetsEncryptCert(certManager *autocert.Manager) func(hello *tls.ClientHelloInfo) (*tls.Certificate, error) {
// 	return func(hello *tls.ClientHelloInfo) (*tls.Certificate, error) {
// 		dirCache, ok := certManager.Cache.(autocert.DirCache)
// 		if !ok {
// 			dirCache = "./certs"
// 		}

// 		keyFile := filepath.Join(string(dirCache), hello.ServerName+".key")
// 		crtFile := filepath.Join(string(dirCache), hello.ServerName+".crt")
// 		certificate, err := tls.LoadX509KeyPair(crtFile, keyFile)
// 		if err != nil {
// 			fmt.Printf("%s\nFalling back to Letsencrypt\n", err)
// 			return certManager.GetCertificate(hello)
// 		}
// 		fmt.Println("Loaded selfsigned certificate.")
// 		return &certificate, err
// 	}
// }

func main() {
	router := gin.Default()

	router.LoadHTMLGlob("site/*.html")
	router.Static("/site", "./site")
	router.StaticFile("/favicon.ico", "./site/images/favicon.ico")

	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "main.html", nil)
	})

	router.POST("/jsondata", func(ctx *gin.Context) {
		jsonStr := `{"msg":"this worked"}`
		ctx.DataFromReader(http.StatusOK, int64(len(jsonStr)), gin.MIMEJSON, strings.NewReader(jsonStr), nil)
	})

	router.Run("10.0.2.15:8080")

	// certManager := autocert.Manager{
	// 	Prompt:     autocert.AcceptTOS,
	// 	HostPolicy: autocert.HostWhitelist("test.site.io"),
	// 	Cache:      autocert.DirCache("./certs"),
	// }

	// tlsConfig := certManager.TLSConfig()
	// tlsConfig.GetCertificate = getSelfSignedOrLetsEncryptCert(&certManager)

	// server := http.Server{
	// 	Addr:      ":443",
	// 	Handler:   router,
	// 	TLSConfig: tlsConfig,
	// }

	// go http.ListenAndServe(":80", certManager.HTTPHandler(nil))
	// fmt.Println("Server listening on", server.Addr)
	// if err := server.ListenAndServeTLS("", ""); err != nil {
	// 	fmt.Println(err)
	// }
}
