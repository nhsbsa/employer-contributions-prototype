clear

cat banner.txt

PACKAGE_FILE='package.json';
PACKAGE_TEMP_FILE='package_temp.json';

IS_IN_MASTER=$(git branch|grep '* master')

if [ "$IS_IN_MASTER" != "* master" ]
then
    echo "You must be in master branch to use this facility";
    exit 1
fi

echo "CURRENT VERSION:"
cat package.json |grep version
echo -e "\n\nSET VERSION:"
read VERSION
echo -e "\n\nCURRENT DESCRIPTION"
cat package.json |grep description
echo -e "\n\nSET DESCRIPTION:"
read DESCRIPTION

node > $PACKAGE_TEMP_FILE <<EOF
//Read data
var data = require('./${PACKAGE_FILE}');

//Manipulate data
data.version = '${VERSION}';
data.description = '${DESCRIPTION}';

//Output data
console.log(JSON.stringify(data, null, 2));
EOF

mv -v $PACKAGE_TEMP_FILE $PACKAGE_FILE

echo -e "\n\nPLEASE ENTER A COMMIT MESSAGE: ";
read COMMIT_MESSAGE
git add .
git commit -a -m "$COMMIT_MESSAGE"
git push origin master
exit 0
