package gitclone

import (
	"fmt"
	"os/exec"
)

func Native(user_id string, repo_id string, git_path string, user_name string, access_token string) string {
	cmd, err := exec.Command("/bin/bash", "/app/git.sh", user_id, repo_id, git_path, user_name, access_token).Output()

	if err != nil {
		fmt.Printf("error %s", err)
	}

	output := string(cmd)
	return output
}
