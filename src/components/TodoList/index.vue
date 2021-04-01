<template>
  <TodoItem
    v-for="item of todoList"
    :key="item.id"
    :item="item"
    @removeTodo="removeTodo"
    @setStatus="setStatus"
    @setDoing="setDoing"
  />
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import TodoItem from "@/components/TodoList/TodoItem.vue";
import { ITodo } from "@/types";
import { useTodo } from "@/hooks";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {
    todoList: {
      type: Array as PropType<ITodo[]>,
      required:true,
      default:[]
  },
  setup() {
    const { removeTodo, setStatus, setDoing } = useTodo();

    
    return {
      removeTodo,
      setStatus,
      setDoing,
    };
  },
});
</script>

<style scoped>
</style>
