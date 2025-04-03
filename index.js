document.getElementById("whatsappForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    
    if (phoneNumber === "") {
        alert("Please enter your WhatsApp number.");
        return;
    }

    // Send request to the backend to generate a pairing code
    fetch('/api/generate-pairing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneNumber })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show pairing code
            document.getElementById("pairingCode").value = data.pairingCode;
            document.getElementById("pairingSection").style.display = 'block';
        } else {
            alert("Error generating pairing code.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Something went wrong!");
    });
});

// Handle copying pairing code to clipboard
document.getElementById("copyButton").addEventListener("click", function() {
    const pairingCode = document.getElementById("pairingCode");
    pairingCode.select();
    document.execCommand("copy");
    alert("Pairing code copied!");
});
