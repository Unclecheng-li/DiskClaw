!include "MUI2.nsh"

!macro customInstall
  WriteRegStr HKCR "diskclaw" "" "URL:DiskClaw Protocol"
  WriteRegStr HKCR "diskclaw" "URL Protocol" ""
  WriteRegStr HKCR "diskclaw\\shell\\open\\command" "" '"$INSTDIR\\${APP_EXECUTABLE_FILENAME}" "%1"'

  WriteRegStr HKCR "Directory\\shell\\DiskClawScan" "" "用磁盘清理大虾扫描"
  WriteRegStr HKCR "Directory\\shell\\DiskClawScan" "Icon" "$INSTDIR\\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "Directory\\shell\\DiskClawScan\\command" "" '"$INSTDIR\\${APP_EXECUTABLE_FILENAME}" "diskclaw://scan?path=%1"'
!macroend

!macro customUnInstall
  DeleteRegKey HKCR "diskclaw"
  DeleteRegKey HKCR "Directory\\shell\\DiskClawScan"
!macroend
