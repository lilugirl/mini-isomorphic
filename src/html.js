module.exports = function (context) {
  return `
    <html lang='en'>
       <head>
          <meta charSet='utf-8'/>
          <script>${context.data}</script>
       </head>
       <body>
       <div id="content">${context?.html}</div>
       </body>
    </html>
    `;
};
