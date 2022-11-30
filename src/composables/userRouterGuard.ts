import { NavigationGuardNext, Route } from "vue-router";
import { ERouter } from "@/types/router";
import useCompanyStore from "@/store/company/useCompanyStore";

function isAuthenticated(): boolean {
  return true;
}

/**
 * 로그인을 하지 하지않은 사용자만 접근 가능함
 * @param to
 * @param from
 * @param next
 */
export const useOnlyUnAuthenticationUserGuard = (
  to: Route,
  from: Route,
  next: NavigationGuardNext
) => {
  if (isAuthenticated()) {
    next({ path: ERouter.HOME });
    return;
  }
  next();
};

/**
 * 로그인한 사용자만 접근 가능함
 * @param to
 * @param from
 * @param next
 */
export const useAuthenticationUserGuard = (
  to: Route,
  from: Route,
  next: NavigationGuardNext
) => {
  if (isAuthenticated()) {
    next();
    return;
  }
  next({ path: "/auth" });
};

/**
 * 연관 회사 아이디를 가진 채 접근하는 경우
 * 해당 회사가 등록된 회사일 경우
 *   - 인증 처리를 함
 *      - 로그인이 안된 경우에는 해당 회사의 로그인 경로 이동
 * 동록된 회사가 아닌 경우에는 메인 로그인으로 이동시킴
 *
 */

export const useVerifyCompanyAndAuthenticationUserGuard = async (
  to: Route,
  from: Route,
  next: NavigationGuardNext
) => {
  const useCompany = await useCompanyStore();
  // 회사가 등록되어 있지 않는 경우
  if (!useCompany.existsCompanyId(to.params.id)) {
    next({ path: ERouter.HOME });
    return;
  }

  // 회사가 등록되어 있지만 로그인 하지 않는 경우
  if (!isAuthenticated()) {
    next({ path: ERouter.COMPANY_AUTH });
    return;
  }
  // 회사도 등록되어 있으며 로그인 되어 있는 경우
  next();
};
