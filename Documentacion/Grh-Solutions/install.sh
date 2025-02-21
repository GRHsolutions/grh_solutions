# Abre una nueva ventana de PowerShell para ejecutar el frontend
powershell.exe -Command "Start-Process powershell -ArgumentList 'npm i' -WorkingDirectory './test.client'"

# Abre otra nueva ventana de PowerShell para ejecutar el backend
powershell.exe -Command "Start-Process powershell -ArgumentList 'npm i' -WorkingDirectory './test.server'"
