export function authorizeRoles(...allowedRoles) {
    return function authorizeRole(
      request,
      response,
      next
    ) {
      const currentRole =
        request.auth?.databaseRole;
  
      if (!currentRole) {
        return response.status(401).json({
          success: false,
          message:
            "Authentication information is missing.",
        });
      }
  
      if (!allowedRoles.includes(currentRole)) {
        return response.status(403).json({
          success: false,
          message:
            "You do not have permission to perform this action.",
        });
      }
  
      next();
    };
  }