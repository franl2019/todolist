<template>
  <input v-model="todoValue" @keyup="setTodoValue" />
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import {useTodo} from "@/hooks/index";
export default defineComponent({
  name: "TodoInput",
  setup() {
    let todoValue = ref<string>("");
    const { setTodo } = useTodo();
    const setTodoValue = (e: KeyboardEvent): void => {
      if (e.key === "Enter" && todoValue.value.trim().length) {
        setTodo(todoValue.value);
        todoValue.value = "";
      }
    };
    return {
      todoValue,
      setTodoValue,
    };
  },
});
</script>

<style scoped>
</style>