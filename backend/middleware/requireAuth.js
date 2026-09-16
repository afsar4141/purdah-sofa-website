/**
 * middleware/requireAuth.js
 * -----------------------------------------------------------------------
 * Blocks access to admin-only API routes unless the request has a valid
 * logged-in session (set by /api/admin/login).
 * -----------------------------------------------------------------------
 */

function requireAuth(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: 'Not logged in.' });
}

module.exports = requireAuth;