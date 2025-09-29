// Simple static file server using Bun
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Default to example.html
    if (path === "/") {
      path = "/example.html";
    }

    try {
      const file = Bun.file("." + path);
      return new Response(file);
    } catch (e) {
      return new Response("File not found", { status: 404 });
    }
  },
});

console.log(`Server running at http://localhost:${server.port}`);
console.log(`Open http://localhost:${server.port} to view the example`);