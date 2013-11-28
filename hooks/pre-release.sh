#!/usr/bin/env bash
#
# INFO: This not an official Git hook
# @see `git-release` of git-extras (https://github.com/visionmedia/git-extras)
#
# This is called before `git release`


# make sure the dist is built first
grunt build


# update package.json with version being released
#
# a little hack to get the new version
# @see https://gist.github.com/fent/3140668
RELEASE_PROCESS=`ps x | grep 'git-release' | head -1 | grep -o -E '[0-9]+\.[0-9]+\.[0-9]+'`

grunt bumpup:$RELEASE_PROCESS
