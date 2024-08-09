// Open and close modals
function openAddLinkModal() {
    document.getElementById('addLinkModal').style.display = 'flex';
}

function openProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add link to links container
function addLink() {
    const name = document.getElementById('linkName').value;
    const url = document.getElementById('linkUrl').value;

    if (name && url) {
        const linkContainer = document.getElementById('links');
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.className = 'link';
        linkElement.textContent = name;
        linkElement.target = '_blank'; // Open in new tab
        linkContainer.appendChild(linkElement);

        // Clear the input fields and close the modal
        document.getElementById('linkName').value = '';
        document.getElementById('linkUrl').value = '';
        closeModal('addLinkModal');
    } else {
        alert('Please provide both name and URL.');
    }
}

// Update profile information
function updateProfile() {
    const name = document.getElementById('profileNameInput').value;
    const bio = document.getElementById('profileBioInput').value;

    if (name || bio) {
        document.getElementById('profileName').textContent = name || document.getElementById('profileName').textContent;
        document.getElementById('profileBio').textContent = bio || document.getElementById('profileBio').textContent;

        // Hide the profile modal and show profile picture if uploaded
        closeModal('profileModal');
        document.querySelector('.profile-button').style.display = 'none';
    } else {
        alert('Please provide at least a name or bio.');
    }
}

// Handle profile image upload
function uploadProfileImage() {
    const fileInput = document.getElementById('profileUploader');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const profilePic = document.getElementById('profilePic');
            profilePic.src = event.target.result;
            profilePic.classList.remove('hidden');
        };
        reader.readAsDataURL(file);

        // Hide the profile button after the profile image is added
        document.querySelector('.profile-button').style.display = 'none';
    }
}

// Open profile modal initially
document.querySelector('.profile-button').addEventListener('click', openProfileModal);

// Handle scrolling for large lists of links
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowY = 'auto';
});
