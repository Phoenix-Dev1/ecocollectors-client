// Mirrors the server's constants.js (and the `roles` table).
export const ROLE = Object.freeze({
  ADMIN: 1,
  USER: 2,
  RECYCLER: 3,
  MANAGER: 4,
  DEMOTED: 5, // a recycler a manager has deactivated
});

// Roles the server lets claim ("collect") a request.
export const COLLECTOR_ROLES = [ROLE.ADMIN, ROLE.RECYCLER, ROLE.MANAGER];

// Each role's home page in the user area.
export function welcomePath(role) {
  switch (role) {
    case ROLE.ADMIN:
      return "/user/welcomeAdmin";
    case ROLE.USER:
    case ROLE.DEMOTED:
      return "/user/welcomeUser";
    case ROLE.RECYCLER:
      return "/user/welcomeRecycler";
    case ROLE.MANAGER:
      return "/user/welcomeManager";
    default:
      return "/";
  }
}
