echo "should return: 201"
URL="http://localhost:5000/you-look-like/api/registration"

curl -X POST -d '{
  "isApproved": false,
		"isDeleted": false,
		"userName": "fly",
		"email": "fly@mail.com",
		"password": "u1f35a",
		"name": "fly",
		"surname": "the bass",
		"nickname": "fly",
		"birthDay": new Date(),
		"hight": { "value": 180, "unit": "CENTIMETERS" },
		"weight": { "value": 80, "unit": "KILOGRAMS" },
		"profileImagePath": "ANONYMOUS"
}' -v $URL
#curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" -v $URL
#curl -X POST -H "Content-Type: application/json" -d '{"user:" "tibi", "age": 23}' -v $URL

echo 
echo -e "\U1F37A"