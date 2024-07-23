param (
    [int]$ParentPID
)

function Stop-ProcessTree {
    param (
        [int]$ParentPID
    )

    # Get the list of child processes
    $childProcesses = Get-WmiObject Win32_Process | Where-Object { $_.ParentProcessId -eq $ParentPID }
    
    # Recursively stop child processes
    foreach ($childProcess in $childProcesses) {
        Stop-ProcessTree -ParentPID $childProcess.ProcessId
    }

    # Stop the parent process
    Stop-Process -Id $ParentPID -Force
}

Stop-ProcessTree -ParentPID $ParentPID
