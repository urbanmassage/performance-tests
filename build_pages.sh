node page

git checkout gh-pages

rm index.html || true
mv new_index.html index.html
git add index.html

git config user.email "bot@urbanmassage.com"
git config user.name "UrbanMassage Bot"

git commit -m "Circle build from $CIRCLE_SHA1\
\
https://circleci.com/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_BUILD_NUM"
git push origin gh-pages
