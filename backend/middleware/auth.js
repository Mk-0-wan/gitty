export default function ensureAuthenticated(request, reply, next) {
  if (request.isAuthenticated()) {
    next();
  } else {
    reply.redirect("/login")
  }
}
