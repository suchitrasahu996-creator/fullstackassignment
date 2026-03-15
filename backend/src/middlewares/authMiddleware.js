export function authMiddleWare(req, res, next){
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

 const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    });
  }

  req.user = decoded
  next();
};
