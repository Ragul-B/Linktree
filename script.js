// Function to open the modal for adding a link
function openAddLinkModal() {
    document.getElementById('addLinkModal').style.display = 'flex';
}

// Function to open the modal for updating profile
function openProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Function to add a new link
function addLink() {
    const linkName = document.getElementById('linkName').value;
    const linkUrl = document.getElementById('linkUrl').value;

    if (linkName && linkUrl) {
        const linksContainer = document.getElementById('links');
        const newLink = document.createElement('a');
        newLink.href = linkUrl;
        newLink.target = '_blank';
        newLink.className = 'link';
        newLink.textContent = linkName;
        linksContainer.appendChild(newLink);

        document.getElementById('linkName').value = '';
        document.getElementById('linkUrl').value = '';
        closeModal('addLinkModal');
    } else {
        alert('Please provide both link name and URL.');
    }
}

// Function to update the profile
function updateProfile() {
    const profileName = document.getElementById('profileNameInput').value;
    const profileBio = document.getElementById('profileBioInput').value;

    if (profileName && profileBio) {
        document.getElementById('profileName').textContent = profileName;
        document.getElementById('profileBio').textContent = profileBio;
        
        // Hide the profile modal
        closeModal('profileModal');
    } else {
        alert('Please provide both name and bio.');
    }
}

// Function to handle profile image upload
function uploadProfileImage() {
    const fileInput = document.getElementById('profileUploader');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePic = document.getElementById('profilePic');
            profilePic.src = e.target.result;
            profilePic.classList.remove('hidden');
            document.querySelector('.profile-button').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}
