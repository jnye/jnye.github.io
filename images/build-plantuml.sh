#!/bin/bash
set -ev
plantuml "$1".txt
convert "$1".png -transparent "#ffffff" tmp.png
mv tmp.png "$1".png

