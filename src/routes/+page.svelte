<script lang="ts">
  import store from '../store';
  import dayjs, { type ManipulateType } from 'dayjs';

  const { name, address, phone, startDate, num, customer, cadence, project } = store;

  $: submissionDate = dayjs($startDate).add(+$num, $cadence as ManipulateType);
  $: dueDate = dayjs($startDate)
    .add(+$num + 1, $cadence as ManipulateType)
    .startOf($cadence as ManipulateType);

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
</main>
<footer />

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
    gap: 2rem;
    // background-color: black;
    // color: white;
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
    gap: 1rem;
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
    #for {
      grid-row: span 2;
    }

    #num {
      button {
        // font-family: 'Courier New', Courier, monospace;
        // width: 1rem;
        // font-size: 1rem;
      }
      // @media print {
      //   button {
      //     display: none;
      //   }
      // }
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
