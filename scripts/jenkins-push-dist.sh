#!/bin/bash

JS_BUILD_DIR="build"
DIST_REPO="https://github.com/ramsingh83/monthCalendar-dist.git"
DIST_CLONE_LOCATION="dist"

if [ "$(ls -A $JS_BUILD_DIR)" ]; then
     echo "Folder $JS_BUILD_DIR contains files. Pushing result to distributable repo"

     git clone --depth 1 ${DIST_REPO} ${DIST_CLONE_LOCATION} || exit 1

     cd ${DIST_CLONE_LOCATION} && git rm -r *
     cp -vr ../${JS_BUILD_DIR}/* .

     git add -A
     git commit -m "Automated commit - BRANCH: ${GIT_BRANCH} - BUILD: ${BUILD_NUMBER}"
     git push origin HEAD
else
    echo "$JS_BUILD_DIR is empty"
    exit 1
fi
