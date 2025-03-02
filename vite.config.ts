export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Especifica la carpeta de salida (por defecto ya es 'dist')
    sourcemap: true, // Genera source maps para debugging en producción
  },
  server: {
    port: 5173, // Puerto para el servidor de desarrollo
    open: true, // Abre el navegador automáticamente
  },
});
