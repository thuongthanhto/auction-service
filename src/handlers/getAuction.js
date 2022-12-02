import AWS from 'aws-sdk';
import commandMiddleware from '../lib/commandMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById(id) {
  let auction;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
      })
      .promise();

    auction = result.Item;
  } catch (error) {
    console.error(error);

    throw new createError.InternalServerError(error);
  }

  return auction;
}

async function getAuction(event, context) {
  const { id } = event.pathParameters;

  const auction = await getAuctionById(id);

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commandMiddleware(getAuction);
