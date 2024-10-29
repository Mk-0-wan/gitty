export default function ensureAuthenticated(request, reply, done) {
  const authHeader = request.headers.authorization;

  // Log only in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Inside authentication middleware');
    console.log(`${authHeader}`);
  }

  if (!authHeader) {
    return reply.code(401).send({
      message: 'Authentication failed: No token provided',
      debug: process.env.NODE_ENV === 'development' ? { headers: request.headers } : undefined,
    });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return reply.code(400).send({
      message: 'Invalid token format. Expected format: Bearer <token>',
    });
  }

  request.token = token;
  done();
}

// handling how to present the data to the frontend
// commits history
// followers table
// streak tracker
// issue tracker
// repo tracker
// repo management
// pull request tracker
// AI suggestions maybe
// starred repositories
// github storage size
