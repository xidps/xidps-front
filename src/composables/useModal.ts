import { reactive } from "vue";
import { ICustomModal } from "@/components/CustomModal/type";

export function useModal({ isShow = false, title = "", width = 900 }) {
  const data = reactive<ICustomModal>({
    isShow,
    title,
    width,
  });

  function handleOpenModal() {
    data.isShow = true;
  }
  function handleCloseModal() {
    data.isShow = false;
  }

  return {
    modal: data,
    handleOpenModal,
    handleCloseModal,
  };
}
