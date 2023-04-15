<script lang="ts">
  import store, { type Item } from '../../store';
  import { currency } from '../../shared';
  import { onMount } from 'svelte';

  const { items: itemsJSON } = store;
  let input: HTMLInputElement;

  $: items = JSON.parse($itemsJSON) as Item[];

  $: newItem = '';

  function addItem() {
    const match = newItem.match(/^([\w\d\s]+)\s?@\s?([\d\.]+)$/);

    if (match) {
      let description = match[1];
      let value = match[2];
      console.log(description, value);

      $itemsJSON = JSON.stringify([
        ...items,
        {
          id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
          description,
          value
        }
      ]);

      newItem = '';
    }

    input.focus();
  }

  function removeItem(id: number) {
    $itemsJSON = JSON.stringify(items.filter((item) => item.id !== id));
  }

  onMount(() => {
    input.focus();
  });
</script>

<header>
  <form on:submit|preventDefault={addItem}>
    <label>
      New Item:
      <div>
        <input type="text" bind:this={input} bind:value={newItem} />
        <input type="submit" value="Add" />
      </div>
    </label>
  </form>
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
