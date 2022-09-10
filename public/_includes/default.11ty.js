const header = require('./partials/header.11ty');
const footer = require('./partials/footer.11ty');
const design_section = require('./partials/design-section.11ty');

exports.render = function (pageData) {

  const data = pageData;

  return `
  <!doctype html>
  <html lang="de">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>PinkBank | ${data.title}</title>
      <link rel="stylesheet" href="/assets/styles/compiled_styles/main.css">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Graduate&display=swap" rel="stylesheet">
    </head>
    <body>
        <main class="flex-container">
          <section class="page-design">
            ${design_section.html}  
          </section>
          <section class="page-content">
            ${data.content}
            ${footer.html}
          </section>
        </main>
    <script src="/assets/scripts/main.js"></script>
  </body>
  </html>
  `;
}