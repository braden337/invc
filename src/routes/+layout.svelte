<nav>
  <a href="/"><button>Print</button></a>
  <a href="/items"><button>Items</button></a>
  <a href="/settings"><button>Settings</button></a>
</nav>

<slot />

<style lang="scss">
  @media print {
    nav {
      display: none;
    }
  }

  button {
    padding: 0.25rem 0.5rem;
  }
</style>
