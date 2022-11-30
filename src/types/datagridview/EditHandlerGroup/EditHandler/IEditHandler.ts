export enum EditHandlerStyle {
  DELETE = "xidps-btn-delete",
  SAVE = "xidps-btn-save",
  IMPORT = "xidps-btn-import",
}

export interface IEditHandler {
  text: string;
  icon?: string;
  handlerStyle: EditHandlerStyle;
  event: () => void;
}
