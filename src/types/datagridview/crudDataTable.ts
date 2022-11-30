export interface IDataTableHeader {
  /**
   * @description 헤더의 이름으로 데이터 테이블의 값을 찾기위한 키이다.
   * */
  value: string;

  /**
   * 헤더의 실제 눈에 보이는 값이다.
   */
  text: string;

  /**
   * 글자를 정렬하기 위한 값으로 LEFT | CENTER | RIGHT 3가지 값이 존재한다
   */
  align: "left" | "center" | "right";

  /**
   * 컬럼의 가로 길이 입니다.
   */
  width: string | number;
}

export interface ICrudDataTableHeader extends IDataTableHeader {
  /**
   * 해당 값은 CrudDataTable 만 가질 수 있는 값으로 테이블의 검색을 위해서 사용됩니다.
   */
  searchAble?: boolean;
}

/**
 * @description 입력 모드에 대한 상태값입니다.
 */
export enum EInputStatus {
  /**
   * 입력 상태
   * 입력 상태는 데이터를 추가했을때 나타나는 상태입니다.
   */
  INSERT,

  /**
   * 삭제 상태
   *
   * */
  DELETE,

  /**
   * 업데이트 상태
   * 조회된 데이터를 변경했을 때 나타나는 상태로 해당 상태는 조회 상태에서만 변경이 가능합니다.
   */
  UPDATE,

  /**
   * 조회 상태
   * 데이터를 조회했을때 가장 기본이 되는 상태이빈다.
   */
  SELECT,
}

/**
 * 편집 상태는 CRUDDatable 내에서 데일터를 편집할때 사용되는 상태입니다.
 */
export enum EditStatus {
  /**
   * 편집 완료 상태는 가장 기본이 되는 상태로 아무것도 하지 않는 날 것 그대로를 나타내는 상태입니다.
   */
  EDIT_COMPLETION_STATUS,

  /**
   * 편집중 상태는 데이터를 처리하기 위한 상태로 해당 데이터가 진행된 로우는 편집 상태가 됩니다.
   */
  EDITING_STATUS,
}

/**
 * IBasicRow는 데이터그리드뷰의 기본이 되는 값으로 row는 모두 자신의 key를 가지고 있습니다.
 */
export interface IBasicRow {
  key: number;
}

/**
 * ICrudRow는 key와 입력상태 그리고 편집 상태를 가지고 있습니다.
 */
export interface ICrudRow extends IBasicRow {
  inputStatus: EInputStatus;
  editStatus: EditStatus;
}

export interface IDataTable {
  headers: IDataTableHeader[];
  rows: IBasicRow[];
}

export interface ICrudDataTable {
  tableTitle?: string;
  headers: ICrudDataTableHeader[];
  rows: ICrudRow[];
  selectedKey?: string;
  usePageable?: boolean;
}
