import { IUserRow } from "@/types/views/admin/user";
import { EditStatus } from "@/types/datagridview/crudDataTable";

/**
 * @description IAddressBook 타입은 주소록에서 사용되는 데이터 타입입니다.
 */
export interface IAddressBook {
  /**
   * @description 주소록의 개별 아이이디입니다.
   */
  id: number;

  /**
   * @description 주소록의 이름으로 초기 설정은 (제목없음)으로 표시되는 타입입니다.
   */
  name: string;

  /**
   * @description 주소록은 자신의 하위 주소록을 생성 할 수 있습니다. 하위 주소록이 없을 수 도 있으며 없는 경우 빈 배열로 표시하는 타입입니다.
   */
  children: IAddressBook[];

  /**
   * @description 개별 주소록은 자신이 가지고 해당 주소록에 소속되어 있는 사용자 데이터를 가지고 올 수 있습니다.
   */
  users: IUserRow[];

  /**
   * @description 주소록이 편집가능한 상태인지 아닌지 판단하는 기능입니다.
   */
  editStatus: EditStatus;
}

export interface IAddressBookProps {
  addressItem?: IAddressBook[];
}

export interface IAddressInsertPayload {
  item: IAddressBook | null;
}

export interface IClickItemPayload {
  item: IAddressBook | null;
}

export interface IEditAddressPayload {
  item: IAddressBook;
  editText: string;
}
