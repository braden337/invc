<script lang="ts">
  import store from '../../store';

  const { startDate, cadence } = store;
</script>

<main>
  <label>
    Initial Invoice Date:
    <input type="date" bind:value={$startDate} />
  </label>
  <label>
    Invoice Cadence:
    <select bind:value={$cadence}>
      <option value="day">Day</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
  </label>
</main>

<style lang="scss">
  main {
    display: grid;
    gap: 1rem;

    label {
      display: grid;
      gap: 0.25rem;
      input,
      select {
        justify-self: start;
      }
    }
  }
</style>
