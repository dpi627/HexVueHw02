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
    <tfoot>
      <tr>
        <th scope="row" colspan="4">庫存總計</th>
        <td>
          {{ totalStock }}
        </td>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="(item, key) in items" :key="item.id">
        <td>{{ key + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.stock }}</td>
        <td>
          <input type="number" v-model.number="item.stock" />
        </td>
        <td>
          <button type="button" @click="removeItem(item.id)">Remove</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const newName = ref('demo');
const newStock = ref(0);

const items = ref([]);

const addItem = () => {
  items.value.push({
    id: new Date().getTime(),
    name: newName.value,
    stock: newStock.value
  });
}

const removeItem = (id) => {
  const idx = items.value.findIndex(item => item.id === id);
  items.value.splice(idx, 1);
}

const totalStock = computed(() => {
  let sum = 0;
  items.value.forEach((item) => {
    sum += item.stock;
  });
  return sum;
})

onMounted(() => {
  setTimeout(() => {
    items.value = [
      { id: 1, name: 'Item 1', stock: 10 },
      { id: 2, name: 'Item 2', stock: 20 },
      { id: 3, name: 'Item 3', stock: 30 }
    ]
  }, 3000);
});

async function fetchData() {
  const res = await axios.get('https://randomuser.me/api/');
  console.log(res);
}
fetchData();
</script>