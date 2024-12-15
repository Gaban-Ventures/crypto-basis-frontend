<script lang="ts">
  import '@/css/index.css';
  import Header from '$lib/components/Header.svelte';
  import UploadButton from '$lib/components/UploadButton.svelte';
  import { CRYPTO_BASIS as title } from '@/constants';
</script>

<Header {title}/>

<button>Watch Demo for Selected Token CSV download</button>

<p>Track cost basis & pnl for a Token</p>

<input type="text" placeholder="Enter main wallet">

<p>Upload Token Transactions:</p>

<UploadButton />

<button>Submit & generate xlsx file</button>
