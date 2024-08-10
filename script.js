document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadLinks();
});

function openAddLinkModal() {
    document.getElementById('addLinkModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function addLink() {
    const linkName = document.getElementById('linkName').value;
    const linkUrl = document.getElementById('linkUrl').value;

    if (linkName && linkUrl) {
        const links = JSON.parse(localStorage.getItem('links')) || [];
        links.push({ name: linkName, url: linkUrl });
        localStorage.setItem('links', JSON.stringify(links));
        loadLinks();
        closeModal('addLinkModal');
    }
}

function loadLinks() {
    const linksContainer = document.getElementById('links');
    const links = JSON.parse(localStorage.getItem('links')) || [];
    linksContainer.innerHTML = ''; // Clear previous links

    links.forEach((link, index) => {
        const linkButton = document.createElement('button');
        linkButton.className = 'link-button';
        linkButton.innerHTML = `<span>${link.name}</span><span class="remove-link" onclick="removeLink(${index})">&times;</span>`;
        linkButton.onclick = () => window.open(link.url, '_blank');
        linksContainer.appendChild(linkButton);
    });

    if (links.length > 0) {
        document.getElementById('profileCard').classList.add('show');
    }
}

function removeLink(index) {
    let links = JSON.parse(localStorage.getItem('links'));
    links.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(links));
    loadLinks();
}

function openProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
}

function updateProfile() {
    const profileName = document.getElementById('profileNameInput').value;
    const profileBio = document.getElementById('profileBioInput').value;
    const profilePic = document.getElementById('profilePic').src;

    if (profileName && profileBio && profilePic) {
        localStorage.setItem('profileName', profileName);
        localStorage.setItem('profileBio', profileBio);
        localStorage.setItem('profilePic', profilePic);

        loadProfile();
        closeModal('profileModal');
        document.getElementById('profileButton').style.display = 'none';
    }
}

function loadProfile() {
    const profileName = localStorage.getItem('profileName');
    const profileBio = localStorage.getItem('profileBio');
    const profilePic = localStorage.getItem('profilePic');

    if (profileName && profileBio && profilePic) {
        document.getElementById('profileName').innerText = profileName;
        document.getElementById('profileBio').innerText = profileBio;
        const profilePicElement = document.getElementById('profilePic');
        profilePicElement.src = profilePic;
        profilePicElement.classList.remove('hidden');
        document.getElementById('profileCard').classList.add('show');
    }
}

function uploadProfileImage() {
    const file = document.getElementById('profileUploader').files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        document.getElementById('profilePic').src = reader.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Initialize Particles.js directly
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 50,
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
                "opacity": 8,
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
