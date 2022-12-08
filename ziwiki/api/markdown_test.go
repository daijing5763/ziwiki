package api

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
	mockdb "github.com/zdlpsina/ziwiki/db/mock"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/token"
	"github.com/zdlpsina/ziwiki/util"
)

func TestGetMarkdownAPI(t *testing.T) {
	user, _ := randomUser(t)
	repo := randomRepo(user.ID)
	markdown := randomMarkdown(user.ID, repo.ID)
	testCases := []struct {
		name          string
		body          gin.H
		setupAuth     func(t *testing.T, request *http.Request, tokenMaker token.Maker)
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(t *testing.T, recoder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			body: gin.H{
				"mdhref":  markdown.Mdhref,
				"repo_id": markdown.RepoID,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.GetMarkdownParams{
					Mdhref: markdown.Mdhref,
					RepoID: markdown.RepoID,
					UserID: markdown.UserID,
				}
				store.EXPECT().
					GetMarkdown(gomock.Any(), gomock.Eq(arg)).
					Times(1).
					Return(markdown, nil)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchMarkdown(t, recorder.Body, markdown)
			},
		},
		{
			name: "NoAuthorization",
			body: gin.H{
				"mdhref":  markdown.Mdhref,
				"repo_id": markdown.RepoID,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetMarkdown(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnauthorized, recorder.Code)
			},
		},
		{
			name: "NotFound",
			body: gin.H{
				"mdhref":  "nohref",
				"repo_id": markdown.RepoID,
				"user_id": markdown.UserID,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},

			buildStubs: func(store *mockdb.MockStore) {
				arg := db.GetMarkdownParams{
					Mdhref: "nohref",
					RepoID: markdown.RepoID,
					UserID: markdown.UserID,
				}
				store.EXPECT().
					GetMarkdown(gomock.Any(), gomock.Eq(arg)).
					Times(1).
					Return(db.Markdown{}, sql.ErrNoRows)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusNotFound, recorder.Code)
			},
		},
		{
			name: "InternalError",
			body: gin.H{
				"mdhref":  markdown.Mdhref,
				"repo_id": markdown.RepoID,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.GetMarkdownParams{
					Mdhref: markdown.Mdhref,
					RepoID: markdown.RepoID,
					UserID: markdown.UserID,
				}
				store.EXPECT().
					GetMarkdown(gomock.Any(), gomock.Eq(arg)).
					Times(1).
					Return(db.Markdown{}, sql.ErrConnDone)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
	}
	for i := range testCases {
		tc := testCases[i]

		t.Run(tc.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			tc.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			// Marshal body data to JSON
			data, err := json.Marshal(tc.body)
			// fmt.Println("mydebug:req tcbody:", tc.body)
			require.NoError(t, err)

			url := "/get_markdown"
			request, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(data))

			require.NoError(t, err)
			// fmt.Println("mydebug:req body:", request.Body)
			tc.setupAuth(t, request, server.tokenMaker)
			server.router.ServeHTTP(recorder, request)
			tc.checkResponse(t, recorder)
		})
	}
}

func randomMarkdown(user_id int64, repo_id int64) db.Markdown {
	return db.Markdown{
		ID:     util.RandomInt(1, 10000),
		UserID: user_id,
		Mdhref: util.RandomString(20),
		Mdtext: util.RandomString(20),
		RepoID: repo_id,
	}
}

func requireBodyMatchMarkdown(t *testing.T, body *bytes.Buffer, markdown db.Markdown) {
	data, err := io.ReadAll(body)
	require.NoError(t, err)

	var gotMarkdown db.Markdown
	err = json.Unmarshal(data, &gotMarkdown)
	require.NoError(t, err)
	require.Equal(t, markdown, gotMarkdown)
}
