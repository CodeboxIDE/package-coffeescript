define([
    "bower_components/coffee-script/extras/coffee-script"
], function(coffeeScript) {
    var commands = codebox.require("core/commands");
    var File = codebox.require("models/file");

    commands.register({
        id: "coffeescript.preview",
        title: "CoffeeScript: Preview",
        context: ["editor"],
        shortcuts: [
            "ctrl+shift+c"
        ],
        run: function(args, context) {
            var name = context.model.get("name").replace(context.model.getExtension(), ".js");
            var code, error;

            try {
                code = coffeeScript.compile(context.getContent());
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
});