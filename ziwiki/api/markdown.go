package api

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/token"
)

type getMarkdownRequest struct {
	Href   string `json:"mdhref" binding:"required"`
	RepoID int64  `json:"repo_id" binding:"required"`
}

func (server *Server) getMarkdown(ctx *gin.Context) {
	var req getMarkdownRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	arg := db.GetMarkdownParams{
		Mdhref: req.Href,
		RepoID: req.RepoID,
		UserID: authPayload.UserID,
	}
	markdown, err := server.store.GetMarkdown(ctx, arg)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	if markdown.UserID != authPayload.UserID {
		err := errors.New("account doesn't belong to the authenticated user")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, markdown)
}
