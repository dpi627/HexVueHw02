<template>

  <div>
    <input type="text" v-model="newName" />
    {{ newName }}
    <input type="number" v-model.number="newStock" />
    {{ newStock }}
    <button type="button" @click="addItem">Add</button>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Stock</th>
        <th>Modify</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in items" :key="item.id">
        <td>{{ key + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.stock }}</td>
        <td>
          <input type="number" v-model.number="item.stock" />
        </td>
        <td><button type="button" @click="removeItem(key)">Remove</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue';

const newName = ref('demo');
const newStock = ref(0);

const addItem = () => {
  items.value.push({
    id: new Date().getTime(),
    name: newName.value,
    stock: newStock.value
  });
}

const removeItem = (key) => {
  items.value.splice(key, 1);
}

const items = ref([
  { id: 1, name: 'Item 1', stock: 10 },
  { id: 2, name: 'Item 2', stock: 20 },
  { id: 3, name: 'Item 3', stock: 30 }
]);
</script>