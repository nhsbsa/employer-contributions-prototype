PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

DESCRIPTION=$(cat package.json | grep description | sed 's/\"description\"//gmi' | tr \" ' ' | sed 's/\:  //g')

GIT_CURRENT_EMAIL=$(git config --global --get user.email)
GIT_CURRENT_USERNAME=$(git config --global --get user.name)

if [ -v $GIT_CURRENT_EMAIL ]
    then
        echo "GIT USER EMAIL SET AS: $GIT_CURRENT_EMAIL"
        echo "GIT USER NAME SET AS: $GIT_CURRENT_USERNAME"
        git config --global user.email "$GIT_CURRENT_EMAIL"
        git config --global user.name "$GIT_CURRENT_USERNAME"
elif [ -v $GITLABRUNNER_EMAIL ]
    then
        echo "GIT USER EMAIL SET AS: $GITLABRUNNER_EMAIL"
        echo "GIT USER NAME SET AS: $GITLABRUNNER_NAME"
        git config --global user.email "$GITLABRUNNER_EMAIL"
        git config --global user.name "$GITLABRUNNER_NAME"
    else
        git config --global user.email gitlabrunner@nhs.net
        git config --global user.name gitlabrunner
fi


git clone git@gitlab00.node.consul:bsa-design/nhs-template.git .deploy
# git clone ssh://git@localhost:10022/home-styles/nhs-template.git .deploy
# git clone git@gitlab.domain.net:group-name/project-name.git .deploy
rm -rf .deploy/images .deploy/javascripts .deploy/stylesheets
cp -R dist/* .deploy
cd .deploy
# sed -i "" "s/\"version\": \".*\",/\"version\": \"$PACKAGE_VERSION\",/" package.json
echo -e "$(date) - VERSION $PACKAGE_VERSION\n $DESCRIPTION\n\n" >> version-log.txt
git add -A
git commit -m "Deploying and releasing version $PACKAGE_VERSION"
git tag $PACKAGE_VERSION
git push origin master
git push --tags
cd ..
rm -rf .deploy
