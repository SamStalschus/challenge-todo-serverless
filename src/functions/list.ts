import { document } from '../utils/dynamodbClient'

export const handle = async (event) => {

  const { user_id } = event.pathParameters

  const response = await document.scan({
    TableName: 'todos',
    FilterExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      '#user_id': 'user_id'
    },
    ExpressionAttributeValues: {
      ':user_id': user_id
    }
  }).promise()

  const todos = response.Items

  if (todos) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
        todos
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'User not found'
    })
  }
}