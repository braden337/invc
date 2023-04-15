<script lang="ts">
  import store, { type Item } from '../store';
  import { USD } from '../shared';
  import dayjs, { type ManipulateType } from 'dayjs';

  const {
    name,
    address,
    phone,
    startDate,
    num,
    customer,
    cadence,
    project,
    bank,
    routing,
    account,
    currency,
    items: itemsJSON
  } = store;

  let items: Item[] = [];
  let total = 0;
  let servicesProvided = '';

  $: submissionDate = dayjs($startDate).add(+$num, $cadence as ManipulateType);
  $: dueDate = dayjs($startDate)
    .add(+$num + 1, $cadence as ManipulateType)
    .startOf($cadence as ManipulateType);

  $: {
    servicesProvided = submissionDate.format('MMMM XXXX YYYY');

    let first = submissionDate.startOf('month').format('D');
    let last = submissionDate.endOf('month').format('D');

    servicesProvided = servicesProvided.replace('XXXX', `${first}...${last}`);
  }

  $: items = JSON.parse($itemsJSON);
  $: total = items.reduce((sum, item) => +item.value + sum, 0);

  function increment() {
    $num = (+$num + 1).toString();
  }

  function decrement() {
    if (+$num > 0) {
      $num = (+$num - 1).toString();
    }
  }
</script>

<header>
  <h2 contenteditable bind:innerText={$name}>Name</h2>
  <pre contenteditable bind:innerText={$address}>Address</pre>
  <h3 contenteditable bind:innerText={$phone}>Phone</h3>
</header>

<main>
  <div>
    <h1>
      Invoice #{+$num + 1}
      <span id="clicker">
        <button on:click={increment}>&plus;</button>
        <button disabled={+$num === 0} on:click={decrement}>&ndash;</button>
      </span>
    </h1>
  </div>
  <aside>
    <div id="for">
      For
      <pre contenteditable bind:innerText={$customer}>{$customer}</pre>
    </div>
    <div id="submitted">
      Submitted
      <p>{submissionDate.format('YYYY-MM-DD')}</p>
    </div>
    <div id="due">
      Due
      <p>{dueDate.format('YYYY-MM-DD')}</p>
    </div>
    <div id="project">
      Project
      <p contenteditable bind:innerText={$project} />
    </div>
  </aside>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      {#each items as item}
        <tr><td>{item.description}</td><td>{USD.format(+item.value)}</td></tr>
      {/each}
    </tbody>
  </table>
  <h1 style="display: block; text-align: right">Total: {USD.format(total)}</h1>
</main>
<footer>
  <aside>
    <div id="bank">
      Bank
      <pre contenteditable bind:innerText={$bank}>{$bank}</pre>
    </div>
    <div id="routing">
      Routing
      <pre contenteditable bind:innerText={$routing}>{$routing}</pre>
    </div>
    <div id="currency">
      Currency
      <p contenteditable bind:innerText={$currency}>{$currency}</p>
    </div>
    <div id="account">
      Account
      <pre contenteditable bind:innerText={$account}>{$account}</pre>
    </div>
    <div id="services_provided">
      Services Provided
      <pre>{servicesProvided}</pre>
    </div>
  </aside>
</footer>

<style lang="scss">
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(:root) {
    font-size: 18px;
  }

  :global(body) {
    padding: 1rem;
    display: grid;
    gap: 5rem;
  }

  [contenteditable] {
    border: 1px solid #eee;
    border-radius: 4px;
    border: 0;
    outline: none;

    &:focus {
      color: steelblue;
    }
  }

  header {
    display: grid;
    gap: 0.5rem;
  }

  main {
    display: grid;
    gap: 2rem;
    h1 {
      display: flex;
      align-items: center;
      gap: 1rem;
      #clicker {
        display: grid;
        button {
          padding: 0rem 0.25rem;
          font-family: 'Courier New', Courier, monospace;
        }
      }
    }
    table {
      border: 0.5px solid black;
      border-spacing: 0;
      td,
      th {
        text-align: left;
        border: 0.5px solid black;
        padding: 0.25rem 0.5rem;
      }
      th:nth-child(2),
      td:nth-child(2) {
        text-align: right;
      }
      td:nth-child(2) {
        font-family: 'Courier New', Courier, monospace;
      }
    }
  }

  aside {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto;
    div {
      font-weight: bold;
      * {
        font-weight: initial;
      }
    }
    #for,
    #bank {
      grid-row: span 2;
    }
  }

  @media print {
    #clicker {
      button {
        display: none;
      }
    }
  }
</style>
