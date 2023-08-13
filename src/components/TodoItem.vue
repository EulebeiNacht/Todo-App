<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  todoProp: {
    type: Object,
    required: true,
  },
  indexProp: {
    type: Number,
    required: true,
  },
});
defineEmits(["toggle-complete", "edit-todo", "update-todo", "delete-todo"]);
</script>

<template>
  <li>
    <input
      type="checkbox"
      :checked="todoProp.isCompleted"
      @input="$emit('toggle-complete', indexProp)"
    />

    <div class="todo">
      <input
        type="text"
        v-if="todoProp.isEditing"
        :value="todoProp.todo"
        @input="$emit('update-todo', $event.target.value, indexProp)"
      />
      <router-link :to="{ name: 'todoPage', params: { pageId: todoProp.id } }">
        <span
          v-if="!todoProp.isEditing"
          :class="{ 'completed-todo': todoProp.isCompleted }"
          >{{ todoProp.todo }}</span
        >
      </router-link>
    </div>

    <div class="todo-actions">
      <Icon
        v-if="todoProp.isEditing"
        icon="ph:check-circle"
        class="icon"
        color="#41b080"
        width="22"
        @click="$emit('edit-todo', indexProp)"
      />
      <Icon
        v-else
        icon="ph:pencil-fill"
        class="icon"
        color="#41b080"
        width="22"
        @click="$emit('edit-todo', indexProp)"
      />
      <Icon
        icon="ph:trash"
        class="icon"
        color="#f95e5e"
        width="22"
        @click="$emit('delete-todo', todoProp.id)"
      />
    </div>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 10px;
  background-color: #fafaed;
  border-radius: 10px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  &:hover {
    .todo-actions {
      opacity: 1;
    }
  }

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    &:checked {
      background-color: #41b080;
    }
  }

  .todo {
    flex: 1;

    a:any-link {
      text-decoration: none;
      color: black;

      .completed-todo {
        text-decoration: line-through;
      }
    }

    input[type="text"] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }

  .todo-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }
}
</style>
