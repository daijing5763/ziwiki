package api

import (
	"database/sql"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/gitsync"
	"github.com/zdlpsina/ziwiki/token"
)

type createRepoRequest struct {
	RepoName        string `json:"repo_name" binding:"required"`
	RepoGit         string `json:"repo_git" binding:"required"`
	RepoUserName    string `json:"repo_user_name" binding:"required"`
	RepoAccessToken string `json:"repo_access_token" binding:"required"`
	RepoFrom        string `json:"repo_from" binding:"required"`
	RepoDescribe    string `json:"repo_describe" binding:"required"`
}

func (server *Server) createRepo(ctx *gin.Context) {
	var req createRepoRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	arg := db.CreateRepoParams{
		UserID:          authPayload.UserID,
		RepoName:        req.RepoName,
		RepoGit:         req.RepoGit,
		RepoUserName:    req.RepoUserName,
		RepoAccessToken: req.RepoAccessToken,
		RepoFrom:        req.RepoFrom,
		RepoDescribe:    req.RepoDescribe,
	}

	repo, err := server.store.CreateRepo(ctx, arg)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "foreign_key_violation", "unique_violation":
				ctx.JSON(http.StatusForbidden, errorResponse(err))
				return
			}
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	err = gitsync.Clone("/tmp/wiki/", strconv.FormatInt(repo.UserID, 10), strconv.FormatInt(repo.ID, 10), repo.RepoGit, repo.RepoUserName, repo.RepoAccessToken)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, repo)
}

type getRepoRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) getRepo(ctx *gin.Context) {
	var req getRepoRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	repo, err := server.store.GetRepo(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if repo.UserID != authPayload.UserID {
		err := errors.New("account doesn't belong to the authenticated user")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, repo)
}

type listRepoRequest struct {
	PageID   int32 `json:"page_id" binding:"required,min=1"`
	PageSize int32 `json:"page_size" binding:"required,min=5,max=10"`
}

func (server *Server) listRepos(ctx *gin.Context) {
	var req listRepoRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	arg := db.ListReposParams{
		UserID: authPayload.UserID,
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	repos, err := server.store.ListRepos(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, repos)
}
