export enum ERouter {
  // 공통 라우팅
  HOME = "/",
  COMPANY_AUTH = "/:id",
  DASHBOARD = "/admin/dashboard",
  // 어드민 전용 기능
  MANAGE_CALLER = "/admin/caller-manage",
  MANAGE_USER = "/admin/manage-user",
  MANAGE_ADDRESS = "/admin/manage-address",
  MANAGE_SHIPMENT = "/admin/manage-shipment",
  MANAGE_UTILITY = "/admin/manage-utility",
  // 관리자 기능
  SEND_MESSAGE = "/manager/send-message",
  MANAGE_PERSONAL_ADDRESS = "/manage-personal-address",
  MANAGE_RECEIPT_BLOCKING = "/receipt-receipt-blocknig",
  MANAGE_TEMPLATE = "/manager/manage-template",
  SEND_RESULT = "/send-result",
}
