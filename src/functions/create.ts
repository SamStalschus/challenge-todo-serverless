

export const handle = async (event) => {

  return {
    statusCode: 201,
    body: 
      JSON.stringify({
        message: "Testeeee"
      }),
    
    headers: {
      'Content-Type': 'application/json'
    }
  }
}