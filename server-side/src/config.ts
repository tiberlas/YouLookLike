//Module for app configuration

export const config = {
	NAME: 'Car loot',
	BASE_URL: '/api/car-loot',
	PORT: process.env.PORT || '5000',
	MONGODB: 'mongodb://localhost:27017/car_loot',
};
