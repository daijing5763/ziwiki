package api

import (
	"fmt"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/unrolled/secure"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/token"
	"github.com/zdlpsina/ziwiki/util"
)

type Server struct {
	config     util.Config
	store      db.Store
	tokenMaker token.Maker
	router     *gin.Engine
}

func NewServer(config util.Config, store db.Store) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}
	server := &Server{
		config:     config,
		store:      store,
		tokenMaker: tokenMaker,
	}

	server.setupRouter()
	return server, nil
}
func (server *Server) setupRouter() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type,access-control-allow-origin, access-control-allow-headers", "Authorization"},
	}))
	//add routes
	router.POST("/users", server.createUser)
	router.POST("/users/login", server.loginUser)
	router.POST("/tokens/renew_access", server.renewAccessToken)
	router.Static("/static_get", "/tmp/wiki")
	// router.GET("/static", func(c *gin.Context) {
	// 	c.File("/tmp/wiki/0/4/case1.md")
	// })

	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))
	authRoutes.POST("/list_users", server.listUsers)
	authRoutes.POST("/ban_user", server.banUser)
	authRoutes.POST("/list_active_sessions", server.listActiveSession)
	authRoutes.POST("/list_sessions", server.listSession)
	authRoutes.POST("/ban_session", server.banSession)
	authRoutes.POST("/create_repo", server.createRepo)
	authRoutes.POST("/get_repo", server.getRepo)
	authRoutes.POST("/pull_repo", server.pullRepo)
	authRoutes.POST("/delete_repo", server.deleteRepo)
	authRoutes.POST("/update_repo", server.updateRepo)
	authRoutes.POST("/get_repo_list", server.listRepos)
	authRoutes.POST("/get_markdown", server.getMarkdown)
	authRoutes.POST("/query_markdown_user", server.queryMarkdownUser)
	authRoutes.POST("/query_markdown_repo", server.queryMarkdownRepo)
	authRoutes.Static("/static", "/tmp/wiki")
	server.router = router
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(address string, usehttps bool) error {
	if usehttps {
		server.router.Use(TlsHandler(8080))
		return server.router.RunTLS(address, "./bundle.crt", "./bundle.key")
	} else {
		return server.router.Run(address)
	}

}
func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func TlsHandler(port int) gin.HandlerFunc {
	return func(c *gin.Context) {
		secureMiddleware := secure.New(secure.Options{
			SSLRedirect: true,
			SSLHost:     ":" + strconv.Itoa(port),
		})
		err := secureMiddleware.Process(c.Writer, c.Request)

		// If there was an error, do not continue.
		if err != nil {
			return
		}

		c.Next()
	}
}
