import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files with proper MIME types
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    // Check if request is from a social media crawler
    const userAgent = req.headers['user-agent'] || '';
    const isSocialCrawler = 
      userAgent.includes('facebookexternalhit') ||
      userAgent.includes('Facebot') ||
      userAgent.includes('Twitterbot') ||
      userAgent.includes('LinkedInBot') ||
      userAgent.includes('WhatsApp') ||
      userAgent.includes('TelegramBot') ||
      userAgent.includes('Slackbot') ||
      userAgent.includes('Discordbot');

    // Only inject meta tags for social crawlers on show pages
    if (isSocialCrawler && req.path.startsWith('/show/')) {
      const showMatch = req.path.match(/^\/show\/([^\/]+)/);
      
      if (showMatch) {
        const slug = showMatch[1];
        
        // Import storage dynamically to avoid circular dependency
        import('./storage.js').then(({ storage }) => {
          storage.getShowBySlug(slug).then(show => {
            if (show) {
              const indexPath = path.resolve(distPath, "index.html");
              let html = fs.readFileSync(indexPath, 'utf-8');

              // Escape HTML entities
              const escapeHtml = (str: string) => str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

              const title = escapeHtml(show.title);
              const description = escapeHtml(show.description.slice(0, 200));
              const url = `https://streamvault.live/show/${show.slug}`;
              const image = show.backdropUrl;

              // Inject show-specific meta tags
              const metaTags = `
    <!-- Dynamic Show Meta Tags for Social Sharing -->
    <meta property="og:title" content="${title} - Watch Online Free | StreamVault">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="video.tv_show">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} - Watch Online Free">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <title>${title} - Watch Online Free | StreamVault</title>`;

              // Replace the closing </head> tag
              html = html.replace('</head>', `${metaTags}\n  </head>`);

              res.setHeader('Content-Type', 'text/html');
              res.send(html);
            } else {
              res.sendFile(path.resolve(distPath, "index.html"));
            }
          }).catch(() => {
            res.sendFile(path.resolve(distPath, "index.html"));
          });
        }).catch(() => {
          res.sendFile(path.resolve(distPath, "index.html"));
        });
        return;
      }
    }

    // For all other requests, serve index.html
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
