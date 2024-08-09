function addLink() {
    const url = prompt("Enter the URL:");
    const name = prompt("Enter the name for this link:");

    if (url && name) {
        const newLink = document.createElement("a");
        newLink.href = url;
        newLink.textContent = name;
        newLink.target = "_blank";
        newLink.className = "link";

        // Adding a pop-up animation effect for the new link
        newLink.style.animation = "popUp 0.5s ease";

        document.getElementById("links").appendChild(newLink);
    } else {
        alert("URL and name are required!");
    }
}
