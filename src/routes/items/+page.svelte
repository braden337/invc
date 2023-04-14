<script lang="ts">
  import store, { type Item } from '../../store';

  const { items: itemsJSON } = store;

  $: items = JSON.parse($itemsJSON) as Item[];

  $: newItem = { id: 0, description: '', value: '' } as Item;

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  $: safeToAddItem =
    !Object.values(newItem).some((item) => item.toString().trim() === '') &&
    !Number.isNaN(+newItem.value);

  function addItem() {
    if (safeToAddItem) {
      $itemsJSON = JSON.stringify([
        ...items,
        { ...newItem, id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1 }
      ]);
    }
    newItem = { id: 0, description: '', value: '' };
  }

  function removeItem(id: number) {
    $itemsJSON = JSON.stringify(items.filter((item) => item.id !== id));
  }
</script>

<header>
  <label>
    Description:
    <input type="text" bind:value={newItem.description} />
  </label>
  <label>
    Value:
    <input type="text" bind:value={newItem.value} />
  </label>
  <button on:click={addItem} disabled={!safeToAddItem}>Add</button>
</header>

{#if items.length > 0}
  <main>
    <table>
      <thead><tr><th>Description</th><th>Price</th><th>Delete</th></tr></thead>
      <tbody>
        {#each items as item, i}
          <tr>
            <td>{item.description}</td>
            <td>{currency.format(+item.value)}</td>
            <td class="delete">
              <button on:click={() => removeItem(item.id)}>X</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </main>
{/if}

<style lang="scss">
  header {
    display: grid;
    gap: 1rem;

    label {
      display: grid;
      gap: 0.25rem;
    }
    input,
    select,
    button {
      justify-self: start;
    }
  }

  main {
    table {
      border: 1px solid black;
      th,
      td {
        border: 1px solid black;
        padding: 0.25rem;
        text-align: left;
      }
      .delete {
        display: grid;
      }
      width: 100%;
    }
  }
</style>
