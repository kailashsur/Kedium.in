import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
dotenv.config();

const DYNAMODB_REGION : string = process.env.DYNAMODB_REGION!
const DYNAMODB_ACCESS_KEY_ID : string = process.env.DYNAMODB_ACCESS_KEY_ID!
const DYNAMODB_SECRET_ACCESS_KEY : string = process.env.DYNAMODB_SECRET_ACCESS_KEY!


const dynamooseConfig = new dynamoose.aws.ddb.DynamoDB({
    'credentials' : {
        'accessKeyId': DYNAMODB_ACCESS_KEY_ID,
        'secretAccessKey': DYNAMODB_SECRET_ACCESS_KEY
    },
    'region': DYNAMODB_REGION
});

dynamoose.aws.ddb.set(dynamooseConfig);

export default dynamoose;