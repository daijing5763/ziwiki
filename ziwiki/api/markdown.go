package api

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/zdlpsina/ziwiki/token"
)

type getMarkdownRequest struct {
	Href string `uri:"mdhref" binding:"required,min=1"`
}

func (server *Server) getMarkdown(ctx *gin.Context) {
	var req getMarkdownRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	markdown, err := server.store.GetMarkdown(ctx, req.Href)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if markdown.UserID != authPayload.UserID {
		err := errors.New("account doesn't belong to the authenticated user")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, markdown)
}
