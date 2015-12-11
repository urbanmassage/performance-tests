NO_LOG=1 node index > NEW_README.md

git checkout gh-pages

rm README.md || true
mv NEW_README.md README.md
git add README.md
git commit -m "Circle build from $CIRCLE_SHA1"
git push origin gh-pages
