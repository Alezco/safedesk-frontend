#!/usr/bin/env bash

echo "current branch: $TRAVIS_BRANCH"
echo "pull request: $TRAVIS_PULL_REQUEST"
if [[ $TRAVIS_BRANCH != 'master' || $TRAVIS_PULL_REQUEST != "false" ]]; then
  echo "only deploying on the master branch"
  exit 0;
fi

DEPLOY_SERVER_LOG=`curl --data "application=safedesk-frontend&key=$DEPLOY_KEY" https://deploy.gitcommit.fr/deploy-application-hook.php`
echo "Server log:"
echo "$DEPLOY_SERVER_LOG"

# Globbing for keywords in server log output
case "$DEPLOY_SERVER_LOG" in
  *APPLICATION\ DEPLOYED*)
    exit 0
    ;;
  *DEPLOY\ ERROR*)
    exit 1
    ;;
  *)
    echo "NO DEFAULT KEYWORD RESPONSE FOUND. WRONG SERVER OUTPUT"
    exit 1
  ;;
esac
