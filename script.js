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

// Add link to links container and save to local storage
function addLink() {
    const name = document.getElementById('linkName').value;
    const url = document.getElementById('linkUrl').value;

    if (name && url) {
        const linkContainer = document.getElementById('links');
        const linkElement = document.createElement('div');
        linkElement.className = 'link';
        linkElement.innerHTML = `
            <a href="${url}" target="_blank">${name}</a>
            <button class="remove-button" onclick="removeLink(this)">X</button>
        `;
        linkContainer.appendChild(linkElement);

        // Save to local storage
        saveLinks();

        // Clear the input fields and close the modal
        document.getElementById('linkName').value = '';
        document.getElementById('linkUrl').value = '';
        closeModal('addLinkModal');
    } else {
        alert('Please provide both name and URL.');
    }
}

// Remove link and update local storage
function removeLink(button) {
    button.parentElement.remove();
    saveLinks();
}

// Save links to local storage
function saveLinks() {
    const links = [];
    document.querySelectorAll('#links .link').forEach(link => {
        const a = link.querySelector('a');
        links.push({
            name: a.textContent,
            url: a.href
        });
    });
    localStorage.setItem('links', JSON.stringify(links));
}

// Load links from local storage
function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const linkContainer = document.getElementById('links');
    links.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link';
        linkElement.innerHTML = `
            <a href="${link.url}" target="_blank">${link.name}</a>
            <button class="remove-button" onclick="removeLink(this)">X</button>
        `;
        linkContainer.appendChild(linkElement);
    });
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

// Initialize particles.js
document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            }
        },
        "retina_detect": true
    });

    // Load existing links
    loadLinks();
});
