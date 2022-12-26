package api

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/token"
)

type listSessionsRequest struct {
	PageID   int32 `json:"page_id" binding:"required,min=1"`
	PageSize int32 `json:"page_size" binding:"required,min=5,max=10"`
}

func (server *Server) listSession(ctx *gin.Context) {
	var req listSessionsRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	admin_user, err := server.store.GetUser(ctx, "admin")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserID != admin_user.ID {
		err := errors.New("current user is not admin user")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}
	arg := db.ListSessionsParams{
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	repos, err := server.store.ListSessions(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, repos)
}

func (server *Server) listActiveSession(ctx *gin.Context) {
	var req listSessionsRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	admin_user, err := server.store.GetUser(ctx, "admin")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserID != admin_user.ID {
		err := errors.New("current user is not admin user")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}
	arg := db.ListActiveSessionsParams{
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	repos, err := server.store.ListActiveSessions(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, repos)
}

type banSessionRequest struct {
	ID        uuid.UUID `json:"id" binding:"required"`
	IS_LOCKED *bool     `json:"is_locked" binding:"required"`
}

func (server *Server) banSession(ctx *gin.Context) {
	var req banSessionRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	admin_user, err := server.store.GetUser(ctx, "admin")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserID != admin_user.ID {
		err := errors.New("current user is not admin user")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}
	arg := db.BanSessionParams{
		ID:        req.ID,
		IsBlocked: *req.IS_LOCKED,
	}
	repos, err := server.store.BanSession(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, repos)
}
