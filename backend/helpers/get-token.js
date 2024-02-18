

const getToken = (req) => {
    const authHeader = req.headers.authorization
    // const token = authHeader.split(" ")[1]  .split("") faz com que vc separe a string em partes e o "[1]" determina qual sera a parte no caso ai a segunda 
    //parte ja que array se conta apartir do 0
    const token = authHeader.split(" ")[1]
 

    return token
}

module.exports = getToken