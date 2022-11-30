<script lang='ts' setup>
import {defineEmits, reactive} from "vue";

/**
 * define ui data
 */
const data = reactive({
  consonants: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
  selectedIndex: -1
})

/**
 * define props
 */

/**
 * define emits
 */
const emit = defineEmits<{
  (e: 'change:item', consonant: string): void
}>();


/**
 * 라디오 버튼 클릭이벤트로 해당 버튼을 클릭할 경우 select 상태로 변경해줍니다.
 * @param index
 */
function handleClickRadioButton(index: number) {
  if (index === data.selectedIndex) {
    return;
  }
  data.selectedIndex = index;
  emit("change:item", data.consonants[index]);
}

</script>

<template>
  <div class='radio-button-wrap'>
    <v-btn v-for='(consonant,index) in data.consonants' :key='index'
           :class='index === data.selectedIndex ? "checked" : "unchecked"'
           class='fw-bold'
           @click='handleClickRadioButton(index)'
    >{{consonant}}
    </v-btn>
  </div>
</template>

<style lang='scss' scoped>
.radio-button-wrap {
  width: 250px;
  display: flex;
  flex-wrap: wrap;

  .v-btn {
    max-width: 24px !important;
    max-height: 24px !important;
    min-height: 24px !important;
    min-width: 24px !important;
    margin: 5px;
    padding: 0px !important;
  }

  .unchecked {
    background-color: #e1e1e1 !important;
    color: $warm-grey !important;
  }

  .checked {
    background-color: $light-navy-blue !important;
    color: white !important;
  }
}
</style>
