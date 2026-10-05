import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  // Polling avoids Windows/OneDrive EBUSY file watcher failures.
  server: { watch: { usePolling: true, interval: 400, ignored: ['**/qa/**', '**/dist/**'] } },
});
