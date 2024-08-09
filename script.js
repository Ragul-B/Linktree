// Function to open the modal
function openModal() {
    document.getElementById("addLinkModal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
    document.getElementById("addLinkModal").style.display = "none";
}

// Function to add a new link
function addLink() {
    const name = document.getElementById("linkName").value;
    const url = document.getElementById("linkUrl").value;

    if (name && url) {
        const newLink = document.createElement("a");
        newLink.href = url;
        newLink.textContent = name;
        newLink.target = "_blank";
        newLink.className = "link";

        // Adding a pop-up animation effect for the new link
        newLink.style.animation = "popUp 0.5s ease";

        document.getElementById("links").appendChild(newLink);

        // Clear input fields and close the modal
        document.getElementById("linkName").value = "";
        document.getElementById("linkUrl").value = "";
        closeModal();
    } else {
        alert("Both name and URL are required!");
    }
}

// Function to handle profile image upload
function uploadProfileImage() {
    const fileInput = document.getElementById('profileUploader');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
            // Hide the profile button after image is uploaded
            document.querySelector('.profile-button').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}
