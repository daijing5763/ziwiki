package api

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
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

func TestGetRepoAPI(t *testing.T) {
	user, _ := randomUser(t)
	repo := randomRepo(user.ID)

	testCases := []struct {
		name          string
		repoID        int64
		setupAuth     func(t *testing.T, request *http.Request, tokenMaker token.Maker)
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(t *testing.T, recoder *httptest.ResponseRecorder)
	}{
		{
			name:   "OK",
			repoID: repo.ID,
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetRepo(gomock.Any(), gomock.Eq(repo.ID)).
					Times(1).
					Return(repo, nil)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchRepo(t, recorder.Body, repo)
			},
		},
		{
			name:   "UnauthorizedUser",
			repoID: repo.ID,
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, 12345, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetRepo(gomock.Any(), gomock.Eq(repo.ID)).
					Times(1).
					Return(repo, nil)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnauthorized, recorder.Code)
			},
		},
		{
			name:   "NoAuthorization",
			repoID: repo.ID,
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetRepo(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnauthorized, recorder.Code)
			},
		},
		{
			name:   "NotFound",
			repoID: repo.ID,
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},

			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetRepo(gomock.Any(), gomock.Eq(repo.ID)).
					Times(1).
					Return(db.Repo{}, sql.ErrNoRows)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusNotFound, recorder.Code)
			},
		},
		{
			name:   "InternalError",
			repoID: repo.ID,
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetRepo(gomock.Any(), gomock.Eq(repo.ID)).
					Times(1).
					Return(db.Repo{}, sql.ErrConnDone)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
		{
			name:   "InvalidID",
			repoID: 0,
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetRepo(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(t *testing.T, recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusBadRequest, recorder.Code)
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

			url := fmt.Sprintf("/repos/%d", tc.repoID)
			request, err := http.NewRequest(http.MethodGet, url, nil)
			require.NoError(t, err)

			tc.setupAuth(t, request, server.tokenMaker)
			server.router.ServeHTTP(recorder, request)
			tc.checkResponse(t, recorder)
		})
	}
}
func TestCreateRepoAPI(t *testing.T) {
	user, _ := randomUser(t)
	repo := randomRepo(user.ID)

	testCases := []struct {
		name          string
		body          gin.H
		setupAuth     func(t *testing.T, request *http.Request, tokenMaker token.Maker)
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recoder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			body: gin.H{
				"repo_name":         repo.RepoName,
				"repo_git":          repo.RepoGit,
				"repo_user_name":    repo.RepoUserName,
				"repo_access_token": repo.RepoAccessToken,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.CreateRepoParams{
					UserID:          repo.UserID,
					RepoName:        repo.RepoName,
					RepoGit:         repo.RepoGit,
					RepoUserName:    repo.RepoUserName,
					RepoAccessToken: repo.RepoAccessToken,
				}
				store.EXPECT().
					CreateRepo(gomock.Any(), gomock.Eq(arg)).
					Times(1).
					Return(repo, nil)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				t.Log("mydebug:", recorder.Code)
				t.Log("mydebug:", recorder.Body)
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchRepo(t, recorder.Body, repo)
			},
		},
		{
			name: "NoAuthorization",
			body: gin.H{
				"repo_name":         repo.RepoName,
				"repo_git":          repo.RepoGit,
				"repo_user_name":    repo.RepoUserName,
				"repo_access_token": repo.RepoAccessToken,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					CreateRepo(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnauthorized, recorder.Code)
			},
		},
		{
			name: "InternalError",
			body: gin.H{
				"repo_name":         repo.RepoName,
				"repo_git":          repo.RepoGit,
				"repo_user_name":    repo.RepoUserName,
				"repo_access_token": repo.RepoAccessToken,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					CreateRepo(gomock.Any(), gomock.Any()).
					Times(1).
					Return(db.Repo{}, sql.ErrConnDone)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
		{
			name: "InvalidRepoName",
			body: gin.H{
				"repo_name":         342,
				"repo_git":          repo.RepoGit,
				"repo_user_name":    repo.RepoUserName,
				"repo_access_token": repo.RepoAccessToken,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					CreateRepo(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusBadRequest, recorder.Code)
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
			require.NoError(t, err)

			url := "/repos"
			request, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(data))
			require.NoError(t, err)

			tc.setupAuth(t, request, server.tokenMaker)
			server.router.ServeHTTP(recorder, request)
			tc.checkResponse(recorder)
		})
	}
}

func randomRepo(user_id int64) db.Repo {
	return db.Repo{
		ID:              util.RandomInt(1, 10000),
		UserID:          user_id,
		RepoName:        util.RandomString(20),
		RepoGit:         "https://gitee.com/zizdlp/wiki.git",
		RepoUserName:    "zizdlp",
		RepoAccessToken: "zzz123",
	}
}
func requireBodyMatchRepo(t *testing.T, body *bytes.Buffer, repo db.Repo) {
	data, err := ioutil.ReadAll(body)
	require.NoError(t, err)

	var gotRepo db.Repo
	err = json.Unmarshal(data, &gotRepo)
	require.NoError(t, err)
	require.Equal(t, repo, gotRepo)
}
