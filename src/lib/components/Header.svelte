<script lang="ts">
  import { TRACK_YOUR_PNL } from '@/constants/copy';
  let { title }: { title: string } = $props();
</script>

<h1 class="space-grotesk-900">{title.toLocaleUpperCase()}</h1>
<h3 class="space-grotesk-300">{TRACK_YOUR_PNL}</h3>
