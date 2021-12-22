const deleteData = async (path, data, token) => {
  try {
    return await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
  } catch (err) {
    console.log(err);
  }
}

export default deleteData;