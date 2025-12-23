# PowerShell script to test the webhook endpoint
# Usage: .\test-webhook.ps1

$uri = "http://localhost:3000/api/leads"
$headers = @{
    "Content-Type" = "application/json"
    "x-select-therapy-key" = "ClinicPass2025!"
}

$body = @{
    patient_name = "Test Patient"
    phone_number = "555-1234"
    pain_reason = "Lower back pain"
    insurance = "Blue Cross"
    location = "Baxter"
    scheduling_prefs = "Friday mornings"
} | ConvertTo-Json

Write-Host "Testing webhook endpoint..." -ForegroundColor Cyan
Write-Host "URL: $uri" -ForegroundColor Gray
Write-Host "Body: $body" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $uri -Method POST -Headers $headers -Body $body -ErrorAction Stop
    
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    if ($response.success) {
        Write-Host "`nLead ID: $($response.lead_id)" -ForegroundColor Yellow
        Write-Host "`nCheck your dashboard to see the new lead!" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Error Details:" -ForegroundColor Red
        $_.ErrorDetails.Message | Write-Host
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

