"use strict";
var Hapi = require("@hapi/hapi");
var React =require('react');
var {renderToString}=require('react-dom/server');
var html=require('./html')

class Hello extends React.Component{
    render(){
        return <div>你好 {this.props.text}</div>;
    }
}
console.log('renderToString',renderToString);
// console.log('服务端渲染',renderToString(<Hello text="小王" />));

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
  });

  server.route({
    method: "GET",
    path: "/{42*}",
    handler: function (request, h) {
    // 数据可能来源于服务，数据库等
    const data={text:'World'};

    return html({data:`window.__DATA__=${JSON.stringify(data)}`,html:renderToString(<Hello text={data.text} />)})
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
