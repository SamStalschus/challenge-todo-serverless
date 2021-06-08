import { document } from '../utils/dynamodbClient'
import { v4 as uuidV4 } from 'uuid'


interface ICreateTodo {
	title?: string
	deadline?: string
}


export const handle = async (event) => {

  let { title, deadline } = JSON.parse(event.body) as ICreateTodo

  const { user_id } = event.pathParameters
  
  if(!user_id || !title || !deadline) {
    return {
      statusCode: 404,
      body: 
      JSON.stringify({
        message: "Request missing params!"
      }),
    }
  }
  
  const id = uuidV4()

  await document.put({
    TableName: 'todos',
    Item: {
      id,
      user_id,
      title,
      done: false,
      deadline: new Date(deadline).toISOString()
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      id,
      user_id,
      title,
      done: false,
      deadline: new Date(deadline),
    }),
    
    headers: {
      'Content-Type': 'application/json'
    }
  }
}