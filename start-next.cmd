@echo off
cd /d "%~dp0"
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000 > next-dev.log 2> next-dev-error.log
