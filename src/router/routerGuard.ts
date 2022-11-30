import { NavigationGuardNext, Route } from "vue-router";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { ERouter } from "@/types/router";

/**
 * 인증되지 않는 사용자만 접근할수 있습니다.
 * @param to
 * @param from
 * @param next
 */
export function useOnlyUnAuthenticationUserGuard(
  to: Route,
  from: Route,
  next: NavigationGuardNext
) {
  console.log(">>> this log is that user didn't access authenticated");
  const useAuth = useAuthStore();
  const isLoggedIn = useAuth.isAuthentication;

  console.log(">>>" + isLoggedIn);
  if (isLoggedIn) {
    next({ path: ERouter.DASHBOARD });
    return;
  }
  next();
}

export function useOnlyAuthenticationUserGuard(
  to: Route,
  from: Route,
  next: NavigationGuardNext
) {
  console.log(">>> this log is user access authentihicated user");
  const useAuth = useAuthStore();
  /*const isLoggedIn = useAuth.isAuthentication;
  if (!isLoggedIn) {
    next({ path: ERouter.HOME });
    return;
  }*/
  next();
}
