<template>
  <div>
    <input
      type="checkbox"
      :checked="item.status === FINISH"
      @click="setStatus(item.id)"
    />
    <span :class="item.status === FINISH ? 'line-through' : ''">
      {{ item.content }}
    </span>
    <button @click="removeTodo(item.id)">删除</button>
    <button
      v-if="item.status !== FINISH"
      :class="item.statu === DOING ? 'doing' : 'want'"
      @click="setDoing(item.id)"
    >
      {{ item.status === DOING ? "正在做..." : "马上做" }}
    </button>
  </div>
</template>

<script lang='ts'>
import { ITodo, TODO_STATUS } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TodoItem",
  props: {
    item: Object as PropType<ITodo>,
  },
  setup(props, { emit }) {

    interface IStatusState {
      DOING: TODO_STATUS;
      FINISH: TODO_STATUS;
      WANT: TODO_STATUS;
    }
    
    const stateStatus: IStatusState = {
      DOING: TODO_STATUS.DOING,
      FINISH: TODO_STATUS.FINISH,
      WANT: TODO_STATUS.WANT,
    };

    const removeTodo = (id: number): void => {
      emit("removeTodo", id);
    };

    const setStatus = (id: number): void => {
      emit("setStatus", id);
    };

    const setDoing = (id: number): void => {
      emit("setDoing", id);
    };
    return {
      ...stateStatus,
      removeTodo,
      setStatus,
      setDoing,
    };
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

.doing {
  background-color: #cdcdcd;
  color: #000;
}

.want {
  background-color: orange;
  color: #fff;
}
</style>