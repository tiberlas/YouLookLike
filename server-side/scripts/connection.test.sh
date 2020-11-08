echo "should return: 418"
URL="http://localhost:5000/you-look-like/api/test"

curl -X GET -v $URL
#curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" -v $URL
#curl -X POST -H "Content-Type: application/json" -d '{"user:" "tibi", "age": 23}' -v $URL

echo 
echo -e "\U1F37A"