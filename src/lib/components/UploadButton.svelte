<script lang="ts">
  import { onMount } from 'svelte';

  let fileInput: HTMLInputElement;
  let progress: number = 0;
  let uploading: boolean = false;

  function handleClick(): void {
    fileInput.click();
  }

  interface UploadResponse {
    success: boolean;
    message: string;
    filename?: string;
  }

  async function handleChange(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    
    uploading = true;
    try {
      await uploadFile(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      uploading = false;
      target.value = '';
    }
  }

  async function uploadFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
        if (e.lengthComputable) {
          progress = Math.round((e.loaded * 100) / e.total);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response: UploadResponse = JSON.parse(xhr.responseText);
            if (response.success) {
              resolve();
            } else {
              reject(new Error(response.message || 'Upload failed'));
            }
          } catch (e) {
            reject(new Error('Invalid response from server'));
          }
        } else {
          reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error occurred'));
      });

      xhr.addEventListener('timeout', () => {
        reject(new Error('Upload timed out'));
      });

      xhr.open('POST', '/api/upload');
      xhr.timeout = 30000;
      xhr.send(formData);
    });
  }
</script>

<div class="upload-container">
  <input
    type="file"
    bind:this={fileInput}
    on:change={handleChange}
    class="hidden"
    accept=".csv"
  />
  
  <div 
    class="upload-button"
    on:click={handleClick}
    on:keypress={(e: KeyboardEvent) => e.key === 'Enter' && handleClick()}
    role="button"
    tabindex="0"
  >
    <!-- Progress overlay -->
    {#if progress > 0}
      <div 
        class="progress-bar"
        style="width: {progress}%"
      ></div>
    {/if}
    
    <!-- Content -->
    <div class="button-content">
      <span>
        {#if uploading}
          Uploading... ({progress}%)
        {:else}
          Upload solscan csv
        {/if}
      </span>
    </div>
  </div>
</div>

<style>
  .hidden {
    display: none;
  }

  .upload-button {
    border: 1px solid black;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #DEC856;  /* yellow */
  }

  .button-content {
    position: relative;
    z-index: 1;
    padding: 8px;
  }
</style>
