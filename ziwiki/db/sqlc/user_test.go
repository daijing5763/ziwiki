package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/zdlpsina/ziwiki/util"
)

func createRandomUser(t *testing.T) User {
	hashedPassword, err := util.HashPassword(util.RandomString(6))
	require.NoError(t, err)

	arg := CreateUserParams{
		Username:       util.RandomUsername(),
		Email:          util.RandomEmail(),
		HashedPassword: hashedPassword,
	}

	user, err := testQueries.CreateUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, user)
	require.Equal(t, arg.Username, user.Username)
	require.Equal(t, arg.HashedPassword, user.HashedPassword)
	require.Equal(t, arg.Email, user.Email)
	require.NotZero(t, user.CreatedAt)
	return user
}

func TestCreateUser(t *testing.T) {
	createRandomUser(t)
}

func TestGetUser(t *testing.T) {
	user1 := createRandomUser(t)
	user2, err := testQueries.GetUser(context.Background(), user1.Username)
	require.NoError(t, err)
	require.NotEmpty(t, user2)

	require.Equal(t, user1.Username, user2.Username)
	require.Equal(t, user1.HashedPassword, user2.HashedPassword)
	require.Equal(t, user1.Email, user2.Email)
	require.WithinDuration(t, user1.CreatedAt, user2.CreatedAt, time.Second)
}
func TestGetUserForUpdate(t *testing.T) {
	user1 := createRandomUser(t)
	user2, err := testQueries.GetUserForUpdate(context.Background(), user1.ID)
	require.NoError(t, err)
	require.NotEmpty(t, user2)

	require.Equal(t, user1.Username, user2.Username)
	require.Equal(t, user1.HashedPassword, user2.HashedPassword)
	require.Equal(t, user1.Email, user2.Email)
	require.WithinDuration(t, user1.CreatedAt, user2.CreatedAt, time.Second)
}

func TestDeleteUser(t *testing.T) {
	user1 := createRandomUser(t)
	err := testQueries.DeleteUser(context.Background(), user1.ID)
	require.NoError(t, err)
	user2, err := testQueries.GetUser(context.Background(), user1.Username)
	require.Empty(t, user2)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error())
}

func TestUpdateUser(t *testing.T) {
	user1 := createRandomUser(t)

	arg := UpdateUserParams{
		ID:             user1.ID,
		Username:       util.RandomUsername(),
		Email:          util.RandomEmail(),
		HashedPassword: util.RandomString(6),
	}
	user2, err := testQueries.UpdateUser(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, user2)
	require.Equal(t, user2.ID, arg.ID)
	require.Equal(t, user2.Email, arg.Email)
	require.Equal(t, user2.Username, arg.Username)
	require.Equal(t, user2.HashedPassword, arg.HashedPassword)
}
