// let serverUrl = "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org";

import {index, Main} from "./index";

export async function getAllShells(url) {
    await fetch(url + "/shells")
        .then(response => response.json())
        .then(data => {
            window.sessionStorage.setItem("allShells", JSON.stringify(data));
            window.sessionStorage.setItem("content", JSON.stringify(data));
            index.render(<Main/>);
        });
}