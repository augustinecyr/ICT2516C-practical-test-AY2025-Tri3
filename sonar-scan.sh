#!/bin/sh
# Runs a local SonarQube scan of webapp/ against the sonarqube service
# from docker-compose.yml. Usage: SONAR_LOGIN=<token> ./sonar-scan.sh
set -e

docker run --rm --network practicaltest-24072026_default \
  -v "$(pwd)/webapp:/usr/src" \
  sonarsource/sonar-scanner-cli \
  -Dsonar.projectKey=ICT2516C-practical-test \
  -Dsonar.sources=/usr/src \
  -Dsonar.exclusions=**/node_modules/** \
  -Dsonar.host.url=http://sonarqube:9000 \
  -Dsonar.login="$SONAR_LOGIN"
