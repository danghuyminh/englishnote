for /f "tokens=14" %%a in ('ipconfig ^| findstr 192.168.1\.') do set _IPaddr=%%a
echo IP is: %_IPaddr%
set REACT_NATIVE_PACKAGER_HOSTNAME=%_IPaddr%
expo start
