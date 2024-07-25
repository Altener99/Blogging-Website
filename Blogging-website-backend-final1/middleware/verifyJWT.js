const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.uthorization;

    console.log('authHeader', authHeader);

    if(!authHeader?.startsWith('Token ')){

        return res.status(401).json({message:"unauthorized"});

    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {

            if(err){

                return res.status(403).json({message:"Forbidden"});

            }

            req.userId = decoded.user.id;
            req.userEmail = decoded.user.email;
            req.userHashedPass = decoded.user.password;
            
            next();
        }
    )


    

}

module.exports = verifyJWT; 