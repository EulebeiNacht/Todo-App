<script setup>
import { defineEmits, reactive } from "vue";
const emit = defineEmits(["create-todo"]);
const todoState = reactive({
  todo: "",
  invalid: null,
  errMsg: "",
});
const createTodo = () => {
  todoState.invalid = null;
  if (todoState.todo !== "") {
    emit("create-todo", todoState.todo);
    todoState.todo = "";
    return;
  }
  todoState.invalid = true;
  todoState.errMsg = "Todo value cannot be empty";
};
</script>

<template>
  <div class="input-wrap" :class="{ 'input-err': todoState.invalid }">
    <input type="text" v-model="todoState.todo" />
    <button @click="createTodo">创建</button>
  </div>
  <p v-show="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p>
</template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;
  border-radius: 20px;

  &.input-err {
    border-color: #ab2b2b;
  }

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;
    border-radius: 20px 0 0 20px;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
    border: none;
    width: 70px;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: #ab2b2b;
}
</style>
