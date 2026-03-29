# PowerShell Script to seed data into the Railway Reservation System
# Ensure Discovery Server, Train Service, and API Gateway are running before executing this.

$baseUrl = "http://localhost:8080"

# 1. Add Stations
Write-Host "Adding Stations..."
Invoke-RestMethod -Uri "$baseUrl/api/trains/stations" -Method Post -ContentType "application/json" -Body '{"code": "NDLS", "name": "New Delhi"}'
Invoke-RestMethod -Uri "$baseUrl/api/trains/stations" -Method Post -ContentType "application/json" -Body '{"code": "BCT", "name": "Mumbai Central"}'
Invoke-RestMethod -Uri "$baseUrl/api/trains/stations" -Method Post -ContentType "application/json" -Body '{"code": "MAS", "name": "Chennai Central"}'

# 2. Add a Train
Write-Host "Adding a Train..."
$train = Invoke-RestMethod -Uri "$baseUrl/api/trains" -Method Post -ContentType "application/json" -Body '{"trainNumber": "12952", "name": "Rajdhani Express", "type": "Superfast"}'

# 3. Add a Route (NDLS to BCT)
Write-Host "Adding a Route (NDLS -> BCT)..."
Invoke-RestMethod -Uri "$baseUrl/api/trains/routes" -Method Post -ContentType "application/json" -Body '{
    "train": {"id": 1},
    "sourceStation": {"id": 1},
    "destinationStation": {"id": 2},
    "departureTime": "16:30:00",
    "arrivalTime": "08:15:00",
    "fare": 2500.0
}'

Write-Host "`nData seeding complete! You can now search for NDLS to BCT in the frontend."
