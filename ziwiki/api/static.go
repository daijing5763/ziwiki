package api

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/zdlpsina/ziwiki/token"
)

// type getStaticRequest struct {
// 	RepoID int64  `json:"repo_id" binding:"required"`
// 	href   string `json:"href" binding:"required"`
// }

// func (server *Server) getStatic(ctx *gin.Context) {
// 	var req getStaticRequest
// 	if err := ctx.ShouldBindJSON(&req); err != nil {
// 		ctx.JSON(http.StatusBadRequest, errorResponse(err))
// 		return
// 	}
// 	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
// 	path := "/tmp/wiki/" + strconv.FormatInt(authPayload.UserID, 10) + "/" + strconv.FormatInt(req.RepoID, 10) + "/" + req.href
// 	ctx.File(path)
// }

func (server *Server) uploadProfile(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	path := "/tmp/wiki/" + strconv.FormatInt(authPayload.UserID, 10) + "/" + "profile.png"
	ctx.File(path)

	file, err := ctx.FormFile("file")
	if err != nil {
		fmt.Println("err:", err)
		return
	}
	err = ctx.SaveUploadedFile(file, path)
	if err != nil {
		fmt.Println("err:", err)
		return
	}
	ctx.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
}
