const KEY = "rtHK4z";

class Shadertoy2dwp extends w96.WApplication {
	constructor() {
		super();
	}
	
	async main(argv) {
		super.main(argv);

        function value2id(value) {
            return value.match(/^(?:https?:\/\/www\.shadertoy\.com\/view\/)?(.*)/)[1];
        }

		const wnd = this.createWindow({
			title: "Shadertoy to DWP",
			body: `<form>
                <label for="shaderID">Shader ID or URL</label>
                <input class="w96-textbox" id="shaderID" type="text">
                <input class="w96-button" type="button" id="st2dwp-preview" value="Preview">
                <input class="w96-button" type="button" id="st2dwp-generate" value="Generate .dwp">
                <input class="w96-button" type="button" id="st2dwp-apply" value="Apply as wallpaper">
            </form>
            <hr>
            This application uses the Shadertoy.com API
            <hr>
            <iframe id="st2dwp-preview-iframe" style="pointer-events: none; width: 100%; height: 100%;"></iframe>`,
			initialHeight: 300,
			initialWidth: 450,
			taskbar: true, // Show the window in taskbar
			icon: "data:image/png;base64,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"
		}, true); // True specifies whether its an app window or not (aka closes any subwindows)

        wnd.getBodyContainer().querySelector("#st2dwp-preview").addEventListener("click", async function(event) {
            let id = value2id(wnd.getBodyContainer().querySelector("#shaderID").value);
            let embedURL = `https://www.shadertoy.com/embed/${encodeURIComponent(id)}?gui=false&paused=false&muted=true`;
            wnd.getBodyContainer().querySelector("#st2dwp-preview-iframe").src = embedURL;
        });

        wnd.getBodyContainer().querySelector("#st2dwp-apply").addEventListener("click", async function(event) {
            let id = value2id(wnd.getBodyContainer().querySelector("#shaderID").value);
            let desktop = await w96.FS.readstr("C:/system/config/desktop.json").then(JSON.parse);
            if(!desktop.background) {
                desktop.background = {};
            }
            desktop.background.type = "iframe";
            desktop.background.bg = `https://www.shadertoy.com/embed/${encodeURIComponent(id)}?gui=false&paused=false&muted=true`;
            await w96.FS.writestr("C:/system/config/desktop.json", JSON.stringify(desktop));
            await w96.ui.Theme.reloadDesktop();
        });

        wnd.getBodyContainer().querySelector("#st2dwp-generate").addEventListener("click", async function(event) {
            event.preventDefault();
            let id = value2id(wnd.getBodyContainer().querySelector("#shaderID").value);

            let infoURL = `https://www.shadertoy.com/api/v1/shaders/${encodeURIComponent(id)}?key=${KEY}`;

            let info = null;

            try {
                info = await fetch(infoURL).then(resp => resp.json()).then(shader => shader?.Shader?.info);
            } catch(e) {
            }

            if(!info) {
                alert("Either that shader does not exist, or it is not visible to the API.\nNon API shaders are not yet supported.")
                return;
            }

            let embedURL = `https://www.shadertoy.com/embed/${encodeURIComponent(id)}?gui=false&paused=false&muted=true`;

            let dwp = {
                name: info.name,
                author: `${info.username} on Shadertoy.com`,
                url: embedURL,
                properties: {} // What is this for?
            };

            let path = await new Promise(resolve => {
                let dialog = new w96.ui.SaveFileDialog("C:/system/wallpapers/dynamic", ["dwp"], resolve);
                dialog.show();
            });

            if(path) {
                if(!path.match(/\.dwp$/i)) {
                    path += ".dwp";
                }
                await w96.FS.writestr(path, JSON.stringify(dwp));
                alert(".dwp created!");
            }


        });
		
		wnd.show();

		
	}
}

registerApp("st2dwp", [], function(args) {
	return w96.WApplication.execAsync(new Shadertoy2dwp(), args);
});