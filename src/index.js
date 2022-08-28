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
    path: "/hello",
    handler: function (request, h) {

    return html({html:renderToString(<Hello text="小红!!" />)})
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
