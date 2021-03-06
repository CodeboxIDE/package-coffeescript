var coffeeScript = require("coffee-script");

var commands = codebox.require("core/commands");
var File = codebox.require("models/file");

commands.register({
    id: "coffeescript.preview",
    title: "CoffeeScript: Preview",
    context: ["editor"],
    shortcuts: [
        "ctrl+shift+c"
    ],
    run: function(args, ctx) {
        var name = ctx.editor.model.get("name").replace(ctx.editor.model.getExtension(), ".js");
        var code, error;

        try {
            code = coffeeScript.compile(ctx.editor.getContent());
        } catch (e) {
            error = e;
            code = e.toString();
            name = "Error at compilation";
        }

        var f = File.buffer(name, code);
        return commands.run("file.open", {
            file: f
        })
        .then(function() {
            if (error) throw error;
        });
    }
});
