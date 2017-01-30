PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

git config --global user.email "gitlabrunner@nhs.com"
git config --global user.name "Gitlabrunner"
git clone git@gitlab00.node.consul:bsa-design/nhs-template.git .deploy
# git clone ssh://git@localhost:10022/home-styles/nhs-template.git .deploy
# git clone git@gitlab.domain.net:group-name/project-name.git .deploy
rm -rf .deploy/images .deploy/javascripts .deploy/stylesheets
cp -R dist/* .deploy
cd .deploy
# sed -i "" "s/\"version\": \".*\",/\"version\": \"$PACKAGE_VERSION\",/" package.json
git add -A
git commit -m "Deploying and releasing version $PACKAGE_VERSION"
git tag $PACKAGE_VERSION
git push origin master
git push --tags
cd ..
rm -rf .deploy
