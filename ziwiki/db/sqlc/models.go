// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.14.0

package db

import (
	"time"

	"github.com/google/uuid"
)

type Markdown struct {
	ID        int64       `json:"id"`
	Mdhref    string      `json:"mdhref"`
	UserID    int64       `json:"user_id"`
	RepoID    int64       `json:"repo_id"`
	Mdtext    string      `json:"mdtext"`
	CreatedAt time.Time   `json:"created_at"`
	Fts       interface{} `json:"fts"`
}

type Repo struct {
	ID              int64     `json:"id"`
	UserID          int64     `json:"user_id"`
	RepoName        string    `json:"repo_name"`
	RepoGit         string    `json:"repo_git"`
	RepoAccessType  string    `json:"repo_access_type"`
	RepoUserName    string    `json:"repo_user_name"`
	RepoAccessToken string    `json:"repo_access_token"`
	RepoFrom        string    `json:"repo_from"`
	RepoDescribe    string    `json:"repo_describe"`
	CreatedAt       time.Time `json:"created_at"`
}

type Session struct {
	ID           uuid.UUID `json:"id"`
	UserID       int64     `json:"user_id"`
	RefreshToken string    `json:"refresh_token"`
	UserAgent    string    `json:"user_agent"`
	ClientIp     string    `json:"client_ip"`
	IsBlocked    bool      `json:"is_blocked"`
	ExpiresAt    time.Time `json:"expires_at"`
	CreatedAt    time.Time `json:"created_at"`
}

type User struct {
	ID             int64     `json:"id"`
	Username       string    `json:"username"`
	Email          string    `json:"email"`
	HashedPassword string    `json:"hashed_password"`
	CreatedAt      time.Time `json:"created_at"`
}
