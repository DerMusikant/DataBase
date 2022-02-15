const store = require('./store')


//Stores message on the database with extra info (Date, etc)
const addMessage = (user, message) => {
  return new Promise((resolve, reject) => {
    if (!user || !message){
      console.error('Message/controller no [user/message] found')
      return reject('Data error.')
    }
    const info = {
      user,
      message,
      date : new Date(),
    }

    store.add(info)

    resolve(info)
  })
}



const getMessages = ( filterUser ) => {
  return new Promise((resolve, reject) => {
    resolve(store.get(filterUser))
  })
}

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Invalid data');
            return false;
        }

        const result = await store.update(id, message);

        resolve(result);
    })
}

const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    if(!id){
      reject('Invalid Parameter')
    }

    store.delete(id)
    .then(() => {
      resolve('Message deleted succesfully')
    })
    .catch((e) => {
      reject(e)
    })
  })
}


/////////HELPER



module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}
