echo "Bat file to deploy to ghpages"
echo "should be run from repo base dir"

call quasar build

# Deploy new build
echo "Removing docs"
call rmdir /s /q "./docs"
echo "Moving new build"
call move ./dist ./docs

echo "You must now do a normal git add commit push"