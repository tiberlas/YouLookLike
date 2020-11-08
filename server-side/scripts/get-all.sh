echo "GET ALL REQUESTS"
echo "should return: 200"
URL="http://localhost:5000/you-look-like/api/registration-request"

curl -X GET -v $URL
#curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" -v $URL
#curl -X POST -H "Content-Type: application/json" -d '{"user:" "tibi", "age": 23}' -v $URL

echo 
echo -e "\U1F37A"

echo "GET ALL APPROVED REQUESTS"
echo "should return: 200"
URL="http://localhost:5000/you-look-like/api/registration-request?isApproved=true"

curl -X GET -v $URL
#curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" -v $URL
#curl -X POST -H "Content-Type: application/json" -d '{"user:" "tibi", "age": 23}' -v $URL

echo 
echo -e "\U1F37A"

echo "GET ALL REGISTERED"
echo "should return: 200"
URL="http://localhost:5000/you-look-like/api/user/all"

curl -X GET -v $URL
#curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" -v $URL
#curl -X POST -H "Content-Type: application/json" -d '{"user:" "tibi", "age": 23}' -v $URL

echo 
echo -e "\U1F37A"