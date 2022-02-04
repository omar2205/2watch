#!/usr/bin/bash

# Example deploy

# Extension Dir
# In chromeuim broweser:
# 1. Go to Extensions and enable developer mode
# 2. Load unpacked and select this dir

DIR=/mnt/d/shared/ch_2watch

echo "Moving /build dir to extension location"

cp -rf build "${DIR}"
