Write-Host "stop and remove containers"
Invoke-Expression -Command "docker rm -f $(docker ps -aq)"



Write-Host "run containers"
Invoke-Expression -Command "docker compose build"
Invoke-Expression -Command "docker-compose up -d"

Read-Host "Press Enter to continue..."
