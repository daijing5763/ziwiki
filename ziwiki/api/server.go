package api

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
	authRoutes.POST("/create_repo", server.createRepo)
	authRoutes.POST("/get_repo", server.getRepo)
	authRoutes.POST("/pull_repo", server.pullRepo)
	authRoutes.POST("/get_repo_list", server.listRepos)
	authRoutes.POST("/get_markdown", server.getMarkdown)
	authRoutes.Static("/static", "/tmp/wiki")
	server.router = router
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
