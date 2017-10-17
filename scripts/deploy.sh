PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

DESCRIPTION=$(cat package.json | grep description | sed 's/\"description\"//gmi' | tr \" ' ' | sed 's/\:  //g')

GIT_CURRENT_EMAIL=$(git config --global --get user.email)
GIT_CURRENT_USERNAME=$(git config --global --get user.name)

if [ "$GIT_CURRENT_EMAIL" != ""  ]
    then
        echo "GIT USER EMAIL SET AS: $GIT_CURRENT_EMAIL"
        echo "GIT USER NAME SET AS: $GIT_CURRENT_USERNAME"
        git config --global user.email "$GIT_CURRENT_EMAIL"
        git config --global user.name "$GIT_CURRENT_USERNAME"
elif [ "$GITLABRUNNER_EMAIL" != "" ]
    then
        echo "GIT USER EMAIL SET AS: $GITLABRUNNER_EMAIL"
        echo "GIT USER NAME SET AS: $GITLABRUNNER_NAME"
        git config --global user.email "$GITLABRUNNER_EMAIL"
        git config --global user.name "$GITLABRUNNER_NAME"
    else
        git config --global user.email gitlabrunner@nhs.net
        git config --global user.name gitlabrunner
fi

# git clone git@gitlab00.node.consul:bsa-design/nhs-template.git .deploy
git clone git@dps-gitlab.service.nhsbsa:nhsbsa-frameworks/BSA-Design/nhs-template.git .deploy
rm -rf .deploy/images .deploy/javascripts .deploy/stylesheets
cp -R dist/* .deploy
cd .deploy
echo -e "$(date) - VERSION $PACKAGE_VERSION\n $DESCRIPTION\n\n" >> version-log.txt
git add -A
git commit -m "Deploying and releasing version $PACKAGE_VERSION"
git tag $PACKAGE_VERSION
git push origin master
git push --tags
cd ..
rm -rf .deploy
