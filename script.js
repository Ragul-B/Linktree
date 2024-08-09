document.addEventListener('DOMContentLoaded', function () {
    loadLinks();
    loadProfile();
});

// Initialize particles.js
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
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 0.8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Functions to handle modal opening and closing
function openAddLinkModal() {
    document.getElementById('addLinkModal').style.display = 'flex';
}

function openProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function addLink() {
    const linkName = document.getElementById('linkName').value;
    const linkUrl = document.getElementById('linkUrl').value;

    if (linkName && linkUrl) {
        const linkContainer = document.getElementById('links');
        const linkElement = document.createElement('div');
        linkElement.className = 'link-item';
        linkElement.innerHTML = `
            <a href="${linkUrl}" target="_blank">${linkName}</a>
            <span class="link-close" onclick="removeLink(this)">&times;</span>
        `;
        linkContainer.appendChild(linkElement);

        saveLink(linkName, linkUrl);
        closeModal('addLinkModal');
    }
}

function removeLink(button) {
    const linkContainer = document.getElementById('links');
    button.parentElement.remove();
    saveLinks(); // Save the updated list after removal
}

function updateProfile() {
    const profileName = document.getElementById('profileNameInput').value;
    const profileBio = document.getElementById('profileBioInput').value;

    if (profileName || profileBio) {
        document.getElementById('profileName').textContent = profileName;
        document.getElementById('profileBio').textContent = profileBio;
        saveProfile();
        closeModal('profileModal');
    }
}

function uploadProfileImage() {
    const file = document.getElementById('profileUploader').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profilePic').src = e.target.result;
            document.getElementById('profilePic').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function saveLink(name, url) {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ name, url });
    localStorage.setItem('links', JSON.stringify(links));
}

function saveLinks() {
    const linkContainer = document.getElementById('links');
    const links = Array.from(linkContainer.getElementsByClassName('link-item')).map(linkItem => {
        const a = linkItem.querySelector('a');
        return { name: a.textContent, url: a.href };
    });
    localStorage.setItem('links', JSON.stringify(links));
}

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const linkContainer = document.getElementById('links');
    links.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link-item';
        linkElement.innerHTML = `
            <a href="${link.url}" target="_blank">${link.name}</a>
            <span class="link-close" onclick="removeLink(this)">&times;</span>
        `;
        linkContainer.appendChild(linkElement);
    });
}

function saveProfile() {
    const profileName = document.getElementById('profileNameInput').value;
    const profileBio = document.getElementById('profileBioInput').value;
    localStorage.setItem('profile', JSON.stringify({ name: profileName, bio: profileBio }));
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile')) || { name: '', bio: '' };
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileBio').textContent = profile.bio;
    // Optionally handle profile image here
    }
