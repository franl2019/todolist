<template>
  <TodoInput></TodoInput>
  <TodoList :todoList="todoList"></TodoList>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import TodoInput from "@/components/TodoInput/index.vue";
import TodoList from "@/components/TodoList/index.vue";
import { IUseTodo, useTodo } from "./hooks";
import { Store, useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const { setTodoList }:IUseTodo = useTodo();
    const store:Store<any> = useStore()

    onMounted(()=>{
        setTodoList();
    })

    return{
      todoList:computed(()=>{
        return store.state.list
       })
    }
  },
});
</script>

<style>
</style>
